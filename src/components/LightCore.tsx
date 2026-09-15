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
  purpleTone: string;
}

export const LightCore: React.FC<LightCoreProps> = ({
  isExpanding = false,
  className = '',
  size = 300,
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
      const duration = 850; // ms

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

    // JUMPER Electric Purple / Luminous Lilac / Deep Violet palette
    const particleCount = 48;
    const particles: Particle[] = [];
    const purpleTones = [
      'rgba(168, 85, 247, ',   // neon purple
      'rgba(192, 132, 252, ',  // luminous lilac
      'rgba(139, 92, 246, ',   // electric violet
      'rgba(233, 213, 255, ',  // soft lavender glow
      'rgba(255, 255, 255, ',  // pure white spark
    ];

    for (let i = 0; i < particleCount; i++) {
      const orbit = 35 + Math.random() * 105;
      particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 0.9 + Math.random() * 2.0,
        baseAlpha: 0.3 + Math.random() * 0.7,
        orbitRadius: orbit,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() * 0.009 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        purpleTone: purpleTones[Math.floor(Math.random() * purpleTones.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.022;

      // Mouse smooth interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseRef.current.x;
      const centerY = height / 2 + mouseRef.current.y;

      // Organic liquid pulse & breath
      const pulse = Math.sin(time * 1.6) * 0.07 + 1;
      const baseRadius = (size * 0.23) * pulse;
      const scaleMultiplier = 1 + expansionProgress * 7.5;
      const currentRadius = baseRadius * scaleMultiplier;

      // 1. Far Ambient Glow (Deep Electric Violet & Ultraviolet Aura)
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.1,
        centerX,
        centerY,
        currentRadius * 3.2
      );
      outerGlow.addColorStop(0, `rgba(168, 85, 247, ${0.55 * (1 + expansionProgress * 1.5)})`);
      outerGlow.addColorStop(0.3, `rgba(124, 58, 237, ${0.35 * (1 + expansionProgress)})`);
      outerGlow.addColorStop(0.65, 'rgba(88, 28, 135, 0.18)');
      outerGlow.addColorStop(1, 'rgba(7, 6, 10, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Subtle Harmonic Light Rings & Waves (Movement & Digital Distortion)
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringTime = time * (0.9 + r * 0.25) + r * 1.9;
        const ringRadius = currentRadius * (1.18 + r * 0.36 + Math.sin(ringTime) * 0.09);
        const ringAlpha = Math.max(0, (0.35 - r * 0.08) * (1 - expansionProgress * 0.3));

        ctx.strokeStyle = `rgba(192, 132, 252, ${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Central Liquid Luminous Sphere (Organic chromatic purple & pure energy)
      const coreGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.22,
        centerY - currentRadius * 0.25,
        currentRadius * 0.04,
        centerX,
        centerY,
        currentRadius
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.2, 'rgba(245, 235, 255, 0.98)');
      coreGrad.addColorStop(0.48, 'rgba(192, 132, 252, 0.95)');
      coreGrad.addColorStop(0.78, 'rgba(124, 58, 237, 0.88)');
      coreGrad.addColorStop(0.96, 'rgba(76, 29, 149, 0.7)');
      coreGrad.addColorStop(1, 'rgba(46, 16, 101, 0.2)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Energy crest & liquid specular highlights
      const crestGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.3,
        centerY - currentRadius * 0.32,
        0,
        centerX,
        centerY,
        currentRadius * 0.72
      );
      crestGrad.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
      crestGrad.addColorStop(0.35, 'rgba(233, 213, 255, 0.6)');
      crestGrad.addColorStop(0.8, 'rgba(192, 132, 252, 0.15)');
      crestGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = crestGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 0.72, 0, Math.PI * 2);
      ctx.fill();

      // 5. Floating Connection Particles & Threads
      particles.forEach((p) => {
        p.angle += p.angularSpeed;
        const radiusNoise = Math.sin(time * 2.2 + p.orbitRadius) * 7;
        const effectiveOrbit = (p.orbitRadius + radiusNoise) * scaleMultiplier;

        p.x = centerX + Math.cos(p.angle) * effectiveOrbit;
        p.y = centerY + Math.sin(p.angle) * effectiveOrbit;

        const flicker = Math.sin(time * 3.2 + p.angle * 4) * 0.25 + 0.75;
        const alpha = p.baseAlpha * flicker * (1 - expansionProgress * 0.4);

        ctx.fillStyle = `${p.purpleTone}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + expansionProgress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Glowing connection lines between nearby particles
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1900 && distSq > 50) {
            const lineAlpha = (1 - distSq / 1900) * 0.18 * (1 - expansionProgress);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
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
    // Magnetic response clamped to 15px
    mouseRef.current.targetX = Math.max(-15, Math.min(15, relX * 0.08));
    mouseRef.current.targetY = Math.max(-15, Math.min(15, relY * 0.08));
  };

  const handlePointerLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      id="jumper-light-core-wrapper"
      className={`relative flex items-center justify-center cursor-pointer select-none touch-none ${className}`}
      style={{ width: size, height: size }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        id="jumper-light-core-canvas"
        className="w-full h-full block"
        style={{
          filter: 'drop-shadow(0 0 35px rgba(147, 51, 234, 0.45))',
        }}
      />
      {/* Cinematic Violet/Lilac Flash Bloom when expanding */}
      {isExpanding && (
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-[#07060A] transition-opacity duration-750 ease-out"
          style={{
            opacity: Math.pow(expansionProgress, 1.6),
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/40 via-[#A855F7]/30 to-transparent blur-2xl"
            style={{
              opacity: Math.pow(expansionProgress, 1.2),
            }}
          />
        </div>
      )}
    </div>
  );
};
