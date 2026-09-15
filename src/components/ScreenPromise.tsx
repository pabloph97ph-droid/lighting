import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface ScreenPromiseProps {
  onContinue: () => void;
}

const GLOBAL_PILLARS = [
  'Conecte-se com pessoas de diferentes países.',
  'Desenvolva sua comunicação.',
  'Expanda seus negócios.',
  'Viaje com mais liberdade.',
  'Esteja preparado para oportunidades internacionais.',
];

export const ScreenPromise: React.FC<ScreenPromiseProps> = ({ onContinue }) => {
  return (
    <div
      id="screen-promise"
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#07060A] text-[#F5F3FA]"
    >
      {/* Ambient background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#581C87]/30 via-[#7C3AED]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Top institution marker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center space-x-2 border border-[#372658] bg-[#120B24]/80 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.15)]"
      >
        <Compass className="w-3.5 h-3.5 text-[#C084FC]" />
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#D8B4FE] font-sans">
          Visão Global & Pertencimento
        </span>
      </motion.div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="z-10 my-auto w-full max-w-2xl text-center py-6"
      >
        {/* Headline Principal */}
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.18] uppercase">
          SEU CRESCIMENTO NÃO PRECISA PARAR NA FRONTEIRA.
        </h2>

        {/* Texto de Apoio */}
        <p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg text-[#B3A9C7] leading-relaxed max-w-xl mx-auto font-normal">
          O mundo está cada vez mais conectado. As melhores conversas, oportunidades e experiências podem estar do outro lado da fronteira.
        </p>

        {/* Apresentação Visual Elegante dos Pilares Globais */}
        <div className="mt-8 max-w-lg mx-auto space-y-2.5 text-left">
          {GLOBAL_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.06 }}
              className="flex items-center space-x-3.5 p-3.5 sm:p-4 rounded-xl bg-[#110E1C] border border-[#261F38] shadow-xs hover:border-[#8B5CF6]/50 hover:bg-[#161324] transition-all group"
            >
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#A855F7] shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-xs sm:text-sm font-medium text-[#EDE8F5] leading-snug">
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Frase de Impacto & Chamada de Comunidade */}
        <div className="mt-9 bg-[#110D20]/90 rounded-2xl p-6 sm:p-7 border border-[#2E2248] shadow-lg shadow-[#7C3AED]/10 max-w-lg mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nosso Propósito</span>
          </div>

          <h3 className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight uppercase">
            INGLÊS É O PONTO DE PARTIDA.
            <br />
            <span className="text-[#C084FC] drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
              O MUNDO É O PRÓXIMO NÍVEL.
            </span>
          </h3>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#A89EB8] leading-relaxed pt-1">
            A JUMPER existe para aproximar pessoas que querem evoluir, se comunicar e construir um futuro cada vez mais internacional.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-9">
          <button
            id="btn-discover-path"
            type="button"
            onClick={onContinue}
            className="group inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-[#7C3AED]/35 hover:shadow-xl hover:shadow-[#A855F7]/50 border border-[#A78BFA]/40 transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
          >
            <span>DESCOBRIR MEU CAMINHO</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Bottom Subtext */}
      <div className="z-10 text-[10px] uppercase tracking-[0.24em] text-[#7E7495]">
        JUMPER FOR THE WORLD • COMUNIDADE GLOBAL
      </div>
    </div>
  );
};
