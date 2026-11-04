// Shared config and pure helpers for the Solomon People Solutions ads landing page.

export const GTM_ID = "GTM-XXXXXXX"; // PLACEHOLDER: replace with real GTM container ID
export const ZOHO_BOOKINGS_URL = "https://PLACEHOLDER-zoho-bookings-link"; // PLACEHOLDER
export const WHATSAPP_NUMBER = "971500000000"; // PLACEHOLDER: replace with SPS WhatsApp mobile
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = "+971 4 564 6002";
export const PHONE_TEL = "tel:+97145646002";
export const ADDRESS =
  "Office 5, 11th Floor, Crystal Tower, M Hotel Downtown by Millennium, Al Asayal Street, Dubai, UAE";

export const TOPICS = [
  "Leadership and Management",
  "Sales and Customer Service",
  "Communication and Soft Skills",
  "Train the Trainer and Training Needs Analysis",
] as const;
export const TOPIC_OPTIONS = [...TOPICS, "Not sure yet"];
export const COMPANY_SIZES = ["1 to 50", "51 to 200", "201 to 500", "501 to 1,000", "1,000+"];
export const PARTICIPANTS = ["1 to 5", "6 to 15", "16 to 30", "30+"];
export const START_TIMES = ["This month", "In 1 to 3 months", "Later this year", "Just exploring"];

export const HEADLINES: Record<string, string> = {
  leadership: "Leadership and management training for your team in Dubai",
  sales: "Sales and customer service training that lifts team performance",
  hr: "Train the trainer and training needs analysis for HR and L&D teams",
};
export const DEFAULT_HEADLINE = "Corporate training programmes for UAE companies";
export const URL_TOPIC_TO_FORM: Record<string, string> = {
  leadership: TOPICS[0],
  sales: TOPICS[1],
  hr: TOPICS[3],
};

export function headlineFor(topic: string | null | undefined) {
  return (topic && HEADLINES[topic.toLowerCase()]) || DEFAULT_HEADLINE;
}

const FREE_DOMAINS = ["gmail", "yahoo", "hotmail", "outlook", "icloud", "live"];
export function isFreeEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  const first = domain.split(".")[0];
  return FREE_DOMAINS.includes(first);
}

export function isValidUaePhone(phone: string) {
  const d = phone.replace(/[\s\-()]/g, "");
  return /^(\+971|00971|0)?(5\d{8}|[2-9]\d{7})$/.test(d);
}

export function leadQuality(size: string, participants: string, start: string): "qualified" | "standard" {
  const bigEnough = COMPANY_SIZES.indexOf(size) >= 1;
  const enoughPeople = PARTICIPANTS.indexOf(participants) >= 1;
  return bigEnough && enoughPeople && start !== "Just exploring" ? "qualified" : "standard";
}

// ---- Tracking (browser only) ----
export const TRACK_KEYS = ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "topic"] as const;
const COOKIE = "sps_attr";

export function readAttribution(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  try {
    return m ? JSON.parse(decodeURIComponent(m[1])) : {};
  } catch {
    return {};
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const current = readAttribution();
  let changed = false;
  for (const k of TRACK_KEYS) {
    const v = params.get(k);
    if (v) {
      current[k] = v;
      changed = true;
    }
  }
  if (changed) {
    document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(current))}; max-age=${60 * 60 * 24 * 90}; path=/; SameSite=Lax`;
  }
  return current;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
export function pushEvent(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

export const noindexMeta = [
  { name: "robots", content: "noindex, nofollow" },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary" },
];
