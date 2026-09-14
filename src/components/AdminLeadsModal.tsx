import React, { useState, useEffect } from 'react';
import { X, Download, RefreshCw, Flame, Clock, Compass, Shield, Code, Check } from 'lucide-react';
import { LeadRecord } from '../types';
import { fetchLeads } from '../services/leadService';

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
    link.setAttribute('download', `leads_lightning_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sampleAppsScriptCode = `// Google Apps Script para receber Leads da LIGHTNING em Google Sheets
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#DDD5C5] shadow-2xl flex flex-col overflow-hidden text-[#111318]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D5] flex items-center justify-between bg-[#F5F1E8]">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-[#8F7226]" />
            <div>
              <h3 className="font-['Cinzel',serif] text-sm font-bold tracking-wider uppercase text-[#111318]">
                LIGHTNING Command & Lead Intelligence
              </h3>
              <p className="text-[11px] text-[#706B63]">
                Armazenamento de Leads, Scoring Interno e Integrações
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#EAE4D7] text-[#706B63] hover:text-[#111318] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-[#F8F5EE] border-b border-[#EAE3D5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-[#111318]">
              {leads.length} {leads.length === 1 ? 'avaliação registrada' : 'avaliações registradas'}
            </span>
            <button
              onClick={loadLeads}
              disabled={loading}
              className="p-1 text-[#706B63] hover:text-[#111318] transition-colors"
              title="Recarregar dados"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#D9D1C1] bg-white hover:bg-[#F2ECE0] text-[#3D3830] transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-[#8F7226]" />
              <span>{showCode ? 'Ocultar Código Apps Script' : 'Google Apps Script (Webhook)'}</span>
            </button>

            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#3B3F4A] bg-[#111318] text-white hover:bg-[#222630] transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#E0C38A]" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Apps Script Guide Drawer */}
        {showCode && (
          <div className="px-6 py-4 bg-[#F2EDE2] border-b border-[#EAE3D5] text-xs space-y-2 max-h-60 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#111318] uppercase tracking-wider text-[11px]">
                Script para Google Sheets (Webhook Web App)
              </span>
              <button
                onClick={copyAppsScript}
                className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#8F7226] hover:underline"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>
            <pre className="p-3 bg-white border border-[#DDD5C5] rounded-lg font-mono text-[11px] text-[#22242A] overflow-x-auto whitespace-pre">
              {sampleAppsScriptCode}
            </pre>
          </div>
        )}

        {/* Content: Leads Table / Cards */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-[#8C847A] space-y-2">
              <Compass className="w-10 h-10 mx-auto opacity-40 text-[#8F7226]" />
              <p className="text-sm font-medium">Nenhum lead registrado ainda.</p>
              <p className="text-xs max-w-sm mx-auto">
                Assim que os usuários concluírem as avaliações no app, os dados e scores HOT, WARM ou NURTURE aparecerão aqui automaticamente.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => {
                const scoreColors = {
                  HOT: 'bg-red-50 text-red-700 border-red-200',
                  WARM: 'bg-amber-50 text-amber-800 border-amber-200',
                  NURTURE: 'bg-blue-50 text-blue-700 border-blue-200',
                };
                const scoreIcons = {
                  HOT: <Flame className="w-3.5 h-3.5 text-red-600" />,
                  WARM: <Clock className="w-3.5 h-3.5 text-amber-600" />,
                  NURTURE: <Compass className="w-3.5 h-3.5 text-blue-600" />,
                };

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl border border-[#E3DBCB] bg-white shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0EBE0] pb-2.5">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-[#111318] text-base">{lead.nome}</span>
                        <span className="text-xs text-[#706B63]">{lead.email}</span>
                        {lead.instagram && (
                          <span className="text-xs font-mono text-[#8C7436] bg-[#F7F3EB] px-2 py-0.5 rounded">
                            {lead.instagram}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            scoreColors[lead.leadScore] || 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          {scoreIcons[lead.leadScore]}
                          <span>{lead.leadScore}</span>
                        </span>
                        <span className="text-[11px] text-[#9E978C] font-mono">
                          {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#524C44]">
                      <div>
                        <span className="text-[10px] uppercase text-[#9E978C] block">Objetivo</span>
                        <span className="font-medium text-[#111318]">{lead.objetivo}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#9E978C] block">Nível</span>
                        <span className="font-medium text-[#111318]">{lead.nivelPercebido}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#9E978C] block">Prazo & Dedicação</span>
                        <span className="font-medium text-[#111318]">
                          {lead.prazoDesejado} • {lead.tempoDiario}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#9E978C] block">Carreira & Área</span>
                        <span className="font-medium text-[#111318]">
                          {lead.situacaoProfissional} ({lead.areaAtuacao || 'Geral'})
                        </span>
                      </div>
                    </div>

                    {lead.transformacaoDesejada && (
                      <div className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#EAE3D3] text-xs text-[#3D3830]">
                        <span className="font-semibold text-[#8F7226] block text-[10px] uppercase tracking-wider mb-0.5">
                          Transformação Desejada:
                        </span>
                        {lead.transformacaoDesejada}
                      </div>
                    )}

                    {/* Attribution / UTMs */}
                    {(lead.utmSource || lead.utmCampaign || lead.ref) && (
                      <div className="text-[10px] font-mono text-[#8C847A] flex flex-wrap gap-2 pt-1 border-t border-[#F5F0E6]">
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
