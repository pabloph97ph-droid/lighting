import { AssessmentAnswers, LeadScore } from '../types';

export function calculateLeadScore(data: AssessmentAnswers): { score: LeadScore; reasons: string[] } {
  const reasons: string[] = [];

  const shortTermPrazos = ['30 dias', '2 meses', '4 meses'];
  const isShortTerm = shortTermPrazos.includes(data.prazoDesejado);

  const strongMotivations = [
    'Quero crescer profissionalmente',
    'Quero fazer negócios',
    'Quero viajar',
    'Quero me comunicar com estrangeiros',
  ];
  const hasStrongMotivation = strongMotivations.includes(data.objetivo);

  const strongInternational = [
    'Sim, vou viajar',
    'Sim, para trabalho ou negócios',
    'Sim, para estudos',
    'Sim, quero me preparar para novas oportunidades',
  ];
  const hasInternationalIntent = strongInternational.includes(data.intencaoInternacional);

  const goodAvailability = [
    '20 a 30 minutos',
    '30 a 60 minutos',
    'Mais de 1 hora',
  ];
  const hasGoodAvailability = goodAvailability.includes(data.tempoDiario);

  // Check HOT criteria:
  // prazo de até 4 meses + forte motivação + intenção internacional + disponibilidade de estudo
  if (isShortTerm && hasStrongMotivation && hasInternationalIntent && hasGoodAvailability) {
    reasons.push('Prazo prioritário (até 4 meses)');
    reasons.push('Alta relevância de objetivo');
    reasons.push('Uso internacional confirmado nos próximos 12 meses');
    reasons.push('Disponibilidade de estudo diária sólida');
    return { score: 'HOT', reasons };
  }

  // Check NURTURE criteria:
  // não possui prazo, baixa disponibilidade, objetivo pouco definido, interesse ainda exploratório
  const isNoDeadline = data.prazoDesejado === 'Não tenho um prazo definido';
  const isLowAvailability = data.tempoDiario === '10 a 15 minutos';
  const isExploratory = data.intencaoInternacional === 'Ainda não tenho planos';
  const isVagueGoal = data.objetivo === 'Outro';

  if ((isNoDeadline && isLowAvailability) || (isExploratory && isNoDeadline) || (isLowAvailability && isExploratory) || (isVagueGoal && isNoDeadline)) {
    reasons.push('Sem prazo definido ou horizonte distante');
    reasons.push('Tempo diário reduzido ou intenção exploratória');
    return { score: 'NURTURE', reasons };
  }

  // WARM: existe objetivo claro e interesse real, mas menor urgência ou disponibilidade
  reasons.push('Objetivo identificado com interesse genuíno');
  if (!isShortTerm) reasons.push('Prazo flexível ou moderado');
  if (!hasGoodAvailability) reasons.push('Janela de tempo concisa');

  return { score: 'WARM', reasons };
}
