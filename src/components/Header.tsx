import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { JumperMonogram } from './JumperMonogram';

interface HeaderProps {
  currentStepIndex: number;
  totalQuestions: number;
  isAssessment: boolean;
  onBack?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStepIndex,
  totalQuestions,
  isAssessment,
  onBack,
  onOpenAdmin,
}) => {
  const formattedStep = String(currentStepIndex).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');
  const progressPercent = totalQuestions > 0 ? (currentStepIndex / totalQuestions) * 100 : 0;

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40 bg-[#07060A]/85 backdrop-blur-md border-b border-[#1C172B] transition-all">
      {/* Top micro progress line */}
      {isAssessment && (
        <div className="w-full h-[2px] bg-[#161224] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#C084FC] transition-all duration-500 ease-out shadow-[0_0_8px_#A855F7]"
            style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Left: Back button or Small J Monogram */}
        <div className="flex items-center space-x-3">
          {isAssessment && onBack ? (
            <button
              id="header-back-button"
              type="button"
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 text-xs font-medium tracking-wider text-[#A89EB8] hover:text-white transition-colors py-1.5 px-2.5 -ml-2 rounded-lg hover:bg-[#161224]"
              aria-label="Voltar para a etapa anterior"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="uppercase text-[11px] font-sans">Voltar</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2.5">
              {/* Monogram J symbol */}
              <JumperMonogram size={30} />
              <div className="flex flex-col">
                <span className="font-['Syne',sans-serif] tracking-[0.14em] text-[13px] font-bold text-white leading-tight">
                  JUMPER
                </span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.2em] text-[8px] uppercase text-[#9B90B2] font-semibold">
                  For The World
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center: Stage Indicator with J Monogram when in assessment */}
        {isAssessment && (
          <div className="flex items-center space-x-2">
            <JumperMonogram size={22} className="hidden sm:inline-flex opacity-80" />
            <span className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#A89EB8]">
              AVALIAÇÃO JUMPER
            </span>
          </div>
        )}

        {/* Right: Step Counter or Discreet Admin Trigger */}
        <div className="flex items-center space-x-2">
          {isAssessment ? (
            <div
              id="assessment-step-counter"
              className="font-mono text-xs tracking-wider text-white bg-[#141022] px-2.5 py-1 rounded-full border border-[#271E3A] shadow-inner"
            >
              <span className="font-semibold text-[#C084FC]">{formattedStep}</span>
              <span className="text-[#6D6385] mx-1">/</span>
              <span className="text-[#9E94B3]">{formattedTotal}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[#6D6385] hover:text-[#C084FC] transition-colors p-1"
              title="Acesso institucional"
              aria-label="Acesso institucional"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
