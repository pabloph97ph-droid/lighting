import { AssessmentAnswers } from '../types';

export const WHATSAPP_PHONE = '5511914966246';

export function formatWhatsAppMessage(data: AssessmentAnswers): string {
  const objetivo = data.objetivo === 'Outro' && data.objetivoOutro
    ? `Outro (${data.objetivoOutro})`
    : data.objetivo;

  const instagram = data.instagram && data.instagram.trim()
    ? (data.instagram.startsWith('@') ? data.instagram.trim() : `@${data.instagram.trim()}`)
    : 'Não informado';

  const areaAtuacao = data.areaAtuacao?.trim() || 'Não especificada';

  const message = `Olá! Acabei de realizar a avaliação da Jumper.

Meu nome é ${data.nome.trim()}.

Meu principal objetivo com o inglês é: ${objetivo}.

O que eu gostaria de mudar na minha vida é:
${data.transformacaoDesejada.trim()}

Já estudei inglês por: ${data.tempoEstudando}.

Hoje me identifico com:
${data.nivelPercebido}.

Quero alcançar uma evolução real em:
${data.prazoDesejado}.

Consigo dedicar:
${data.tempoDiario}.

Pretendo utilizar o inglês internacionalmente nos próximos 12 meses:
${data.intencaoInternacional}.

Minha área de atuação é:
${areaAtuacao}.

Atualmente:
${data.situacaoProfissional}.

Tenho alguém que poderia estudar comigo:
${data.pessoasParaEstudarJunto}.

Instagram:
${instagram}

E-mail:
${data.email.trim()}

Gostaria de entender qual seria o melhor caminho para mim.`;

  return message;
}

export function getWhatsAppUrl(data: AssessmentAnswers): string {
  const text = formatWhatsAppMessage(data);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
