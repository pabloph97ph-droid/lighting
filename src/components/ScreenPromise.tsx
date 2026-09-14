import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Sparkles, Compass } from 'lucide-react';

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
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#FAF9F6] text-[#111318]"
    >
      {/* Ambient background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#F2EADB]/60 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top institution marker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center space-x-2 border border-[#EAE4D7] bg-[#F7F4EE]/80 px-4 py-1.5 rounded-full"
      >
        <Compass className="w-3.5 h-3.5 text-[#B89748]" />
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7A746B] font-sans">
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
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111318] leading-[1.18] uppercase">
          SEU CRESCIMENTO NÃO PRECISA PARAR NA FRONTEIRA.
        </h2>

        {/* Texto de Apoio */}
        <p className="mt-5 font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-lg text-[#524C44] leading-relaxed max-w-xl mx-auto font-normal">
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
              className="flex items-center space-x-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E7DEC9] shadow-xs hover:border-[#C5A059]/60 hover:bg-[#FAF7F0] transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#B89748] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#2E2A24] leading-snug">
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Frase de Impacto & Chamada de Comunidade */}
        <div className="mt-9 bg-[#F5F1E8]/95 rounded-2xl p-6 sm:p-7 border border-[#E5DEC9] shadow-sm max-w-lg mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8F7226]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nosso Propósito</span>
          </div>

          <h3 className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#111318] leading-tight uppercase">
            INGLÊS É O PONTO DE PARTIDA.
            <br />
            <span className="text-[#8F7226]">O MUNDO É O PRÓXIMO NÍVEL.</span>
          </h3>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#575046] leading-relaxed pt-1">
            A LIGHTNING existe para aproximar pessoas que querem evoluir, se comunicar e construir um futuro cada vez mais internacional.
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
        LIGHTNING FOR THE WORLD • COMUNIDADE GLOBAL
      </div>
    </div>
  );
};
