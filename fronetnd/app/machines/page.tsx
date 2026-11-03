import Image from "next/image";
import Link from "next/link";
import { machines } from "@/app/data/machines";
import { machineSpecs } from "@/app/data/machineSpecs";
import { formatUSD } from "@/app/lib/format";

const COMPARE_ROWS: {
  label: string;
  value: (m: (typeof machines)[number]) => string;
}[] = [
  { label: "Base price", value: (m) => formatUSD(m.price) },
  { label: "Series", value: (m) => m.series },
  {
    label: "X / Y / Z travel",
    value: (m) => {
      const s = machineSpecs[m.id];
      return `${s.travel.x} / ${s.travel.y} / ${s.travel.z}`;
    },
  },
  { label: "Table size", value: (m) => machineSpecs[m.id].table.size },
  { label: "Table load", value: (m) => machineSpecs[m.id].table.maxLoad },
  { label: "Spindle speed", value: (m) => machineSpecs[m.id].spindle.speed },
  { label: "Control", value: (m) => machineSpecs[m.id].cncSystem },
  {
    label: "Tool magazine",
    value: (m) => machineSpecs[m.id].toolChanger.magazine,
  },
  {
    label: "Machine weight",
    value: (m) => machineSpecs[m.id].utilities.machineWeight,
  },
];

export default function MachineLineupPage() {
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
            The Lineup
          </span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Seven machines. Your perfect fit.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Compare the original machine specifications, then select the
            right fit for your work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {machines.map((machine) => (
            <div
              key={machine.id}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 transition-colors hover:border-white/20"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(145deg,#1a1a1a,#050505)]">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 45vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {machine.series}
                </span>
                <h2 className="text-base font-bold text-foreground">
                  {machine.name}
                </h2>
              </div>
              <Link
                href={`/machines/${machine.id}`}
                className="w-full rounded-full border border-white/15 px-4 py-2 text-center text-xs font-semibold text-foreground transition-colors hover:bg-white/5"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Compare Specifications
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 z-10 bg-zinc-950 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    The Lineup
                  </th>
                  {machines.map((m) => (
                    <th key={m.id} className="px-4 py-3 text-center">
                      <div className="relative mx-auto mb-1 h-12 w-16">
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {m.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-white/5 last:border-b-0">
                    <th className="sticky left-0 z-10 bg-zinc-950 px-4 py-3 text-xs font-semibold text-muted-foreground">
                      {row.label}
                    </th>
                    {machines.map((m) => (
                      <td
                        key={m.id}
                        className="px-4 py-3 text-center text-foreground"
                      >
                        {row.value(m)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="sticky left-0 z-10 bg-zinc-950 px-4 py-3 text-xs font-semibold text-muted-foreground">
                    Your next move
                  </th>
                  {machines.map((m) => (
                    <td key={m.id} className="px-4 py-3 text-center">
                      <Link
                        href={`/?machine=${m.id}`}
                        className="inline-block rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-orange-400"
                      >
                        Select
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
