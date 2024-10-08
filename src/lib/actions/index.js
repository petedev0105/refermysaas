"use client";

import { createBrowserClient } from "@supabase/ssr";

export default function Page() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return supabase.auth.getSession();
}
