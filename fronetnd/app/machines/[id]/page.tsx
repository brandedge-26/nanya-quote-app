import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { machines } from "@/app/data/machines";
import { machineSpecs } from "@/app/data/machineSpecs";
import { standardAccessories } from "@/app/data/standardAccessories";
import { accessories } from "@/app/data/accessories";
import { tradeTerms } from "@/app/data/terms";

export function generateStaticParams() {
  return machines.map((m) => ({ id: m.id }));
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-2.5 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function SpecGroup({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
      <div className="mb-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary"
        >
          <path d={icon} />
        </svg>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">
          {title}
        </h3>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

const ICONS = {
  control: "M10 3v2m0 10v2m7-7h-2M5 10H3m11.5-5.5-1.4 1.4m-9.2 9.2-1.4 1.4m12 0-1.4-1.4m-9.2-9.2L5.9 4.5M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  travel: "M4 10h12m0 0-4-4m4 4-4 4M4 4v12",
  table: "M3 4h14v12H3zM3 9h14M8 4v12",
  spindle: "M10 2v2m0 12v2m8-8h-2M4 10H2m12.3-6.3L13 5m-6 10 1.3-1.3M14.3 14.3 13 13M7 7 5.7 5.7M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  feed: "M3 12.5a7 7 0 1 1 14 0M10 12l3-3M3 16.5h14",
  tool: "M14.7 3.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4l-1 1 2.6 2.6a2 2 0 0 1 0 2.8l-5.6 5.6a2 2 0 0 1-2.8 0l-2.6-2.6-1 1a1 1 0 0 1-1.4 0l-1.6-1.6a1 1 0 0 1 0-1.4l1-1-1.5-1.5a1 1 0 0 1 0-1.4l5.3-5.3a1 1 0 0 1 1.4 0L10.6 6l1-1-1-1a1 1 0 0 1 0-1.4Z",
  motor: "M11 2 3 11h6l-1 7 8-9h-6l1-7Z",
  accuracy: "M10 2v3m0 10v3M2 10h3m10 0h3m-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  utilities: "M10 2.5a1.5 1.5 0 0 1 1.5 1.5v.59c.74.1 1.44.32 2.08.63l.42-.42a1.5 1.5 0 1 1 1.06 1.06l-.42.42c.31.64.53 1.34.63 2.08h.59a1.5 1.5 0 1 1 0 1.5h-.59a7 7 0 0 1-.63 2.08l.42.42a1.5 1.5 0 1 1-1.06 1.06l-.42-.42a7 7 0 0 1-2.08.63v.59a1.5 1.5 0 1 1-1.5 0v-.59a7 7 0 0 1-2.08-.63l-.42.42a1.5 1.5 0 1 1-1.06-1.06l.42-.42a7 7 0 0 1-.63-2.08h-.59a1.5 1.5 0 1 1 0-1.5h.59c.1-.74.32-1.44.63-2.08l-.42-.42a1.5 1.5 0 1 1 1.06-1.06l.42.42a7 7 0 0 1 2.08-.63v-.59A1.5 1.5 0 0 1 10 2.5Zm0 4.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
};

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const machine = machines.find((m) => m.id === id);
  const specs = machineSpecs[id];

  if (!machine || !specs) {
    notFound();
  }

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

      <div className="flex w-full flex-col gap-10 px-5 py-6 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(145deg,#1a1a1a,#050505)] sm:h-64 sm:w-72">
            <Image
              src={machine.image}
              alt={machine.name}
              fill
              sizes="(min-width: 640px) 288px, 100vw"
              className="object-contain p-6 drop-shadow-[0_16px_24px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {machine.series}
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {machine.name}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {machine.description}
            </p>

            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <QuickStat label="X Travel" value={specs.travel.x} />
              <QuickStat label="Spindle Speed" value={specs.spindle.speed} />
              <QuickStat label="Table Load" value={specs.table.maxLoad} />
              <QuickStat label="Tools" value={specs.toolChanger.magazine.split(",")[1]?.trim() ?? specs.toolChanger.magazine} />
            </div>

            <Link
              href={`/?machine=${machine.id}`}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500 sm:w-fit"
            >
              Get Quotation for this Machine
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Standard Features
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SpecGroup title="Control & Drive" icon={ICONS.control}>
              <SpecRow label="CNC System" value={specs.cncSystem} />
              <SpecRow label="Spindle Drive" value={specs.spindleDrive} />
              <SpecRow label="Motor Capacity" value={specs.motorCapacity} />
              <SpecRow label="Guide Way" value={specs.guideWay} />
            </SpecGroup>

            <SpecGroup title="Travel" icon={ICONS.travel}>
              <SpecRow label="X-Axis" value={specs.travel.x} />
              <SpecRow label="Y-Axis" value={specs.travel.y} />
              <SpecRow label="Z-Axis" value={specs.travel.z} />
              <SpecRow label="Spindle Center to Z Rail" value={specs.spindleCenterToZRail} />
              <SpecRow label="Spindle Nose to Table" value={specs.spindleNoseToTable} />
            </SpecGroup>

            <SpecGroup title="Table" icon={ICONS.table}>
              <SpecRow label="Table Size" value={specs.table.size} />
              <SpecRow label="T-Slot" value={specs.table.tSlot} />
              <SpecRow label="Max. Table Load" value={specs.table.maxLoad} />
            </SpecGroup>

            <SpecGroup title="Spindle" icon={ICONS.spindle}>
              <SpecRow label="Taper / Diameter" value={specs.spindle.taper} />
              <SpecRow label="Drive Type" value={specs.spindle.driveType} />
              <SpecRow label="Spindle Speed" value={specs.spindle.speed} />
              <SpecRow label="Motor Power" value={specs.spindle.motorPower} />
            </SpecGroup>

            <SpecGroup title="Feed" icon={ICONS.feed}>
              <SpecRow label="Rapid Traverse (X/Y/Z)" value={specs.feed.rapidTraverse} />
              <SpecRow label="Cutting Feed Rate" value={specs.feed.cuttingFeedRate} />
            </SpecGroup>

            <SpecGroup title="Automatic Tool Changer" icon={ICONS.tool}>
              <SpecRow label="Tools Magazine" value={specs.toolChanger.magazine} />
              <SpecRow label="Tool-to-Tool Timing" value={specs.toolChanger.toolToToolTiming} />
              <SpecRow label="Max. Tool Dia. x Length" value={specs.toolChanger.maxToolDiaLength} />
              <SpecRow label="Max. Tool Weight" value={specs.toolChanger.maxToolWeight} />
              <SpecRow label="Max. Tool Dia. (Full)" value={specs.toolChanger.maxToolDiaFull} />
              <SpecRow label="Max. Tool Dia. (No Adjacent)" value={specs.toolChanger.maxToolDiaNoAdjacent} />
            </SpecGroup>

            <SpecGroup title="Motors Power Capacity" icon={ICONS.motor}>
              <SpecRow label="Spindle Motor" value={specs.motors.spindle} />
              <SpecRow label="X-Axis Servo Motor" value={specs.motors.xAxis} />
              <SpecRow label="Y-Axis Servo Motor" value={specs.motors.yAxis} />
              <SpecRow label="Z-Axis Servo Motor" value={specs.motors.zAxis} />
            </SpecGroup>

            <SpecGroup title="Machine Accuracy" icon={ICONS.accuracy}>
              <SpecRow label="Positioning Accuracy (JIS)" value={specs.accuracy.positioning} />
              <SpecRow label="Repeat Positioning Accuracy (JIS)" value={specs.accuracy.repeat} />
            </SpecGroup>

            <SpecGroup title="Utilities" icon={ICONS.utilities}>
              <SpecRow label="Coolant Tank Capacity" value={specs.utilities.coolantTank} />
              <SpecRow label="Electric Power" value={specs.utilities.electricPower} />
              <SpecRow label="Pneumatic Supply" value={specs.utilities.pneumaticSupply} />
              <SpecRow label="Ground Clearance (L x W x H)" value={specs.utilities.groundClearance} />
              <SpecRow label="Machine Weight" value={specs.utilities.machineWeight} />
            </SpecGroup>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Standard Accessories Package
          </h2>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {standardAccessories.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-primary">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Optional Accessories Available
          </h2>
          <div className="flex flex-wrap gap-2">
            {accessories.map((a) => (
              <span
                key={a.id}
                className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {a.name}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Pricing for optional accessories is calculated during the quotation flow.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Terms & Conditions
          </h2>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              {tradeTerms.map((term, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">{i + 1}.</span>
                  <span>{term}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 border-t border-white/10 pt-3 text-xs text-muted-foreground">
              Final pricing is confirmed in your quotation and is valid for 30 days from the issue date.
            </p>
          </div>
        </div>

        <Link
          href={`/?machine=${machine.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500 sm:w-fit"
        >
          Get Quotation for this Machine
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
