import type { SalesQuotation } from "@/app/data/salesQuotations";
import { formatUSD } from "@/app/lib/format";
import { StatusBadge } from "./StatusBadge";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function QuotationsTable({
  quotations,
}: {
  quotations: SalesQuotation[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950">
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-semibold">#</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Machine</th>
              <th className="px-5 py-3 font-semibold">Total</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.id} className="border-b border-white/5 last:border-b-0">
                <td className="px-5 py-3.5 font-medium text-foreground">{q.id}</td>
                <td className="px-5 py-3.5">
                  <div className="font-medium text-foreground">{q.customerName}</div>
                  <div className="text-xs text-muted-foreground">{q.company}</div>
                </td>
                <td className="px-5 py-3.5 text-foreground">{q.machineModel}</td>
                <td className="px-5 py-3.5 font-semibold text-foreground">
                  {formatUSD(q.totalAmount)}
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {formatDate(q.date)}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-white/5"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col divide-y divide-white/5 sm:hidden">
        {quotations.map((q) => (
          <div key={q.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-foreground">{q.id}</div>
                <div className="text-sm text-foreground">{q.customerName}</div>
                <div className="text-xs text-muted-foreground">{q.company}</div>
              </div>
              <StatusBadge status={q.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{q.machineModel}</span>
              <span className="font-semibold text-foreground">
                {formatUSD(q.totalAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {formatDate(q.date)}
              </span>
              <button
                type="button"
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-white/5"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
