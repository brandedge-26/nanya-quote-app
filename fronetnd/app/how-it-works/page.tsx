import Link from "next/link";
import { tradeTerms } from "@/app/data/terms";

const STEPS = [
  {
    number: "01",
    title: "Find your machine",
    text: "Explore seven CNC machining centers. Compare travel, table load, dimensions, and complete specifications.",
    icon: "M9 3a6 6 0 1 0 3.6 10.8l4.1 4.1a1 1 0 0 0 1.4-1.4l-4.1-4.1A6 6 0 0 0 9 3Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  },
  {
    number: "02",
    title: "Configure your capabilities",
    text: "Select the accessories your application needs. Pricing updates instantly for the chosen model.",
    icon: "M4 6h7m4 0h2M4 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm0 7h9m4 0h2m-9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM4 20h5m4 0h8m-8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z",
  },
  {
    number: "03",
    title: "Make it personal",
    text: "Add your name, email, company and project requirements to personalize the quotation.",
    icon: "M10 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 8a6 6 0 1 1 12 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z",
  },
  {
    number: "04",
    title: "Take the next step",
    text: "Review and download your quotation PDF, including technical specifications and the standard accessories package.",
    icon: "M10 2a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V2.75A.75.75 0 0 1 10 2ZM4 13a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 14.5 18h-9A2.25 2.25 0 0 1 3.25 15.75v-2A.75.75 0 0 1 4 13Z",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <div className="sticky top-0 z-20 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="flex w-full items-center gap-3 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-lg font-extrabold tracking-tight"
          >
            <span className="text-foreground">NANYA</span>
            <span className="text-primary">CNC</span>
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 px-5 py-8 sm:py-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            How It Works
          </span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            From possibility to production.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Four simple steps between you and your personalized quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-5 select-none text-8xl font-extrabold leading-none text-white/[0.04]"
              >
                {step.number}
              </span>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d={step.icon} />
                </svg>
              </div>

              <div className="relative flex items-center gap-2">
                <span className="text-xs font-bold text-primary">
                  {step.number}
                </span>
                <h2 className="text-lg font-bold text-foreground">
                  {step.title}
                </h2>
              </div>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-bold text-foreground">
            Need the commercial details?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review the quotation terms for delivery, warranty, payment
            schedule and FOB pricing.
          </p>
          <ol className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
            {tradeTerms.map((term, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">{i + 1}.</span>
                <span>{term}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500 sm:w-fit"
        >
          Start Your Quotation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
