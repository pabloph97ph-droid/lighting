import React, { useEffect, useRef, useState } from 'react';

interface LightCoreProps {
  isExpanding?: boolean;
  anchorRef?: React.RefObject<HTMLElement | null>;
  className?: string;
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
  isCosmicDust?: boolean;
}

export const LightCore: React.FC<LightCoreProps> = ({
  isExpanding = false,
  anchorRef,
  className = '',
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

  // Expansion animation trigger when moving to the next step
  useEffect(() => {
    if (isExpanding) {
      const startTime = performance.now();
      const duration = 900; // ms

      const updateExpansion = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeInOutCubic
        const eased =
          progress < 0.5
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

  // Main canvas rendering loop across full screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Global pointer tracking across the entire screen for smooth fluid response
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const relX = e.clientX - width / 2;
      const relY = e.clientY - height / 2;
      mouseRef.current.targetX = Math.max(-28, Math.min(28, relX * 0.05));
      mouseRef.current.targetY = Math.max(-28, Math.min(28, relY * 0.05));
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });

    // Particle field across the entire screen
    const particleCount = 72;
    const particles: Particle[] = [];
    const purpleTones = [
      'rgba(192, 132, 252, ',  // luminous lilac
      'rgba(168, 85, 247, ',   // neon purple
      'rgba(139, 92, 246, ',   // electric violet
      'rgba(233, 213, 255, ',  // soft lavender
      'rgba(255, 255, 255, ',  // pure white spark
      'rgba(124, 58, 237, ',   // deep violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const isWide = Math.random() > 0.45;
      const orbit = isWide
        ? 130 + Math.random() * 360 // wider screen ambient stars
        : 35 + Math.random() * 115;  // near-core orbital cluster

      particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: isWide ? 0.7 + Math.random() * 1.5 : 1.1 + Math.random() * 2.2,
        baseAlpha: isWide ? 0.2 + Math.random() * 0.5 : 0.4 + Math.random() * 0.6,
        orbitRadius: orbit,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() * 0.007 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        purpleTone: purpleTones[Math.floor(Math.random() * purpleTones.length)],
        isCosmicDust: isWide,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Determine focal center from anchor element or fallback
      let focalX = width / 2;
      let focalY = height * 0.36;

      if (anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        focalX = rect.left + rect.width / 2;
        focalY = rect.top + rect.height / 2;
      }

      const centerX = focalX + mouseRef.current.x;
      const centerY = focalY + mouseRef.current.y;

      // Pulse calculations
      const pulse = Math.sin(time * 1.5) * 0.07 + 1;
      const coreBaseRadius = Math.min(width, height) * 0.065 * pulse;
      const scaleMultiplier = 1 + expansionProgress * 12;
      const currentRadius = Math.max(38, coreBaseRadius) * scaleMultiplier;

      // 1. Vast Atmospheric Ambient Glow across the screen (no box edges)
      const ambientReach = Math.max(width, height) * 0.75;
      const deepAmbient = ctx.createRadialGradient(
        centerX,
        centerY,
        currentRadius * 0.2,
        centerX,
        centerY,
        ambientReach
      );
      deepAmbient.addColorStop(0, `rgba(147, 51, 234, ${0.42 * (1 + expansionProgress * 1.5)})`);
      deepAmbient.addColorStop(0.22, `rgba(124, 58, 237, ${0.26 * (1 + expansionProgress)})`);
      deepAmbient.addColorStop(0.48, 'rgba(88, 28, 135, 0.12)');
      deepAmbient.addColorStop(0.75, 'rgba(46, 16, 101, 0.04)');
      deepAmbient.addColorStop(1, 'rgba(7, 6, 10, 0)');

      ctx.fillStyle = deepAmbient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ambientReach, 0, Math.PI * 2);
      ctx.fill();

      // 2. Wide Harmonic Waves & Light Wavefronts (breathing through the full screen)
      const waveCount = 4;
      for (let w = 0; w < waveCount; w++) {
        const waveTime = time * (0.8 + w * 0.22) + w * 1.6;
        const waveRadius = currentRadius * (1.25 + w * 0.45 + Math.sin(waveTime) * 0.12);
        const waveAlpha = Math.max(0, (0.32 - w * 0.07) * (1 - expansionProgress * 0.3));

        ctx.strokeStyle = `rgba(192, 132, 252, ${waveAlpha})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Central Luminous Liquid Violet Core
      const coreGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.24,
        centerY - currentRadius * 0.26,
        currentRadius * 0.04,
        centerX,
        centerY,
        currentRadius
      );
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.18, 'rgba(245, 235, 255, 0.98)');
      coreGrad.addColorStop(0.45, 'rgba(192, 132, 252, 0.95)');
      coreGrad.addColorStop(0.74, 'rgba(124, 58, 237, 0.88)');
      coreGrad.addColorStop(0.95, 'rgba(76, 29, 149, 0.65)');
      coreGrad.addColorStop(1, 'rgba(46, 16, 101, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Liquid Specular Crest Highlight
      const specularGrad = ctx.createRadialGradient(
        centerX - currentRadius * 0.32,
        centerY - currentRadius * 0.34,
        0,
        centerX,
        centerY,
        currentRadius * 0.68
      );
      specularGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      specularGrad.addColorStop(0.32, 'rgba(233, 213, 255, 0.6)');
      specularGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.1)');
      specularGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specularGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 0.68, 0, Math.PI * 2);
      ctx.fill();

      // 5. Dynamic Screen-wide Floating Particles & Constellation Threads
      particles.forEach((p) => {
        p.angle += p.angularSpeed;
        const waveNoise = Math.sin(time * 1.8 + p.orbitRadius * 0.05) * 12;
        const effectiveOrbit = (p.orbitRadius + waveNoise) * (1 + expansionProgress * 5);

        // Slightly elliptical orbit for organic feel
        p.x = centerX + Math.cos(p.angle) * effectiveOrbit * 1.08;
        p.y = centerY + Math.sin(p.angle) * effectiveOrbit * 0.92;

        const flicker = Math.sin(time * 3 + p.angle * 3) * 0.25 + 0.75;
        const alpha = Math.min(1, p.baseAlpha * flicker * (1 - expansionProgress * 0.45));

        ctx.fillStyle = `${p.purpleTone}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + expansionProgress * 0.4), 0, Math.PI * 2);
        ctx.fill();

        // Constellation lines between nearby particles
        if (!p.isCosmicDust) {
          particles.forEach((other) => {
            if (other === p || other.isCosmicDust) return;
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 2200 && distSq > 80) {
              const lineAlpha = (1 - distSq / 2200) * 0.16 * (1 - expansionProgress);
              ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        }
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handleGlobalPointerMove);
    };
  }, [expansionProgress, anchorRef]);

  return (
    <div
      id="jumper-fullscreen-light-system"
      className={`fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden select-none ${className}`}
    >
      {/* Seamless full-screen borderless canvas */}
      <canvas
        ref={canvasRef}
        id="jumper-light-core-canvas"
        className="w-full h-full block"
      />

      {/* Cinematic Violet Surge Flash Bloom on Transition */}
      {isExpanding && (
        <div
          className="fixed inset-0 pointer-events-none z-50 bg-[#07060A] transition-opacity duration-700 ease-out"
          style={{
            opacity: Math.pow(expansionProgress, 1.5),
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/40 via-[#A855F7]/30 to-transparent blur-3xl"
            style={{
              opacity: Math.pow(expansionProgress, 1.2),
            }}
          />
        </div>
      )}
    </div>
  );
};
