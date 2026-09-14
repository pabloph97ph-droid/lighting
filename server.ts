import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface LeadPayload {
  id: string;
  timestamp: string;
  nome: string;
  objetivo: string;
  objetivoOutro?: string;
  transformacaoDesejada: string;
  nivelPercebido: string;
  tempoEstudando: string;
  prazoDesejado: string;
  tempoDiario: string;
  situacaoProfissional: string;
  areaAtuacao: string;
  intencaoInternacional: string;
  pessoasParaEstudarJunto: string;
  email: string;
  instagram?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  ref?: string;
  gclid?: string;
  fbclid?: string;
  leadScore: string;
  scoreReasons?: string[];
}

const storedLeads: LeadPayload[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'LIGHTNING API',
      timestamp: new Date().toISOString(),
      googleSheetsWebhookConfigured: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    });
  });

  // Get leads (for admin overview and verification)
  app.get('/api/leads', (req, res) => {
    res.json({
      success: true,
      total: storedLeads.length,
      leads: storedLeads,
    });
  });

  // Store lead & optional Google Sheets forwarder
  app.post('/api/leads', async (req, res) => {
    try {
      const leadData: LeadPayload = req.body;

      if (!leadData || !leadData.nome || !leadData.email) {
        res.status(400).json({ error: 'Dados incompletos: nome e email são obrigatórios.' });
        return;
      }

      // Store in memory
      storedLeads.unshift(leadData);
      if (storedLeads.length > 500) {
        storedLeads.pop();
      }

      console.log(`[LIGHTNING Lead] New assessment submitted by ${leadData.nome} (${leadData.email}) - Score: ${leadData.leadScore}`);

      // Forward to Google Apps Script Web App if configured
      const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (googleSheetsWebhookUrl && googleSheetsWebhookUrl.startsWith('http')) {
        try {
          // Asynchronously forward to Google Apps Script
          fetch(googleSheetsWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: leadData.timestamp,
              nome: leadData.nome,
              objetivo: leadData.objetivoOutro ? `${leadData.objetivo} (${leadData.objetivoOutro})` : leadData.objetivo,
              transformacaoDesejada: leadData.transformacaoDesejada,
              nivelPercebido: leadData.nivelPercebido,
              tempoEstudando: leadData.tempoEstudando,
              prazoDesejado: leadData.prazoDesejado,
              tempoDiario: leadData.tempoDiario,
              situacaoProfissional: leadData.situacaoProfissional,
              areaAtuacao: leadData.areaAtuacao,
              intencaoInternacional: leadData.intencaoInternacional,
              pessoasParaEstudarJunto: leadData.pessoasParaEstudarJunto,
              email: leadData.email,
              instagram: leadData.instagram || '',
              utmSource: leadData.utmSource || '',
              utmMedium: leadData.utmMedium || '',
              utmCampaign: leadData.utmCampaign || '',
              utmContent: leadData.utmContent || '',
              leadScore: leadData.leadScore,
            }),
          }).catch(forwardErr => {
            console.warn('[LIGHTNING Webhook] Error forwarding to Google Sheets:', forwardErr);
          });
        } catch (forwardErr) {
          console.warn('[LIGHTNING Webhook] Failed to initiate Google Sheets forward:', forwardErr);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Lead registrado com sucesso na LIGHTNING.',
        id: leadData.id,
      });
    } catch (err) {
      console.error('[LIGHTNING API] Error processing lead:', err);
      res.status(500).json({ error: 'Erro interno ao salvar lead.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LIGHTNING server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
