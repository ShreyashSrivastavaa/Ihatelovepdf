/**
 * Zero-telemetry analytics stub.
 * All third-party trackers (GA4, PagePulse) have been permanently removed.
 * Processing is 100% in-browser with zero document or telemetry uploads.
 */

type TrackEventOptions = {
  action?: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
};

export const isAnalyticsEnabled = () => false;

export function trackEvent(_options?: TrackEventOptions): void {
  // No-op: No external telemetry pings
}
