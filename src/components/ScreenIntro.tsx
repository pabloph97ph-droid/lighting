import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LightCore } from './LightCore';
import { ArrowRight, Globe } from 'lucide-react';

interface ScreenIntroProps {
  onStart: () => void;
}

export const ScreenIntro: React.FC<ScreenIntroProps> = ({ onStart }) => {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleClickStart = () => {
    if (isExpanding) return;
    setIsExpanding(true);
    // Trigger cinematic light expansion, then proceed to the promise screen
    setTimeout(() => {
      onStart();
    }, 750);
  };

  return (
    <div
      id="screen-intro"
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#FAF9F6] text-[#111318]"
    >
      {/* Subtle architectural ambient background grid/rays */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#EFE8D8]/50 via-white/80 to-[#E4D5B7]/30 blur-3xl" />
      </div>

      {/* Top institution marker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="z-10 flex items-center space-x-2 border border-[#E8E3D8] bg-[#F5F2EB]/70 backdrop-blur-sm px-4 py-1.5 rounded-full"
      >
        <Globe className="w-3.5 h-3.5 text-[#A38234]" />
        <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#706B63] font-sans">
          Comunidade Internacional
        </span>
      </motion.div>

      {/* Centerpiece: Light Core & Brand Signature */}
      <div className="z-10 flex flex-col items-center justify-center my-auto w-full max-w-xl text-center">
        {/* Core of Light */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative flex items-center justify-center -my-2"
        >
          <LightCore isExpanding={isExpanding} size={300} />
        </motion.div>

        {/* Brand Name & Signature */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-col items-center mt-3"
        >
          <h1
            id="brand-hero-title"
            className="font-['Cinzel',serif] text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.28em] text-[#111318] uppercase"
          >
            LIGHTNING
          </h1>
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm uppercase tracking-[0.35em] text-[#8F7226] font-semibold mt-2">
            FOR THE WORLD
          </span>
        </motion.div>

        {/* The World is Waiting & New Aspirations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 max-w-lg space-y-3"
        >
          <p className="font-['Cinzel',serif] text-base sm:text-lg font-semibold tracking-[0.2em] text-[#22242A] uppercase">
            THE WORLD IS WAITING.
          </p>

          <h2 className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#111318] leading-snug">
            O MUNDO ESTÁ CHEIO DE PESSOAS, IDEIAS E OPORTUNIDADES ESPERANDO POR VOCÊ.
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#524C44] leading-relaxed font-normal">
            Entre para uma comunidade que pensa além das fronteiras.
          </p>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8C7436] font-semibold pt-1">
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
            className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-9 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-b from-[#1E2128] to-[#0D0F13] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-[#C5A059]/15 border border-[#3B3F4A]/40 transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
          >
            <span className="relative z-10">ENTRAR NA LIGHTNING</span>
            <ArrowRight className="w-4 h-4 relative z-10 text-[#E0C38A] transition-transform duration-300 group-hover:translate-x-1" />

            {/* Subtle luxury golden ring glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/15 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-10 text-center text-[10px] uppercase tracking-[0.24em] text-[#9E958C]"
      >
        Movimento Internacional de Crescimento & Liderança
      </motion.div>
    </div>
  );
};
