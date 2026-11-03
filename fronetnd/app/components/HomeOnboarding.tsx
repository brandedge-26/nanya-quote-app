"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

type Phase = "logo" | "onboarding" | "studio";

export function HomeOnboarding({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("logo");

  useEffect(() => {
    if (phase !== "logo") return;
    const timer = setTimeout(() => setPhase("onboarding"), 2500);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "studio") {
    return <>{children}</>;
  }

  const introDone = phase === "onboarding";

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

      <main
        className={`flex flex-1 flex-col items-center justify-center bg-background px-6 text-center transition-opacity duration-700 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32">
            <Image
              src="/logo.png"
              alt="NANYA CNC"
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
            Get Your <span className="text-primary">Quotation</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore all seven machines in 3D, configure your accessories, and
            download your personalized quotation.
          </p>

          <button
            type="button"
            onClick={() => setPhase("studio")}
            className="mt-4 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500"
          >
            Get Started
          </button>
        </div>
      </main>
    </>
  );
}
