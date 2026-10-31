import Image from "next/image";
import Link from "next/link";
import { machines } from "@/app/data/machines";

export function SelectMachineStep({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Select Your Machine Model
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the CNC machine that fits your requirement.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {machines.map((machine) => {
          const selected = machine.id === selectedId;
          return (
            <div
              key={machine.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(machine.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(machine.id);
                }
              }}
              aria-pressed={selected}
              className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200 active:scale-[0.98] sm:hover:-translate-y-0.5 ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-white/10 bg-zinc-950 hover:border-white/20"
              }`}
            >
              {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              <div className="relative h-20 w-full">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {machine.name}
              </span>
              <Link
                href={`/machines/${machine.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-primary underline-offset-2 hover:underline"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
