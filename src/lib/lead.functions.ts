import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  full_name: z.string().min(1).max(200),
  work_email: z.string().email().max(255),
  phone: z.string().min(5).max(40),
  company: z.string().min(1).max(200),
  company_size: z.string().min(1).max(50),
  training_topic: z.string().min(1).max(100),
  lead_quality: z.enum(["qualified", "standard"]),
  gclid: z.string().max(500).optional(),
  utm_source: z.string().max(500).optional(),
  utm_medium: z.string().max(500).optional(),
  utm_campaign: z.string().max(500).optional(),
  utm_term: z.string().max(500).optional(),
  topic: z.string().max(100).optional(),
  page_url: z.string().max(2000),
  submitted_at: z.string().max(50),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    const url = process.env["ZOHO_WEBHOOK_URL"];
    if (!url) {
      console.error("ZOHO_WEBHOOK_URL is not set");
      return { ok: false as const, error: "not_configured" };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error("Zoho webhook failed", res.status);
        return { ok: false as const, error: "webhook_failed" };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("Zoho webhook error", e);
      return { ok: false as const, error: "network" };
    }
  });
