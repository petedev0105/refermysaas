"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="pb-10 bg-image h-screen lg:px-0 px-5">
      <Header />
      <div className="lg:pt-48 pt-24 space-y-5">
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          <span className="lg:text-6xl text-3xl font-semibold max-w-3xl text-center">
            Easy no-code pricing tables for Lemon Squeezy
          </span>
        </div>
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          <span className="max-w-3xl text-center text-xl">
            Showcase your Lemon Squeezy pricing table on your own website in
            seconds, not hours.
          </span>
        </div>
        <div className="flex items-center justify-center max-w-3xl mx-auto pt-5 ">
          <div className="">
            <iframe
              title="Tally.so Form"
              src="https://tally.so/embed/wLbMYJ?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="200px" // You can adjust the height as needed
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
