/**
 * Free-trial lead endpoint.
 *
 * Delivery (first one configured wins):
 *   1. TRIAL_WEBHOOK_URL                       - POSTs the lead as JSON (Zapier, Make, n8n, Google Sheets, Slack...)
 *   2. RESEND_API_KEY + TRIAL_TO_EMAIL         - emails the lead to you via Resend
 * If neither is set the endpoint answers { delivered: false } and the form
 * sends the visitor to WhatsApp instead, so no lead is ever silently lost.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort in-memory rate limit (per server instance).
const hits = new Map<string, { count: number; reset: number }>();
function isLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { email, device, consent, website, lang } = body;

  // Honeypot: real visitors never fill this hidden field.
  if (typeof website === "string" && website.trim() !== "") {
    return Response.json({ ok: true, delivered: true });
  }

  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  if (typeof device !== "string" || device.length === 0 || device.length > 80) {
    return Response.json({ error: "invalid_device" }, { status: 400 });
  }
  if (consent !== true) {
    return Response.json({ error: "consent_required" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const lead = {
    email: email.trim(),
    device,
    source: `${process.env.NEXT_PUBLIC_SITE_URL ?? "iptvpoland.example"} / free trial (${lang === "pl" ? "pl" : "en"})`,
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.TRIAL_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.TRIAL_TO_EMAIL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } else if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.TRIAL_FROM_EMAIL ?? "IPTV Poland <onboarding@resend.dev>",
          to: [to],
          reply_to: lead.email,
          subject: "New free trial request (IPTV Poland)",
          text: `E-mail: ${lead.email}\nDevice: ${lead.device}\nSource: ${lead.source}\nDate: ${lead.createdAt}`,
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
    } else {
      return Response.json({ ok: true, delivered: false });
    }
  } catch (err) {
    console.error("[trial] delivery failed:", err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
