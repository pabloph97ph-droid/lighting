import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ScreenPromiseProps {
  onContinue: () => void;
}

const PILLARS = [
  'Viagens',
  'Negócios',
  'Carreira',
  'Apresentações',
  'Conversas',
  'Networking',
  'Estudos',
  'Conexões internacionais',
];

export const ScreenPromise: React.FC<ScreenPromiseProps> = ({ onContinue }) => {
  return (
    <div
      id="screen-promise"
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#FAF9F6] text-[#111318]"
    >
      {/* Ambient background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#F2EADB]/60 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top institution marker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center space-x-2 border border-[#EAE4D7] bg-[#F7F4EE]/70 px-4 py-1.5 rounded-full"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#B89748]" />
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7A746B] font-sans">
          Propósito & Metodologia
        </span>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="z-10 my-auto w-full max-w-2xl text-center py-6"
      >
        {/* Headline */}
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111318] leading-[1.18]">
          Fale inglês de verdade em menos de 4 meses.
        </h2>

        {/* Subheadline */}
        <p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg text-[#524C44] leading-relaxed max-w-xl mx-auto font-normal">
          Uma experiência criada para quem não quer apenas estudar inglês, mas precisa{' '}
          <span className="font-semibold text-[#111318]">usar o idioma na vida real.</span>
        </p>

        {/* Real-World Pillars Grid */}
        <div className="mt-8 pt-6 border-t border-[#EAE5DA] max-w-lg mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.25 + idx * 0.04 }}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium tracking-wide bg-[#F4EFE6] text-[#3D3830] border border-[#E3DCCF]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89748] mr-2 opacity-80" />
                {pillar}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Realization Callout */}
        <div className="mt-8 bg-[#F5F2EB]/90 rounded-2xl p-6 sm:p-7 border border-[#E7E0D2] shadow-sm max-w-lg mx-auto text-left">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8F7226] mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
            Princípio Fundamental
          </p>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#2E2C29] leading-relaxed">
            O objetivo não é decorar regras.
            <br />
            É desenvolver segurança para{' '}
            <span className="font-semibold text-[#111318]">
              entender, responder e se comunicar.
            </span>
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-9">
          <button
            id="btn-discover-path"
            type="button"
            onClick={onContinue}
            className="group inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-b from-[#1C1F26] to-[#0A0C10] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-[#C5A059]/15 border border-[#323640]/50 transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
          >
            <span>DESCOBRIR MEU CAMINHO</span>
            <ArrowRight className="w-4 h-4 text-[#E0C38A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Subtext */}
      <div className="z-10 text-[10px] uppercase tracking-[0.24em] text-[#9E958C]">
        LIGHTNING FOR THE WORLD • 2026
      </div>
    </div>
  );
};
