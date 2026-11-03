import Link from "next/link";
import { salesQuotations } from "@/app/data/salesQuotations";
import { salesCustomers } from "@/app/data/salesCustomers";
import { formatUSD } from "@/app/lib/format";
import { StatTile } from "./components/StatTile";
import { QuotationsTable } from "./components/QuotationsTable";

const ICONS = {
  quotations: "M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v3h3M7 10h6M7 13h6",
  customers: "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 16c0-2.2 2.2-4 5-4s5 1.8 5 4v1H2v-1Zm10.5-3c1.9.3 3.5 1.6 3.5 3v1h-3",
  pending: "M10 5.5V10l3 2M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  value: "M10 2.5v15M6 5.5h5.5a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5h6",
};

export default function SalesDashboardPage() {
  const totalQuotedValue = salesQuotations.reduce(
    (sum, q) => sum + q.totalAmount,
    0,
  );
  const draftCount = salesQuotations.filter((q) => q.status === "Draft").length;
  const recentQuotations = salesQuotations.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your quotations and customers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatTile
          label="Quotations (This Month)"
          value={String(salesQuotations.length)}
          icon={ICONS.quotations}
        />
        <StatTile
          label="Customers"
          value={String(salesCustomers.length)}
          icon={ICONS.customers}
        />
        <StatTile
          label="Pending Follow-ups"
          value={String(draftCount)}
          icon={ICONS.pending}
        />
        <StatTile
          label="Total Quoted Value"
          value={formatUSD(totalQuotedValue)}
          icon={ICONS.value}
        />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">
            Recent Quotations
          </h2>
          <Link
            href="/sales/quotations"
            className="text-xs font-semibold text-primary hover:underline"
          >
            View All →
          </Link>
        </div>
        <QuotationsTable quotations={recentQuotations} />
      </div>
    </div>
  );
}
