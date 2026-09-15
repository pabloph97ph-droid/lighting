import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

interface ScreenStudyTogetherProps {
  onContinue: () => void;
}

export const ScreenStudyTogether: React.FC<ScreenStudyTogetherProps> = ({ onContinue }) => {
  return (
    <div
      id="screen-study-together"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 relative bg-[#07060A] text-[#F5F3FA]"
    >
      {/* Background ambient purple light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#581C87]/25 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-xl text-center space-y-7"
      >
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#140F24] border border-[#2F214B] flex items-center justify-center text-[#C084FC] shadow-lg shadow-[#7C3AED]/15">
          <Users className="w-6 h-6" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.24em] text-[#C084FC] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sinergia de Aprendizado</span>
          </div>

          <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white uppercase leading-tight">
            APRENDER EM CONJUNTO PODE TORNAR O PROCESSO AINDA MAIS PODEROSO.
          </h3>
        </div>

        <div className="bg-[#100E1D] p-6 sm:p-7 rounded-2xl border border-[#261E38] text-left text-[#B4AAC7] space-y-3 text-sm sm:text-base leading-relaxed">
          <p>
            Quando duas ou mais pessoas estudam juntas, uma ajuda a outra a praticar, manter a constância e evoluir.
          </p>
          <p className="font-medium text-white">
            Por isso, queremos entender se existe alguém próximo que também tenha esse objetivo.
          </p>
        </div>

        <div className="pt-2">
          <button
            id="btn-continue-group-step"
            type="button"
            onClick={onContinue}
            className="group inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-9 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#A855F7]/45 transition-all hover:scale-[1.015] active:scale-[0.99] border border-[#A78BFA]/35 cursor-pointer"
          >
            <span>CONTINUAR</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
