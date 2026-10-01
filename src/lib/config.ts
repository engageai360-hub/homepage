// Single destination for every "Make Your First Video" button.
export const LANDING_PAGE_URL = "https://www.reelbrand.ai";

// Flip to true once the proof claims in content/home.ts are verified and cleared for publishing.
export const SHOW_PROOF = false;

// Leave empty to hide the matching footer link.
export const CONTACT_EMAIL = "";
export const PRIVACY_URL = "";
export const TERMS_URL = "";
export const SOCIAL = {
  LinkedIn: "",
  Instagram: "",
  Facebook: "",
};

/** Landing page URL with the visitor's UTM and click-ID parameters carried through. */
export function ctaHref(): string {
  try {
    const url = new URL(LANDING_PAGE_URL);
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return LANDING_PAGE_URL;
  }
}
