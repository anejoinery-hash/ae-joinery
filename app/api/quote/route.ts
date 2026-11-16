import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lead submissions must never be served from a cache.
export const dynamic = "force-dynamic";

const NOTIFY_TO = "anejoinery@gmail.com";

// Resend's shared sender works without a verified domain, but only to the
// account's own address — which is where leads go. Once aejoinery.com.au is
// verified in Resend, set LEAD_EMAIL_FROM to e.g.
// "A&E Joinery <quotes@aejoinery.com.au>" and no code change is needed.
const NOTIFY_FROM =
  process.env.LEAD_EMAIL_FROM || "A&E Joinery Website <onboarding@resend.dev>";

type Lead = {
  name: string | null;
  phone: string | null;
  email: string | null;
  suburb: string | null;
  service: string | null;
  message: string | null;
};

/** Trim a form field to a string, or null if it's empty/not a string. */
function field(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Save the lead to Supabase. Never throws — the caller decides what a failure
 * means, because an emailed lead is still a delivered lead.
 */
async function saveLead(lead: Lead): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { ok: false, reason: "Supabase environment variables are not set" };
  }

  try {
    const supabase = createClient(url, key, {
      // No session to persist in a stateless route handler.
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      return {
        ok: false,
        reason: `${error.code || "error"}: ${error.message}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Email the lead. This is the delivery path that matters: the inbox is checked,
 * the database is not, and a database outage must not cost a lead.
 */
async function emailLead(lead: Lead): Promise<{ ok: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "RESEND_API_KEY is not set" };

  const subject = lead.suburb
    ? `New quote request — ${lead.name}, ${lead.suburb}`
    : `New quote request — ${lead.name}`;

  const text = [
    `Phone: ${lead.phone}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email || "—"}`,
    `Suburb: ${lead.suburb || "—"}`,
    `What they need: ${lead.service || "—"}`,
    "",
    "About the space:",
    lead.message || "—",
    "",
    "— Sent by the A&E Joinery website quote form.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject,
        text,
        // Replying in the inbox goes straight back to the customer.
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, reason: `HTTP ${res.status} ${detail.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read that submission. Please try again." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    name: field(body.name),
    phone: field(body.phone),
    email: field(body.email),
    suburb: field(body.suburb),
    service: field(body.service),
    message: field(body.message),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json(
      { error: "Please enter your name and phone number." },
      { status: 400 }
    );
  }

  // Both paths are attempted every time, independently. The database is the
  // archive; the email is the notification. Either one delivering means the
  // enquiry reached the business, so one being down must not fail the other.
  const [saved, emailed] = await Promise.all([saveLead(lead), emailLead(lead)]);

  if (!saved.ok) console.error("[quote] Not saved:", saved.reason);
  if (!emailed.ok) console.error("[quote] Not emailed:", emailed.reason);

  if (!saved.ok && !emailed.ok) {
    // Nothing got through — log the lead so it is still recoverable here.
    console.error("[quote] Lead not delivered by any route:", JSON.stringify(lead));
    return NextResponse.json(
      { error: "We couldn't send your request." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
