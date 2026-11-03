import { salesCustomers } from "@/app/data/salesCustomers";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Customers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone you&apos;ve created a quotation for.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950">
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Quotations</th>
                <th className="px-5 py-3 font-semibold">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {salesCustomers.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-5 py-3.5 font-medium text-foreground">{c.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.company}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3.5 text-foreground">{c.quotationsCount}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {formatDate(c.lastActivity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col divide-y divide-white/5 sm:hidden">
          {salesCustomers.map((c) => (
            <div key={c.id} className="flex flex-col gap-1.5 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.company}</div>
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {c.quotationsCount} quote{c.quotationsCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{c.email}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.phone}</span>
                <span>{formatDate(c.lastActivity)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
