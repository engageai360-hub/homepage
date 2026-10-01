type EventName =
  | "page_view"
  | "cta_click"
  | "sample_video_play"
  | "category_sample_play"
  | "faq_open"
  | "section_view";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (import.meta.env.DEV) console.debug("[track]", event, params);
}
