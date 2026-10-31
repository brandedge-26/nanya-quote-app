"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";

export function SplashIntro({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        aria-hidden={introDone}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
          introDone ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative h-32 w-32 animate-logo-pop sm:h-40 sm:w-40">
          <Image
            src="/logo.png"
            alt="NANYA CNC"
            fill
            sizes="160px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
