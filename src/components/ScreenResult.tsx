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
      className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden bg-[#FAF9F6] text-[#111318]"
    >
      {/* Background illumination aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#F3EBDB]/70 via-[#FAF9F6]/50 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex items-center space-x-2 border border-[#E8E1D3] bg-[#F7F4EE]/80 px-4 py-1.5 rounded-full"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#B89748]" />
        <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#736D63] font-sans">
          Avaliação Concluída • LIGHTNING
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
        <div className="mx-auto w-14 h-14 rounded-full bg-[#F4EFE6] border border-[#E3D8C3] flex items-center justify-center text-[#8F7226] shadow-sm">
          <CheckCircle className="w-7 h-7" />
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111318] uppercase leading-[1.15]">
            SEU CAMINHO NÃO PRECISA SER IGUAL AO DE TODO MUNDO.
          </h2>
        </div>

        {/* Main Text */}
        <div className="space-y-4 max-w-lg mx-auto">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base text-[#524C44] leading-relaxed">
            Suas respostas nos ajudam a entender seu momento, seus objetivos e o que você realmente espera conquistar através do inglês.
          </p>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base font-medium text-[#211F1C] leading-relaxed">
            Agora vamos continuar essa conversa de forma mais pessoal.
          </p>
        </div>

        {/* Tailored Profile Summary Card */}
        <div className="bg-[#F6F2EA]/90 rounded-2xl p-5 sm:p-6 border border-[#E7DEC9] text-left shadow-sm space-y-3 max-w-lg mx-auto">
          <div className="flex items-center justify-between border-b border-[#E7DEC9] pb-3">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8C7436]">
              Registro Individual
            </span>
            <span className="text-xs font-mono text-[#7A746B]">
              {answers.nome.trim()} • {answers.prazoDesejado}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>
              <span className="text-[#8A8276] block text-[11px] uppercase tracking-wider">Foco Principal</span>
              <span className="font-medium text-[#1E1C19]">{answers.objetivo}</span>
            </div>
            <div>
              <span className="text-[#8A8276] block text-[11px] uppercase tracking-wider">Perfil Atual</span>
              <span className="font-medium text-[#1E1C19]">{answers.nivelPercebido}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Call to Action Button */}
        <div className="pt-2 space-y-3">
          <button
            id="btn-whatsapp-continue"
            type="button"
            onClick={handleOpenWhatsApp}
            className="group relative inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-10 py-4.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-b from-[#191C22] to-[#0A0C0F] shadow-xl hover:shadow-2xl hover:shadow-[#C5A059]/20 border border-[#323640]/60 transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-[0.18em]">CONTINUAR NO WHATSAPP</span>
            <ExternalLink className="w-4 h-4 text-[#E0C38A] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <p className="text-xs text-[#7A746B] font-['Plus_Jakarta_Sans',sans-serif]">
            Sua experiência continua por lá.
          </p>
        </div>

        {/* Discreet Backup Action: Copy Message Text */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#8A8276] hover:text-[#111318] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#F2EFE8]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#27AE60]" />
                <span className="text-[#27AE60]">Mensagem copiada para a área de transferência</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Visualizar ou copiar texto da mensagem</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Footer Signature */}
      <div className="z-10 text-[10px] uppercase tracking-[0.24em] text-[#A39B91]">
        LIGHTNING FOR THE WORLD • ATENDIMENTO EXCLUSIVO
      </div>
    </div>
  );
};
