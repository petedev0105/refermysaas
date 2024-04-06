"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import StoreComponent from "@/components/StoreComponent";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/utils/SupabaseProvider";
import Settings from "@/components/Settings";
import readUserSession from "@/lib/actions";
import DashboardComponent from "@/components/DashboardComponent";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  async function checkUser() {
    const { data } = await readUserSession();
    if (data.session) {
      console.log(data);
      console.log(data.session.user);
      setUser(data.session.user);
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (user)
    return (
      <div className="bg-stone-50">
        <DashboardComponent user={user} />
      </div>
    );
}

export default Dashboard;
