import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function createAnonClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase ortam değişkenleri tanımlı değil.");
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
