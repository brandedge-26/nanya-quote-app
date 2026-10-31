import Image from "next/image";
import { accessories } from "@/app/data/accessories";
import { machines } from "@/app/data/machines";
import { tradeTerms } from "@/app/data/terms";
import { formatUSD } from "@/app/lib/format";
import { calculateQuoteTotals, getAccessoryPrice } from "@/app/lib/pricing";
import type { CustomerDetails } from "./types";

export function ReviewStep({
  machineId,
  selectedAccessoryIds,
  details,
}: {
  machineId: string;
  selectedAccessoryIds: string[];
  details: CustomerDetails;
}) {
  const machine = machines.find((m) => m.id === machineId);
  const selectedAccessories = accessories.filter((a) =>
    selectedAccessoryIds.includes(a.id),
  );
  const { total, hasOnRequestItem } = calculateQuoteTotals(
    machineId,
    selectedAccessoryIds,
  );

  const today = new Date();
  const quoteDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const quoteNo = `NY${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${(machine?.name ?? "").replace(/\s+/g, "")}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="no-print">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Review & Download
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm everything looks right before downloading your quotation.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-950 p-5 print:rounded-none print:border-zinc-300 print:bg-white sm:p-6">
        <div className="flex items-start gap-3 border-b border-white/10 pb-5 print:border-zinc-200">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/logo.png"
              alt="NANYA CNC"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="text-base font-extrabold tracking-tight text-foreground print:text-zinc-900">
              NANYA CNC
            </div>
            <div className="text-xs text-muted-foreground print:text-zinc-500">
              CNC Machine Quotation
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="text-muted-foreground print:text-zinc-500">
              {quoteNo}
            </div>
            <div className="font-semibold text-foreground print:text-zinc-900">
              {quoteDate}
            </div>
          </div>
        </div>

        {machine && (
          <div className="flex items-center gap-4 border-b border-white/10 pb-5 print:border-zinc-200">
            <div className="relative h-24 w-24 shrink-0">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-primary print:text-orange-700">
                {machine.series}
              </div>
              <div className="text-lg font-bold text-foreground print:text-zinc-900">
                {machine.name}
              </div>
              <div className="text-sm text-muted-foreground print:text-zinc-500">
                {formatUSD(machine.price)}
              </div>
            </div>
          </div>
        )}

        <div className="border-b border-white/10 pb-5 print:border-zinc-200">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground print:text-zinc-500">
            Accessories
          </h3>
          {selectedAccessories.length === 0 ? (
            <p className="text-sm text-muted-foreground print:text-zinc-500">
              None selected
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {selectedAccessories.map((a) => {
                const price = getAccessoryPrice(machineId, a.id);
                return (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground print:text-zinc-500">{a.name}</span>
                    <span className="text-foreground print:text-zinc-900">
                      {price === null ? "On Request" : formatUSD(price)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-b border-white/10 pb-5 print:border-zinc-200">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground print:text-zinc-500">
            Customer Details
          </h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            <div>
              <span className="text-muted-foreground print:text-zinc-500">Name: </span>
              <span className="text-foreground print:text-zinc-900">{details.name || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground print:text-zinc-500">Email: </span>
              <span className="text-foreground print:text-zinc-900">{details.email || "—"}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-muted-foreground print:text-zinc-500">Company: </span>
              <span className="text-foreground print:text-zinc-900">{details.company || "—"}</span>
            </div>
            {details.notes && (
              <div className="sm:col-span-2">
                <span className="text-muted-foreground print:text-zinc-500">Notes: </span>
                <span className="text-foreground print:text-zinc-900">{details.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-b border-white/10 pb-5 text-sm print:border-zinc-200">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-foreground print:text-zinc-900">Total (FOB Shanghai)</span>
            <span className="text-primary print:text-orange-700">{formatUSD(total)}</span>
          </div>
          {hasOnRequestItem && (
            <p className="text-xs text-muted-foreground print:text-zinc-500">
              * One or more selected accessories are priced on request — our
              team will follow up with final pricing.
            </p>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground print:text-zinc-500">
            Terms & Conditions
          </h3>
          <ol className="flex flex-col gap-1 text-xs text-muted-foreground print:text-zinc-500">
            {tradeTerms.map((term, i) => (
              <li key={i}>
                {i + 1}. {term}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-muted-foreground print:text-zinc-500">
            This quotation is valid for 30 days from the issue date above.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="no-print flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500 sm:w-auto sm:self-end"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 2a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V2.75A.75.75 0 0 1 10 2ZM4 13a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 14.5 18h-9A2.25 2.25 0 0 1 3.25 15.75v-2A.75.75 0 0 1 4 13Z" />
        </svg>
        Download Quotation
      </button>
    </div>
  );
}
