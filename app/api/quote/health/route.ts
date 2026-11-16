import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// A small self-check for the quote form, so a broken form can be diagnosed by
// opening /api/quote/health in a browser instead of digging through logs.
// It never reports a key. It does report the Supabase hostname, which is a
// NEXT_PUBLIC_ value shipped to browsers by design, so that a wrong URL can be
// told apart from a paused project.
export const dynamic = "force-dynamic";

const NETWORK_FAILURE = /fetch failed|ENOTFOUND|ECONNREFUSED|getaddrinfo|ETIMEDOUT/i;

/**
 * Names of the Supabase-related environment variables this deployment has.
 * Names only — never values — so it is safe to read in a browser. Useful when
 * an integration sets variables under names the code doesn't read.
 */
function supabaseEnvNames(): string[] {
  return Object.keys(process.env)
    .filter((name) => /SUPABASE|POSTGRES|RESEND/i.test(name))
    .sort();
}

/**
 * Describes the SHAPE of the configured URL without ever echoing it.
 *
 * The value is a NEXT_PUBLIC_ one, but a mistyped entry could be a Postgres
 * connection string, which carries a password — so report only characteristics
 * that identify the mistake, never the text itself.
 */
function urlShape(raw: string | undefined) {
  if (!raw) return null;
  const trimmed = raw.trim();
  return {
    length: raw.length,
    startsWithHttps: trimmed.startsWith("https://"),
    endsWithSupabaseCo: /\.supabase\.co\/?$/.test(trimmed),
    hasSurroundingWhitespace: raw !== trimmed,
    hasQuoteCharacters: /["']/.test(raw),
    hasTrailingSlash: trimmed.endsWith("/"),
    looksLikePostgresConnectionString: /^postgres/i.test(trimmed),
  };
}

/** Hostname of the configured Supabase URL, or null if it isn't a valid URL. */
function supabaseHost(): string | null {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "").hostname;
  } catch {
    return null;
  }
}

export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!hasUrl || !hasAnonKey) {
    const missing = [
      !hasUrl && "NEXT_PUBLIC_SUPABASE_URL",
      !hasAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ].filter(Boolean);

    return NextResponse.json(
      {
        ok: false,
        problem: "missing_environment_variables",
        missing,
        supabaseEnvVarsPresent: supabaseEnvNames(),
        fix:
          "In Vercel: Settings > Environment Variables. Add the missing " +
          "variable(s) from .env.local.example with the values from your " +
          "Supabase project (Settings > API), then redeploy.",
      },
      { status: 503 }
    );
  }

  const host = supabaseHost();
  if (!host) {
    return NextResponse.json(
      {
        ok: false,
        problem: "malformed_supabase_url",
        urlShape: urlShape(process.env.NEXT_PUBLIC_SUPABASE_URL),
        fix:
          "NEXT_PUBLIC_SUPABASE_URL is not a valid URL. It should look like " +
          "https://<project-ref>.supabase.co — copy it from Supabase under " +
          "Settings > API, then redeploy.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Row Level Security hides every row from the public key, so this returns
    // an empty list when all is well. What matters is which error comes back.
    const { error } = await supabase.from("leads").select("id").limit(1);

    // 42P01 = relation does not exist, i.e. supabase/schema.sql was never run.
    if (error?.code === "42P01") {
      return NextResponse.json(
        {
          ok: false,
          problem: "leads_table_missing",
          fix:
            "In Supabase: SQL Editor > New query, paste the contents of " +
            "supabase/schema.sql from this repo, and run it.",
        },
        { status: 503 }
      );
    }

    // A network failure comes back as a returned error, not a throw, so it
    // has to be classified here rather than in the catch below.
    if (error && (!error.code || NETWORK_FAILURE.test(error.message))) {
      return NextResponse.json(
        {
          ok: false,
          problem: "supabase_unreachable",
          supabaseHost: host,
          supabaseEnvVarsPresent: supabaseEnvNames(),
          message: error.message,
          fix:
            "Check that NEXT_PUBLIC_SUPABASE_URL points at your Supabase " +
            "project and that the project isn't paused.",
        },
        { status: 503 }
      );
    }

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          problem: "supabase_error",
          supabaseHost: host,
          code: error.code ?? null,
          message: error.message,
          fix:
            "Check that supabase/schema.sql has been run and that the " +
            "\"Public can insert leads\" policy is present on the leads table.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      supabaseConfigured: true,
      supabaseHost: host,
      // The email notification is the path that actually reaches a person.
      emailConfigured: Boolean(process.env.RESEND_API_KEY),
      leadsTableReachable: true,
      note: "The quote form can reach the leads table.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        problem: "supabase_unreachable",
        supabaseHost: host,
        supabaseEnvVarsPresent: supabaseEnvNames(),
        message: err instanceof Error ? err.message : String(err),
        fix:
          "Check that NEXT_PUBLIC_SUPABASE_URL points at your Supabase " +
          "project and that the project isn't paused.",
      },
      { status: 503 }
    );
  }
}
