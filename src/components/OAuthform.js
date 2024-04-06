"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { createBrowserClient } from "@supabase/ssr";
import readUserSession from "@/lib/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OAuthform() {
  const { data } = readUserSession();
  const [user, setUser] = useState(null);

  async function updateUser() {
    const { data } = await readUserSession();
    if (data.session) {
      console.log(data);
      console.log(data.session.user);
      setUser(data.session.user);
    } else {
      //   router.push("/");
    }
  }

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  function loginWithGoogle() {
    const {data, error} =  supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth-server-action/callback`,
      },
    });

    if(!error) {
      console.log(data)
    }
  }

  useEffect(() => {
    updateUser();
  }, []);

  return user ? (
    <Link href="/dashboard">Dashboard</Link>
  ) : (
    <Button onClick={() => loginWithGoogle()}>Login With Google</Button>
  );
}

export default OAuthform;
