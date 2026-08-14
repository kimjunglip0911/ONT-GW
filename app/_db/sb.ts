import "server-only";
import { createClient } from "@supabase/supabase-js";

/** 서버 전용. secret 키로 RLS를 우회한다 */
export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SECRET_KEY ?? "";
  if (!url || !key) throw new Error("missing db env");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
