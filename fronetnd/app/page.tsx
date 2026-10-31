import Image from "next/image";
import Link from "next/link";
import { SplashIntro } from "@/app/components/SplashIntro";

export default function Home() {
  return (
    <SplashIntro>
      <main className="flex flex-1 flex-col items-center justify-center bg-background px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32">
            <Image
              src="/logo.png"
              alt="NANYA CNC"
              fill
              sizes="128px"
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
            Get Your <span className="text-primary">Quote</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Select your machine and accessories, and get your quotation in
            seconds.
          </p>

          <Link
            href="/quote"
            className="mt-4 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500"
          >
            Start Quotation
          </Link>
        </div>
      </main>
    </SplashIntro>
  );
}
