import { TrackingParams } from '../types';

export function getTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);

  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    utmContent: urlParams.get('utm_content') || undefined,
    utmTerm: urlParams.get('utm_term') || undefined,
    ref: urlParams.get('ref') || undefined,
    gclid: urlParams.get('gclid') || undefined,
    fbclid: urlParams.get('fbclid') || undefined,
  };
}
