import type { QuotationStatus } from "@/app/data/salesQuotations";

export function StatusBadge({ status }: { status: QuotationStatus }) {
  const isSent = status === "Sent";
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isSent
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-zinc-500/15 text-zinc-400"
      }`}
    >
      {status}
    </span>
  );
}
