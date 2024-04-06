import React from "react";
import { Button } from "./ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function SignOut() {
  const logOut = async () => {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut;
    redirect("/auth-server-action");
  };
  return (
    <form>
      <Button>Sign Out</Button>
    </form>
  );
}

export default SignOut;
