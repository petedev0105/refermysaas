"use client"
import React from "react";
import { useSupabase } from "@/utils/SupabaseProvider";
import Link from "next/link";
import { Button } from "./ui/button";
import OAuthform from "./OAuthform";

function Header() {
  return (
    <div className="max-w-6xl mx-auto py-5 flex items-center justify-between">
      <div className="">
        <span className="font-bold text-xl">saascribe</span>
      </div>
      <div>
        <OAuthform />
      </div>
    </div>
  );
}

export default Header;
