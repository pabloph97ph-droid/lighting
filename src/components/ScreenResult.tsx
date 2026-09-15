import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, CheckCircle, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import { AssessmentAnswers } from '../types';
import { formatWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';
import { submitLead } from '../services/leadService';

interface ScreenResultProps {
  answers: AssessmentAnswers;
}

export const ScreenResult: React.FC<ScreenResultProps> = ({ answers }) => {
  const [copied, setCopied] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  // Submit lead immediately on arrival to final screen
  useEffect(() => {
    let isMounted = true;
    submitLead(answers).then(() => {
      if (isMounted) setLeadSaved(true);
    });
    return () => {
      isMounted = false;
    };
  }, [answers]);

  const handleOpenWhatsApp = () => {
    // Ensure lead is submitted
    submitLead(answers);
    const url = getWhatsAppUrl(answers);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const text = formatWhatsAppMessage(answers);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="screen-result"
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#07060A] text-[#F5F3FA]"
    >
      {/* Background illumination aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#581C87]/35 via-[#7C3AED]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center space-x-2 border border-[#342455] bg-[#120B24]/80 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.18)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
        <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#D8B4FE] font-sans">
          Avaliação Concluída • JUMPER
        </span>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="z-10 my-auto w-full max-w-xl text-center py-6 space-y-7"
      >
        {/* Subtle Checkmark Embellishment */}
        <div className="mx-auto w-14 h-14 rounded-full bg-[#150F26] border border-[#3A265E] flex items-center justify-center text-[#C084FC] shadow-lg shadow-[#7C3AED]/20">
          <CheckCircle className="w-7 h-7" />
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white uppercase leading-[1.15]">
            SEU CAMINHO NÃO PRECISA SER IGUAL AO DE TODO MUNDO.
          </h2>
        </div>

        {/* Main Text */}
        <div className="space-y-4 max-w-lg mx-auto">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#B4AAC7] leading-relaxed">
            Suas respostas nos ajudam a entender seu momento, seus objetivos e o que você realmente espera conquistar através do inglês.
          </p>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base font-medium text-white leading-relaxed">
            Agora vamos continuar essa conversa de forma mais pessoal.
          </p>
        </div>

        {/* Tailored Profile Summary Card */}
        <div className="bg-[#110E1E] rounded-2xl p-5 sm:p-6 border border-[#2B2140] text-left shadow-lg shadow-[#7C3AED]/10 space-y-3 max-w-lg mx-auto">
          <div className="flex items-center justify-between border-b border-[#231A36] pb-3">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C084FC]">
              Registro Individual
            </span>
            <span className="text-xs font-mono text-[#9E94B3]">
              {answers.nome.trim()} • {answers.prazoDesejado}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            <div>
              <span className="text-[#7E7495] block text-[11px] uppercase tracking-wider">Foco Principal</span>
              <span className="font-medium text-[#EDE8F5]">{answers.objetivo}</span>
            </div>
            <div>
              <span className="text-[#7E7495] block text-[11px] uppercase tracking-wider">Perfil Atual</span>
              <span className="font-medium text-[#EDE8F5]">{answers.nivelPercebido}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Call to Action Button */}
        <div className="pt-2 space-y-3">
          <button
            id="btn-whatsapp-continue"
            type="button"
            onClick={handleOpenWhatsApp}
            className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#171325] via-[#21163A] to-[#2D164E] hover:from-[#1D1730] hover:to-[#391B64] border border-[#8B5CF6]/50 shadow-[0_0_28px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]" />
            <span className="tracking-[0.18em]">CONTINUAR NO WHATSAPP</span>
            <ExternalLink className="w-4 h-4 text-[#C084FC] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <p className="text-xs text-[#8E84A3] font-['Plus_Jakarta_Sans',sans-serif]">
            Sua experiência continua por lá.
          </p>
        </div>

        {/* Discreet Backup Action: Copy Message Text */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#9E94B3] hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-[#161224]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="text-[#25D366]">Mensagem copiada para a área de transferência</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Visualizar ou copiar texto da mensagem</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Footer Signature */}
      <div className="z-10 text-[10px] uppercase tracking-[0.24em] text-[#7E7495]">
        JUMPER FOR THE WORLD • ATENDIMENTO EXCLUSIVO
      </div>
    </div>
  );
};
