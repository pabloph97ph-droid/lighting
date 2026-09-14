import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

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
    <header className="w-full fixed top-0 left-0 right-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE6DE] transition-all">
      {/* Top micro progress line */}
      {isAssessment && (
        <div className="w-full h-[2px] bg-[#EAE6DE] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Left: Back button or Brand Sign */}
        <div className="flex items-center space-x-3">
          {isAssessment && onBack ? (
            <button
              id="header-back-button"
              type="button"
              onClick={onBack}
              className="inline-flex items-center space-x-1.5 text-xs font-medium tracking-wider text-[#57534E] hover:text-[#111318] transition-colors py-1.5 px-2.5 -ml-2 rounded-md hover:bg-[#F2EFE9]"
              aria-label="Voltar para a etapa anterior"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="uppercase text-[11px] font-sans">Voltar</span>
            </button>
          ) : (
            <div className="flex flex-col">
              <span className="font-['Cinzel',serif] tracking-[0.28em] text-[13px] font-bold text-[#111318]">
                LIGHTNING
              </span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] tracking-[0.16em] text-[8px] uppercase text-[#8C827A] font-semibold">
                For The World
              </span>
            </div>
          )}
        </div>

        {/* Center: Stage Indicator */}
        {isAssessment && (
          <div className="text-center">
            <div className="text-[9.5px] uppercase tracking-[0.2em] font-medium text-[#8C827A]">
              AVALIAÇÃO LIGHTNING
            </div>
          </div>
        )}

        {/* Right: Step Counter or Discreet Admin Trigger */}
        <div className="flex items-center space-x-2">
          {isAssessment ? (
            <div
              id="assessment-step-counter"
              className="font-mono text-xs tracking-wider text-[#111318] bg-[#F3EFE6] px-2.5 py-1 rounded-full border border-[#E5DEC9]"
            >
              <span className="font-semibold text-[#8F7226]">{formattedStep}</span>
              <span className="text-[#8C827A] mx-1">/</span>
              <span className="text-[#57534E]">{formattedTotal}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[#B5ACA3] hover:text-[#8C827A] transition-colors p-1"
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
