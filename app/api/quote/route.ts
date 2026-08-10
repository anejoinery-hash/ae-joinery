import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, email, suburb, service, message } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  // Server-side client using the anon key is fine here — RLS only allows inserts.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    email: email || null,
    suburb: suburb || null,
    service: service || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optional: trigger an email notification here via Resend/SendGrid once
  // you've picked one and added its API key to the environment variables.

  return NextResponse.json({ success: true });
}
