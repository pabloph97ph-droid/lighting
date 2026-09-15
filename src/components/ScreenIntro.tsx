import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LightCore } from './LightCore';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

interface ScreenIntroProps {
  onStart: () => void;
}

export const ScreenIntro: React.FC<ScreenIntroProps> = ({ onStart }) => {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleClickStart = () => {
    if (isExpanding) return;
    setIsExpanding(true);
    // Trigger cinematic violet light expansion, then proceed to the promise screen
    setTimeout(() => {
      onStart();
    }, 750);
  };

  return (
    <div
      id="screen-intro"
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-10 relative overflow-hidden bg-[#07060A] text-[#F5F3FA]"
    >
      {/* Ambient background deep violet aurora & liquid aura */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#581C87]/40 via-[#7C3AED]/25 to-transparent blur-[110px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[350px] rounded-full bg-[#3B0764]/30 blur-[90px]" />
        {/* Subtle grid pattern overlay with purple tint */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(#A855F7 1px, transparent 1px), radial-gradient(#A855F7 1px, #07060A 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />
      </div>

      {/* Top institution marker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="z-10 flex items-center space-x-2 border border-[#372658] bg-[#120B24]/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.15)]"
      >
        <Globe className="w-3.5 h-3.5 text-[#C084FC]" />
        <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#D8B4FE] font-sans">
          Comunidade Internacional
        </span>
      </motion.div>

      {/* Centerpiece: Light Core & Compact 3D Liquid JUMPER Identity */}
      <div className="z-10 flex flex-col items-center justify-center my-auto w-full max-w-xl text-center">
        {/* Core of Violet Light */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative flex items-center justify-center -my-3"
        >
          <LightCore isExpanding={isExpanding} size={280} />
        </motion.div>

        {/* Brand Name: JUMPER — Compact, sculptural 3D liquid chrome-purple lettering */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-col items-center mt-2"
        >
          {/* Custom Stylized 3D Liquid JUMPER Display Lettering */}
          <div className="relative flex items-center justify-center">
            {/* Ambient liquid glow behind word */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/40 via-[#C084FC]/50 to-[#7C3AED]/40 blur-xl opacity-70 transform scale-110 pointer-events-none" />

            <h1
              id="brand-hero-title"
              className="relative z-10 font-['Syne',sans-serif] text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.06em] uppercase jumper-liquid-title leading-none select-none"
              style={{
                textShadow:
                  '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(168,85,247,0.7), 0 0 40px rgba(124,58,237,0.5)',
              }}
            >
              JUMPER
            </h1>
          </div>

          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C084FC] font-semibold mt-2.5">
            FOR THE WORLD
          </span>
        </motion.div>

        {/* The World is Waiting & Aspirations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-lg space-y-3"
        >
          <p className="font-['Cinzel',serif] text-base sm:text-lg font-semibold tracking-[0.2em] text-[#E9D5FF] uppercase">
            THE WORLD IS WAITING.
          </p>

          <h2 className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug">
            O MUNDO ESTÁ CHEIO DE PESSOAS, IDEIAS E OPORTUNIDADES ESPERANDO POR VOCÊ.
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#B3A9C7] leading-relaxed font-normal">
            Entre para uma comunidade que pensa além das fronteiras.
          </p>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm uppercase tracking-[0.22em] text-[#C084FC] font-semibold pt-1">
            Conecte-se. Cresça. Comunique-se. Expanda.
          </p>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="mt-8 w-full sm:w-auto"
        >
          <button
            id="btn-start-experience"
            type="button"
            onClick={handleClickStart}
            disabled={isExpanding}
            className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-9 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-[#7C3AED]/35 hover:shadow-xl hover:shadow-[#A855F7]/50 border border-[#A78BFA]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.985] cursor-pointer"
          >
            <span className="relative z-10">ENTRAR NO JUMPER</span>
            <ArrowRight className="w-4 h-4 relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1" />

            {/* Glowing neon aura */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A855F7]/0 via-[#FFFFFF]/25 to-[#A855F7]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-10 text-center text-[10px] uppercase tracking-[0.24em] text-[#7E7495]"
      >
        Movimento Internacional de Crescimento & Liderança
      </motion.div>
    </div>
  );
};
