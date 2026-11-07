import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// A small self-check for the quote form, so a broken form can be diagnosed by
// opening /api/quote/health in a browser instead of digging through logs.
// It reports only whether things are configured — never any key or URL value.
export const dynamic = "force-dynamic";

const NETWORK_FAILURE = /fetch failed|ENOTFOUND|ECONNREFUSED|getaddrinfo|ETIMEDOUT/i;

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
        fix:
          "In Vercel: Settings > Environment Variables. Add the missing " +
          "variable(s) from .env.local.example with the values from your " +
          "Supabase project (Settings > API), then redeploy.",
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
      leadsTableReachable: true,
      note: "The quote form can reach the leads table.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        problem: "supabase_unreachable",
        message: err instanceof Error ? err.message : String(err),
        fix:
          "Check that NEXT_PUBLIC_SUPABASE_URL points at your Supabase " +
          "project and that the project isn't paused.",
      },
      { status: 503 }
    );
  }
}
