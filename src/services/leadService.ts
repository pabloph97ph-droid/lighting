import { AssessmentAnswers, LeadRecord, TrackingParams } from '../types';
import { calculateLeadScore } from '../utils/leadScoring';
import { getTrackingParams } from '../utils/tracking';

const LOCAL_STORAGE_KEY = 'lightning_leads_backup';

export async function submitLead(
  answers: AssessmentAnswers,
  trackingOverride?: TrackingParams
): Promise<{ success: boolean; lead: LeadRecord }> {
  const tracking = trackingOverride || getTrackingParams();
  const scoring = calculateLeadScore(answers);

  const leadRecord: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...answers,
    ...tracking,
    leadScore: scoring.score,
    scoreReasons: scoring.reasons,
  };

  // 1. Local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existing.unshift(leadRecord);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not backup lead to localStorage:', err);
  }

  // 2. Server API POST /api/leads (non-blocking, never halts execution)
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadRecord),
    });

    if (!response.ok) {
      console.warn(`Lead API returned status ${response.status}`);
    }
  } catch (error) {
    // Graceful silent recovery: WhatsApp and user journey are never blocked
    console.warn('Network error sending lead to /api/leads:', error);
  }

  // 3. Direct Google Sheets Webhook fallback (ideal for static hosts like Netlify)
  const clientWebhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  if (clientWebhookUrl && typeof clientWebhookUrl === 'string' && clientWebhookUrl.startsWith('http')) {
    try {
      fetch(clientWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
      }).catch((webhookErr) => {
        console.warn('Could not post directly to Google Sheets Webhook:', webhookErr);
      });
    } catch (e) {
      console.warn('Direct webhook trigger failed:', e);
    }
  }

  return { success: true, lead: leadRecord };
}

export async function fetchLeads(): Promise<LeadRecord[]> {
  try {
    const response = await fetch('/api/leads');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.leads)) {
        return data.leads;
      }
    }
  } catch (err) {
    console.warn('Could not fetch leads from server, using local cache:', err);
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
