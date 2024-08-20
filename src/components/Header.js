"use client";
import React from "react";
import { useSupabase } from "@/utils/SupabaseProvider";
import Link from "next/link";
import { Button } from "./ui/button";
import OAuthform from "./OAuthform";

function Header() {
  return (
    <div className="lg:space-y-0 space-y-3 lg:px-0 px-5 max-w-6xl mx-auto py-7 lg:flex items-center justify-between">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <Link href="/">
            <span className="font-semibold text-xl cursor-pointer">
              ReferMySaaS
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-green-400 h-2 w-2"></div>
          <div>
            <span className="text-sm text-stone-500">98 free spots left - then $3/month</span>
          </div>
        </div>
      </div>
      <div>
        {/* <OAuthform /> */}
        <div className="flex items-center space-x-5 flex lg:justify-center lg:block hidden">
          <Link href="/submit" target="_blank">
            <button className="px-5 py-2 bg-black text-white rounded-full hover:opacity-85 flex items-center space-x-2">
            <div className="rounded-full bg-green-400 h-2 w-2"></div>
              <span>Submit Product +</span>
              
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
