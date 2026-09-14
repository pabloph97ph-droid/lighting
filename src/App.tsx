import React, { useState, useEffect } from 'react';
import { AssessmentAnswers } from './types';
import { Header } from './components/Header';
import { ScreenIntro } from './components/ScreenIntro';
import { ScreenPromise } from './components/ScreenPromise';
import { ScreenStudyTogether } from './components/ScreenStudyTogether';
import { QuestionCard } from './components/QuestionCard';
import { ScreenResult } from './components/ScreenResult';
import { AdminLeadsModal } from './components/AdminLeadsModal';

type AppStage = 'intro' | 'promise' | 'assessment' | 'interstitial_group' | 'result';

export default function App() {
  const [stage, setStage] = useState<AppStage>('intro');
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Form State
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    nome: '',
    objetivo: '',
    objetivoOutro: '',
    transformacaoDesejada: '',
    nivelPercebido: '',
    tempoEstudando: '',
    prazoDesejado: '',
    tempoDiario: '',
    situacaoProfissional: '',
    areaAtuacao: '',
    intencaoInternacional: '',
    pessoasParaEstudarJunto: '',
    email: '',
    instagram: '',
  });

  // Global keyboard shortcut to open Admin Modal (Ctrl+Shift+L or Cmd+Shift+L)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFieldChange = (field: keyof AssessmentAnswers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Step advancement logic
  const handleNextFromQuestion = () => {
    if (questionNumber === 9) {
      // Show Interstitial Screen before Q10
      setStage('interstitial_group');
    } else if (questionNumber === 12) {
      // Completed assessment
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setQuestionNumber((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Back navigation logic
  const handleBack = () => {
    if (stage === 'interstitial_group') {
      setStage('assessment');
      setQuestionNumber(9);
    } else if (stage === 'assessment') {
      if (questionNumber === 1) {
        setStage('promise');
      } else if (questionNumber === 10) {
        // Go back to interstitial group screen
        setStage('interstitial_group');
      } else {
        setQuestionNumber((prev) => prev - 1);
      }
    } else if (stage === 'promise') {
      setStage('intro');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111318] selection:bg-[#EBDDBE] selection:text-[#111318]">
      {/* Header bar */}
      <Header
        currentStepIndex={questionNumber}
        totalQuestions={12}
        isAssessment={stage === 'assessment' || stage === 'interstitial_group'}
        onBack={handleBack}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col pt-12">
        {stage === 'intro' && (
          <ScreenIntro
            onStart={() => {
              setStage('promise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {stage === 'promise' && (
          <ScreenPromise
            onContinue={() => {
              setStage('assessment');
              setQuestionNumber(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {stage === 'assessment' && (
          <QuestionCard
            questionNumber={questionNumber}
            answers={answers}
            onChange={handleFieldChange}
            onNext={handleNextFromQuestion}
          />
        )}

        {stage === 'interstitial_group' && (
          <ScreenStudyTogether
            onContinue={() => {
              setStage('assessment');
              setQuestionNumber(10);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {stage === 'result' && <ScreenResult answers={answers} />}
      </main>

      {/* Admin Leads Modal */}
      <AdminLeadsModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
