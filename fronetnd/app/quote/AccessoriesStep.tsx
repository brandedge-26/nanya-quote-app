import Image from "next/image";
import { accessories } from "@/app/data/accessories";
import { machines } from "@/app/data/machines";
import { formatUSD } from "@/app/lib/format";
import { calculateQuoteTotals, getAccessoryPrice } from "@/app/lib/pricing";

export function AccessoriesStep({
  machineId,
  selectedIds,
  onToggle,
}: {
  machineId: string;
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const machine = machines.find((m) => m.id === machineId);
  const selectedAccessories = accessories.filter((a) =>
    selectedIds.includes(a.id),
  );
  const { accessoriesTotal, total, hasOnRequestItem } = calculateQuoteTotals(
    machineId,
    selectedIds,
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Select Optional Accessories
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick the add-ons you need for this machine.
            </p>
          </div>
          {selectedAccessories.length > 0 && (
            <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {selectedAccessories.length} selected
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {accessories.map((accessory) => {
            const checked = selectedIds.includes(accessory.id);
            const price = getAccessoryPrice(machineId, accessory.id);
            return (
              <button
                key={accessory.id}
                type="button"
                onClick={() => onToggle(accessory.id)}
                aria-pressed={checked}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors active:scale-[0.99] ${
                  checked
                    ? "border-primary/40 bg-primary/5"
                    : "border-white/10 bg-zinc-950 hover:border-white/20"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/20"
                  }`}
                >
                  {checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {accessory.name}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {price === null ? "On Request" : formatUSD(price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-zinc-950 p-5 lg:sticky lg:top-24 lg:w-80">
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Price Summary
        </h3>

        {machine && (
          <div className="mt-4 flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="relative h-14 w-14 shrink-0 rounded-lg bg-zinc-900">
              <Image
                src={machine.image}
                alt={machine.name}
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">
                {machine.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatUSD(machine.price)}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 py-4 text-sm">
          {selectedAccessories.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No accessories selected yet.
            </p>
          ) : (
            selectedAccessories.map((a) => {
              const price = getAccessoryPrice(machineId, a.id);
              return (
                <div key={a.id} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{a.name}</span>
                  <span className="text-foreground">
                    {price === null ? "On Request" : formatUSD(price)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-white/10 pt-4 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Accessories</span>
            <span>{formatUSD(accessoriesTotal)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-2 text-base font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-primary">{formatUSD(total)}</span>
          </div>
          {hasOnRequestItem && (
            <p className="mt-1 text-xs text-muted-foreground">
              * One or more selected accessories are priced on request — our
              team will follow up.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
