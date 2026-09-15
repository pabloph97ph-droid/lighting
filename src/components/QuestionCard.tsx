import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { AssessmentAnswers } from '../types';

interface QuestionCardProps {
  questionNumber: number; // 1 to 12
  answers: AssessmentAnswers;
  onChange: (field: keyof AssessmentAnswers, value: string) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  answers,
  onChange,
  onNext,
}) => {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Focus input automatically
  useEffect(() => {
    setError(null);
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, [questionNumber]);

  // Validation before proceeding
  const handleValidateAndNext = () => {
    setError(null);

    switch (questionNumber) {
      case 1:
        if (!answers.nome.trim()) {
          setError('Por favor, informe o seu primeiro nome para continuarmos.');
          return;
        }
        break;
      case 2:
        if (!answers.objetivo) {
          setError('Selecione a opção que melhor reflete seu momento.');
          return;
        }
        if (answers.objetivo === 'Outro' && !answers.objetivoOutro?.trim()) {
          setError('Por favor, especifique brevemente o seu objetivo.');
          return;
        }
        break;
      case 3:
        if (!answers.transformacaoDesejada.trim() || answers.transformacaoDesejada.trim().length < 8) {
          setError('Por favor, compartilhe com um pouco mais de detalhes o que você deseja conquistar.');
          return;
        }
        break;
      case 4:
        if (!answers.nivelPercebido) {
          setError('Selecione como você se sente hoje.');
          return;
        }
        break;
      case 5:
        if (!answers.tempoEstudando) {
          setError('Selecione há quanto tempo você estuda ou estudou.');
          return;
        }
        break;
      case 6:
        if (!answers.prazoDesejado) {
          setError('Selecione sua expectativa de prazo.');
          return;
        }
        break;
      case 7:
        if (!answers.tempoDiario) {
          setError('Selecione o tempo que consegue dedicar por dia.');
          return;
        }
        break;
      case 8:
        if (!answers.situacaoProfissional) {
          setError('Selecione sua situação profissional atual.');
          return;
        }
        if (!answers.areaAtuacao?.trim()) {
          setError('Informe sua área de atuação (ex: Tecnologia, Saúde, Negócios, etc.).');
          return;
        }
        break;
      case 9:
        if (!answers.intencaoInternacional) {
          setError('Selecione sua perspectiva para os próximos 12 meses.');
          return;
        }
        break;
      case 10:
        if (!answers.pessoasParaEstudarJunto) {
          setError('Selecione uma opção para continuar.');
          return;
        }
        break;
      case 11:
        {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!answers.email.trim() || !emailRegex.test(answers.email.trim())) {
            setError('Por favor, informe um endereço de e-mail válido.');
            return;
          }
        }
        break;
      case 12:
        // Instagram is optional
        break;
    }

    onNext();
  };

  const handleSelectOption = (field: keyof AssessmentAnswers, value: string, autoAdvance = true) => {
    onChange(field, value);
    setError(null);
    if (autoAdvance) {
      setTimeout(() => {
        onNext();
      }, 260);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && questionNumber !== 3) {
      e.preventDefault();
      handleValidateAndNext();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-5 py-8 sm:py-12 min-h-[70vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={questionNumber}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full space-y-7"
        >
          {/* QUESTION 1: Nome */}
          {questionNumber === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Apresentação
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Qual é o seu nome?
                </h3>
                <p className="text-sm text-[#9E94B3] font-['Plus_Jakarta_Sans',sans-serif]">
                  Como gostaria de ser chamado durante a sua avaliação institucional.
                </p>
              </div>

              <div className="pt-2">
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  id="input-name"
                  type="text"
                  value={answers.nome}
                  onChange={(e) => onChange('nome', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite seu primeiro nome"
                  autoComplete="given-name"
                  className="w-full text-xl sm:text-2xl py-4 px-5 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30 shadow-inner transition-all"
                />
              </div>
            </div>
          )}

          {/* QUESTION 2: Objetivo */}
          {questionNumber === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Motivação Principal
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  O que fez você querer melhorar seu inglês agora?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  'Quero viajar',
                  'Quero crescer profissionalmente',
                  'Quero fazer negócios',
                  'Quero me comunicar com estrangeiros',
                  'Quero estudar',
                  'Quero realizar um sonho pessoal',
                  'Outro',
                ].map((option) => {
                  const isSelected = answers.objetivo === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('objetivo', option, option !== 'Outro')}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}

                {answers.objetivo === 'Outro' && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={answers.objetivoOutro || ''}
                      onChange={(e) => onChange('objetivoOutro', e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Especifique brevemente seu objetivo"
                      className="w-full text-base py-3 px-4 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUESTION 3: Pergunta aberta destacada */}
          {questionNumber === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Visão de Futuro</span>
                </div>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
                  Se você falasse inglês com segurança, o que isso poderia mudar na sua vida?
                </h3>
                <p className="text-xs sm:text-sm text-[#9E94B3] leading-relaxed">
                  Pense além de uma sala de aula: viagens, posições executivas, autonomia para negociar ou experiências com o mundo.
                </p>
              </div>

              <div className="pt-2">
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  id="textarea-transformation"
                  rows={5}
                  value={answers.transformacaoDesejada}
                  onChange={(e) => onChange('transformacaoDesejada', e.target.value)}
                  placeholder="Conte brevemente o que você gostaria de viver, conquistar ou desbloquear através do inglês…"
                  className="w-full text-base sm:text-lg p-5 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30 shadow-inner leading-relaxed transition-all resize-none"
                />
                <div className="flex justify-between items-center text-[11px] text-[#7E7495] px-1 mt-1.5">
                  <span>Essa resposta ajuda a calibrar sua experiência individual.</span>
                  <span>{answers.transformacaoDesejada.length} caracteres</span>
                </div>
              </div>
            </div>
          )}

          {/* QUESTION 4: Situação atual */}
          {questionNumber === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Diagnóstico Atual
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Como você se sente hoje com seu inglês?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  'Estou começando do zero',
                  'Entendo, mas travo para falar',
                  'Consigo me comunicar, mas tenho insegurança',
                  'Consigo conversar, mas quero evoluir',
                  'Já falo bem e quero me aperfeiçoar',
                ].map((option) => {
                  const isSelected = answers.nivelPercebido === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('nivelPercebido', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 5: Tempo estudando */}
          {questionNumber === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Histórico
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Há quanto tempo você estuda ou já estudou inglês?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  'Nunca estudei',
                  'Menos de 1 ano',
                  '1 a 2 anos',
                  '3 a 5 anos',
                  'Mais de 5 anos',
                ].map((option) => {
                  const isSelected = answers.tempoEstudando === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('tempoEstudando', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 6: Prazo desejado */}
          {questionNumber === 6 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Expectativa Temporal
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Em quanto tempo você gostaria de sentir uma evolução real?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  '30 dias',
                  '2 meses',
                  '4 meses',
                  '6 meses',
                  'Não tenho um prazo definido',
                ].map((option) => {
                  const isSelected = answers.prazoDesejado === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('prazoDesejado', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 7: Tempo diário */}
          {questionNumber === 7 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Rotina & Constância
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Quanto tempo você consegue dedicar ao inglês por dia?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  '10 a 15 minutos',
                  '20 a 30 minutos',
                  '30 a 60 minutos',
                  'Mais de 1 hora',
                ].map((option) => {
                  const isSelected = answers.tempoDiario === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('tempoDiario', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 8: Contexto Profissional */}
          {questionNumber === 8 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Momento de Carreira
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Como o inglês se conecta hoje com a sua vida profissional?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  'Tenho uma empresa',
                  'Trabalho em uma empresa',
                  'Sou autônomo ou profissional liberal',
                  'Sou estudante',
                  'Estou buscando uma oportunidade',
                  'Outro',
                ].map((option) => {
                  const isSelected = answers.situacaoProfissional === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange('situacaoProfissional', option)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Area de Atuacao */}
              <div className="pt-2 border-t border-[#231C34]">
                <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#A89EB8] mb-2">
                  Qual é a sua área de atuação?
                </label>
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type="text"
                  value={answers.areaAtuacao}
                  onChange={(e) => onChange('areaAtuacao', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: Tecnologia, Finanças, Saúde, Gestão, Direito..."
                  className="w-full text-base py-3 px-4 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30"
                />
              </div>
            </div>
          )}

          {/* QUESTION 9: Uso Internacional */}
          {questionNumber === 9 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Presença Global
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Você pretende usar o inglês internacionalmente nos próximos 12 meses?
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  'Sim, vou viajar',
                  'Sim, para trabalho ou negócios',
                  'Sim, para estudos',
                  'Sim, quero me preparar para novas oportunidades',
                  'Talvez',
                  'Ainda não tenho planos',
                ].map((option) => {
                  const isSelected = answers.intencaoInternacional === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('intencaoInternacional', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 10: Alguém para estudar junto */}
          {questionNumber === 10 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Comunidade & Prática
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Você teria alguém para estudar junto?
                </h3>
                <p className="text-xs sm:text-sm text-[#9E94B3]">
                  Um amigo, colega de trabalho, cônjuge ou familiar que compartilha da mesma aspiração.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  'Sim, uma pessoa',
                  'Sim, duas ou mais',
                  'Talvez',
                  'Não',
                ].map((option) => {
                  const isSelected = answers.pessoasParaEstudarJunto === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption('pessoasParaEstudarJunto', option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#8B5CF6] bg-[#1E1633] shadow-[0_0_20px_rgba(139,92,246,0.22)]'
                          : 'border-[#241E34] bg-[#110F1D] hover:border-[#7C3AED]/60 hover:bg-[#161326]'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          isSelected ? 'text-white font-semibold' : 'text-[#DDD6EA]'
                        }`}
                      >
                        {option}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#8B5CF6] bg-[#8B5CF6] text-white shadow-[0_0_8px_#A855F7]'
                            : 'border-[#372E4C] group-hover:border-[#8B5CF6]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION 11: E-mail */}
          {questionNumber === 11 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Contato Oficial
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Qual é o seu melhor e-mail?
                </h3>
                <p className="text-xs sm:text-sm text-[#9E94B3]">
                  Para enviarmos seu registro institucional e síntese do seu diagnóstico.
                </p>
              </div>

              <div className="pt-2">
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  id="input-email"
                  type="email"
                  value={answers.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="exemplo@dominio.com"
                  autoComplete="email"
                  className="w-full text-lg sm:text-xl py-4 px-5 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30 shadow-inner transition-all"
                />
              </div>
            </div>
          )}

          {/* QUESTION 12: Instagram */}
          {questionNumber === 12 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#C084FC]">
                  Conexão Opcional
                </span>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  Qual é o seu Instagram?
                </h3>
                <p className="text-xs sm:text-sm text-[#9E94B3]">
                  Opcional — ajuda nossa equipe a conhecer melhor seu momento.
                </p>
              </div>

              <div className="pt-2">
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  id="input-instagram"
                  type="text"
                  value={answers.instagram || ''}
                  onChange={(e) => onChange('instagram', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="@seuinstagram"
                  className="w-full text-lg sm:text-xl py-4 px-5 bg-[#0F0D18] border border-[#2B233F] rounded-xl text-white placeholder-[#685F7A] focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30 shadow-inner transition-all"
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-[#FFA4B6] bg-[#2D0B18] p-3 rounded-lg border border-[#6E1C37]"
            >
              {error}
            </motion.p>
          )}

          {/* Bottom Action Button */}
          <div className="pt-4">
            <button
              id="btn-question-continue"
              type="button"
              onClick={handleValidateAndNext}
              className="group inline-flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-3.5 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] shadow-md shadow-[#7C3AED]/25 hover:shadow-lg hover:shadow-[#A855F7]/40 transition-all hover:scale-[1.015] active:scale-[0.99] border border-[#A78BFA]/30 cursor-pointer"
            >
              <span>{questionNumber === 12 ? 'FINALIZAR AVALIAÇÃO' : 'CONTINUAR'}</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
