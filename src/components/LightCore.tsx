import React, { useEffect, useRef, useState } from 'react';

interface LightCoreProps {
  isExpanding?: boolean;
  className?: string;
  size?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  orbitRadius: number;
  angle: number;
  angularSpeed: number;
  goldTone: string;
}

export const LightCore: React.FC<LightCoreProps> = ({
  isExpanding = false,
  className = '',
  size = 280,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const animFrameId = useRef<number | null>(null);
  const [expansionProgress, setExpansionProgress] = useState(0);

  useEffect(() => {
    if (isExpanding) {
      const startTime = performance.now();
      const duration = 900; // ms

      const updateExpansion = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeInOutCubic
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setExpansionProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(updateExpansion);
        }
      };
      requestAnimationFrame(updateExpansion);
    }
  }, [isExpanding]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth || size;
    let height = canvas.clientHeight || size;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = canvas.clientWidth || size;
      height = canvas.clientHeight || size;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate subtle particles
    const particleCount = 42;
    const particles: Particle[] = [];
    const goldTones = [
      'rgba(212, 175, 55, ',
      'rgba(197, 160, 89, ',
      'rgba(235, 215, 170, ',
      'rgba(184, 151, 72, ',
      'rgba(255, 255, 255, ',
    ];

    for (let i = 0; i < particleCount; i++) {
      const orbit = 30 + Math.random() * 95;
      particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 0.8 + Math.random() * 1.8,
        baseAlpha: 0.25 + Math.random() * 0.65,
        orbitRadius: orbit,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        goldTone: goldTones[Math.floor(Math.random() * goldTones.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Mouse smooth interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseRef.current.x;
      const centerY = height / 2 + mouseRef.current.y;

      // Pulse calculations
      const pulse = Math.sin(time * 1.5) * 0.06 + 1;
      const baseRadius = (size * 0.22) * pulse;
      const scaleMultiplier = 1 + expansionProgress * 6.5;
      const currentRadius = baseRadius * scaleMultiplier;

      // 1. Far Ambient Glow (Champagne / White / Gold Aura)
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.1,
        centerX,
        centerY,
        currentRadius * 2.8
      );
      outerGlow.addColorStop(0, `rgba(247, 237, 209, ${0.45 * (1 + expansionProgress * 1.2)})`);
      outerGlow.addColorStop(0.35, `rgba(224, 195, 138, ${0.22 * (1 + expansionProgress)})`);
      outerGlow.addColorStop(0.7, 'rgba(212, 175, 55, 0.08)');
      outerGlow.addColorStop(1, 'rgba(250, 249, 246, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Subtle Harmonic Light Rings (Orbital intelligence waves)
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringTime = time * (0.8 + r * 0.2) + r * 2.1;
        const ringRadius = currentRadius * (1.15 + r * 0.38 + Math.sin(ringTime) * 0.08);
        const ringAlpha = Math.max(0, (0.28 - r * 0.07) * (1 - expansionProgress * 0.4));

        ctx.strokeStyle = `rgba(197, 160, 89, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Central Luminous Sphere (Pure light & energy core)
      const coreGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.2,
        centerY - currentRadius * 0.25,
        currentRadius * 0.05,
        centerX,
        centerY,
        currentRadius
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.3, 'rgba(255, 253, 245, 0.98)');
      coreGrad.addColorStop(0.65, 'rgba(235, 215, 170, 0.85)');
      coreGrad.addColorStop(0.9, 'rgba(202, 168, 97, 0.7)');
      coreGrad.addColorStop(1, 'rgba(180, 142, 60, 0.15)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Energy highlights (subtle white hot crest)
      const crestGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.28,
        centerY - currentRadius * 0.32,
        0,
        centerX,
        centerY,
        currentRadius * 0.7
      );
      crestGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      crestGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      crestGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = crestGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // 5. Floating Connection Particles
      particles.forEach((p) => {
        p.angle += p.angularSpeed;
        const radiusNoise = Math.sin(time * 2 + p.orbitRadius) * 6;
        const effectiveOrbit = (p.orbitRadius + radiusNoise) * scaleMultiplier;

        p.x = centerX + Math.cos(p.angle) * effectiveOrbit;
        p.y = centerY + Math.sin(p.angle) * effectiveOrbit;

        const flicker = Math.sin(time * 3 + p.angle * 4) * 0.25 + 0.75;
        const alpha = p.baseAlpha * flicker * (1 - expansionProgress * 0.5);

        ctx.fillStyle = `${p.goldTone}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + expansionProgress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Delicate connecting threads between close particles
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1600 && distSq > 40) {
            const lineAlpha = (1 - distSq / 1600) * 0.12 * (1 - expansionProgress);
            ctx.strokeStyle = `rgba(202, 168, 97, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resize);
    };
  }, [size, expansionProgress]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    // Subtle magnetic response (clamped to max 12px)
    mouseRef.current.targetX = Math.max(-14, Math.min(14, relX * 0.08));
    mouseRef.current.targetY = Math.max(-14, Math.min(14, relY * 0.08));
  };

  const handlePointerLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      id="lightning-light-core-wrapper"
      className={`relative flex items-center justify-center cursor-pointer select-none touch-none ${className}`}
      style={{ width: size, height: size }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        id="lightning-light-core-canvas"
        className="w-full h-full block"
        style={{
          filter: 'drop-shadow(0 0 24px rgba(212, 175, 55, 0.22))',
        }}
      />
      {/* Cinematic White Flash Bloom when expanding */}
      {isExpanding && (
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-[#FAF9F6] transition-opacity duration-700 ease-out"
          style={{
            opacity: Math.pow(expansionProgress, 1.8),
          }}
        />
      )}
    </div>
  );
};
