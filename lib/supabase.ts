import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side / browser client — safe to use in client components.
// Reads/writes are governed by Row Level Security policies (see supabase/schema.sql).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
