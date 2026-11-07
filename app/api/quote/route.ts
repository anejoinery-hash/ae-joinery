import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lead submissions must never be served from a cache.
export const dynamic = "force-dynamic";

const REQUIRED_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

/** Names of the environment variables that aren't set on this deployment. */
function missingEnv(): string[] {
  return REQUIRED_ENV.filter((name) => !process.env[name]);
}

/** Trim a form field to a string, or null if it's empty/not a string. */
function field(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
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

  const lead = {
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

  // Without these, createClient() throws and the visitor just sees a generic
  // failure — so check first and say exactly what's missing in the logs.
  const missing = missingEnv();
  if (missing.length > 0) {
    console.error(
      `[quote] Not saved — missing environment variable(s): ${missing.join(", ")}. ` +
        `Add them in Vercel under Settings > Environment Variables, then redeploy.`
    );
    console.error("[quote] Unsaved lead:", JSON.stringify(lead));
    return NextResponse.json(
      {
        error:
          "Our quote form isn't accepting submissions right now. " +
          "Please call 0414 711 741 or email anejoinery@gmail.com.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      // No session to persist in a stateless route handler.
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      // Log the lead alongside the failure so it's still recoverable from the
      // Vercel logs even though the insert didn't land.
      console.error("[quote] Supabase insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      console.error("[quote] Unsaved lead:", JSON.stringify(lead));

      return NextResponse.json(
        {
          error:
            "We couldn't save your request. " +
            "Please call 0414 711 741 or email anejoinery@gmail.com.",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[quote] Unexpected error saving lead:", err);
    console.error("[quote] Unsaved lead:", JSON.stringify(lead));
    return NextResponse.json(
      {
        error:
          "Something went wrong on our end. " +
          "Please call 0414 711 741 or email anejoinery@gmail.com.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
