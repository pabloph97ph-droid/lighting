export type LeadScore = 'HOT' | 'WARM' | 'NURTURE';

export interface TrackingParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  ref?: string;
  gclid?: string;
  fbclid?: string;
}

export interface AssessmentAnswers {
  // Q1
  nome: string;
  // Q2
  objetivo: string;
  objetivoOutro?: string;
  // Q3
  transformacaoDesejada: string;
  // Q4
  nivelPercebido: string;
  // Q5
  tempoEstudando: string;
  // Q6
  prazoDesejado: string;
  // Q7
  tempoDiario: string;
  // Q8
  situacaoProfissional: string;
  areaAtuacao: string;
  // Q9
  intencaoInternacional: string;
  // Q10
  pessoasParaEstudarJunto: string;
  // Q11
  email: string;
  // Q12
  instagram?: string;
}

export interface LeadRecord extends AssessmentAnswers, TrackingParams {
  id: string;
  timestamp: string;
  leadScore: LeadScore;
  scoreReasons?: string[];
}
