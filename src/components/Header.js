"use client";
import React from "react";
import { useSupabase } from "@/utils/SupabaseProvider";
import Link from "next/link";
import { Button } from "./ui/button";
import OAuthform from "./OAuthform";

function Header() {
  return (
    <div className="lg:px-0 px-5 max-w-6xl mx-auto py-7 flex items-center justify-between">
      <div className="">
        <Link href="/"><span className="font-semibold text-xl cursor-pointer">ReferMySaaS</span></Link>
        
      </div>
      <div>
        {/* <OAuthform /> */}
        <div className="flex items-center space-x-5 flex justify-center">
          <Link href="https://tally.so/r/npLgoE" target="_blank">
            <button className="px-5 py-3 bg-black text-white rounded-full hover:opacity-85">
              Submit Product +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
