import React, { useState, useEffect } from 'react';
import { X, Download, RefreshCw, Flame, Clock, Compass, Shield, Code, Check } from 'lucide-react';
import { LeadRecord } from '../types';
import { fetchLeads } from '../services/leadService';
import { JumperMonogram } from './JumperMonogram';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'Timestamp',
      'Nome',
      'Email',
      'Instagram',
      'Score',
      'Objetivo',
      'Nível',
      'Prazo',
      'Tempo Diário',
      'Situação Profissional',
      'Área',
      'Internacional 12m',
      'Estudo Conjunto',
      'Transformação Desejada',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Content',
      'UTM Term',
    ];

    const rows = leads.map((l) => [
      `"${l.timestamp}"`,
      `"${l.nome}"`,
      `"${l.email}"`,
      `"${l.instagram || ''}"`,
      `"${l.leadScore}"`,
      `"${l.objetivo}"`,
      `"${l.nivelPercebido}"`,
      `"${l.prazoDesejado}"`,
      `"${l.tempoDiario}"`,
      `"${l.situacaoProfissional}"`,
      `"${l.areaAtuacao || ''}"`,
      `"${l.intencaoInternacional}"`,
      `"${l.pessoasParaEstudarJunto}"`,
      `"${(l.transformacaoDesejada || '').replace(/"/g, '""')}"`,
      `"${l.utmSource || ''}"`,
      `"${l.utmMedium || ''}"`,
      `"${l.utmCampaign || ''}"`,
      `"${l.utmContent || ''}"`,
      `"${l.utmTerm || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_jumper_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleAppsScriptCode = `// Google Apps Script para receber Leads da JUMPER em Google Sheets
// 1. Abra sua planilha Google
// 2. Acesse Extensões > Apps Script
// 3. Cole o código abaixo e clique em Implantar > Nova Implantação (Web App)
// 4. Acesso: "Qualquer pessoa" (Anyone)
// 5. Defina a URL gerada na variável GOOGLE_SHEETS_WEBHOOK_URL no .env

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Cria cabeçalhos na primeira linha se vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data/Hora", "Nome", "E-mail", "Instagram", "Score", 
        "Objetivo", "Nível Percebido", "Prazo", "Tempo Diário",
        "Situação Profissional", "Área de Atuação", "Uso Internacional",
        "Estudo em Grupo", "Transformação Desejada", "UTM Source", "UTM Campaign"
      ]);
    }
    
    sheet.appendRow([
      data.timestamp || new Date(),
      data.nome,
      data.email,
      data.instagram || "",
      data.leadScore || "",
      data.objetivo,
      data.nivelPercebido,
      data.prazoDesejado,
      data.tempoDiario,
      data.situacaoProfissional,
      data.areaAtuacao || "",
      data.intencaoInternacional,
      data.pessoasParaEstudarJunto,
      data.transformacaoDesejada,
      data.utmSource || "",
      data.utmCampaign || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B0914] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#2B2142] shadow-2xl shadow-[#7C3AED]/20 flex flex-col overflow-hidden text-[#F5F3FA]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#211A34] flex items-center justify-between bg-[#110D20]">
          <div className="flex items-center space-x-3">
            <JumperMonogram size={26} />
            <div>
              <h3 className="font-['Syne',sans-serif] text-sm font-bold tracking-wider uppercase text-white">
                JUMPER Intelligence & Lead Command
              </h3>
              <p className="text-[11px] text-[#9E94B3]">
                Armazenamento de Leads, Scoring e Rastreamento de Conversão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E1734] text-[#9E94B3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-[#130F24] border-b border-[#211A34] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">
              {leads.length} {leads.length === 1 ? 'avaliação registrada' : 'avaliações registradas'}
            </span>
            <button
              onClick={loadLeads}
              disabled={loading}
              className="p-1 text-[#9E94B3] hover:text-white transition-colors"
              title="Recarregar dados"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#342852] bg-[#1A142E] hover:bg-[#231A3D] text-[#DDD6EA] transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>{showCode ? 'Ocultar Script' : 'Google Apps Script (Webhook)'}</span>
            </button>

            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#A78BFA]/30 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white hover:brightness-110 transition-all disabled:opacity-50 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Apps Script Guide Drawer */}
        {showCode && (
          <div className="px-6 py-4 bg-[#140F26] border-b border-[#211A34] text-xs space-y-2 max-h-60 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#C084FC] uppercase tracking-wider text-[11px]">
                Script para Google Sheets (Webhook Web App)
              </span>
              <button
                onClick={copyAppsScript}
                className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#C084FC] hover:underline"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0A0812] border border-[#2B2140] rounded-lg font-mono text-[11px] text-[#D8B4FE] overflow-x-auto whitespace-pre">
              {sampleAppsScriptCode}
            </pre>
          </div>
        )}

        {/* Content: Leads Table / Cards */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-[#7E7495] space-y-2">
              <Compass className="w-10 h-10 mx-auto opacity-40 text-[#C084FC]" />
              <p className="text-sm font-medium text-[#B4AAC7]">Nenhum lead registrado ainda.</p>
              <p className="text-xs max-w-sm mx-auto text-[#7E7495]">
                Assim que os usuários concluírem as avaliações no app, os dados e scores HOT, WARM ou NURTURE aparecerão aqui automaticamente.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => {
                const scoreColors = {
                  HOT: 'bg-red-950/60 text-red-300 border-red-800/60',
                  WARM: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
                  NURTURE: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
                };
                const scoreIcons = {
                  HOT: <Flame className="w-3.5 h-3.5 text-red-400" />,
                  WARM: <Clock className="w-3.5 h-3.5 text-amber-400" />,
                  NURTURE: <Compass className="w-3.5 h-3.5 text-purple-400" />,
                };

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl border border-[#251E38] bg-[#110E1F] shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1732] pb-2.5">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-white text-base">{lead.nome}</span>
                        <span className="text-xs text-[#9E94B3]">{lead.email}</span>
                        {lead.instagram && (
                          <span className="text-xs font-mono text-[#C084FC] bg-[#1C1433] px-2 py-0.5 rounded border border-[#342454]">
                            {lead.instagram}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            scoreColors[lead.leadScore] || 'bg-gray-900 text-gray-300 border-gray-700'
                          }`}
                        >
                          {scoreIcons[lead.leadScore]}
                          <span>{lead.leadScore}</span>
                        </span>
                        <span className="text-[11px] text-[#7E7495] font-mono">
                          {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#B4AAC7]">
                      <div>
                        <span className="text-[10px] uppercase text-[#7E7495] block">Objetivo</span>
                        <span className="font-medium text-white">{lead.objetivo}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#7E7495] block">Nível</span>
                        <span className="font-medium text-white">{lead.nivelPercebido}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#7E7495] block">Prazo & Dedicação</span>
                        <span className="font-medium text-white">
                          {lead.prazoDesejado} • {lead.tempoDiario}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#7E7495] block">Carreira & Área</span>
                        <span className="font-medium text-white">
                          {lead.situacaoProfissional} ({lead.areaAtuacao || 'Geral'})
                        </span>
                      </div>
                    </div>

                    {lead.transformacaoDesejada && (
                      <div className="p-2.5 rounded-lg bg-[#140F24] border border-[#271D3E] text-xs text-[#DDD6EA]">
                        <span className="font-semibold text-[#C084FC] block text-[10px] uppercase tracking-wider mb-0.5">
                          Transformação Desejada:
                        </span>
                        {lead.transformacaoDesejada}
                      </div>
                    )}

                    {/* Attribution / UTMs */}
                    {(lead.utmSource || lead.utmCampaign || lead.ref) && (
                      <div className="text-[10px] font-mono text-[#7E7495] flex flex-wrap gap-2 pt-1 border-t border-[#1C1630]">
                        {lead.utmSource && <span>utm_source: {lead.utmSource}</span>}
                        {lead.utmMedium && <span>utm_medium: {lead.utmMedium}</span>}
                        {lead.utmCampaign && <span>utm_campaign: {lead.utmCampaign}</span>}
                        {lead.ref && <span>ref: {lead.ref}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
