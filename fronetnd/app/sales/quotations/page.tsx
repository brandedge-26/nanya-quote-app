import { salesQuotations } from "@/app/data/salesQuotations";
import { QuotationsTable } from "../components/QuotationsTable";

export default function MyQuotationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          My Quotations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All quotations you have created.
        </p>
      </div>

      <QuotationsTable quotations={salesQuotations} />
    </div>
  );
}
