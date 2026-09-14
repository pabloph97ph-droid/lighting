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
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 relative bg-[#FAF9F6] text-[#111318]"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl text-center space-y-7"
      >
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#F4EFE5] border border-[#E3D8C3] flex items-center justify-center text-[#9E7B26] shadow-sm">
          <Users className="w-6 h-6" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.22em] text-[#8C7436] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sinergia de Aprendizado</span>
          </div>

          <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#111318] uppercase leading-tight">
            APRENDER EM CONJUNTO PODE TORNAR O PROCESSO AINDA MAIS PODEROSO.
          </h3>
        </div>

        <div className="bg-[#F6F3EC] p-6 sm:p-7 rounded-2xl border border-[#E8E1D2] text-left text-[#4A443B] space-y-3 text-sm sm:text-base leading-relaxed">
          <p>
            Quando duas ou mais pessoas estudam juntas, uma ajuda a outra a praticar, manter a constância e evoluir.
          </p>
          <p className="font-medium text-[#211F1C]">
            Por isso, queremos entender se existe alguém próximo que também tenha esse objetivo.
          </p>
        </div>

        <div className="pt-2">
          <button
            id="btn-continue-group-step"
            type="button"
            onClick={onContinue}
            className="group inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-9 py-4 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-b from-[#1C1F26] to-[#0A0C10] shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>CONTINUAR</span>
            <ArrowRight className="w-4 h-4 text-[#E0C38A] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
