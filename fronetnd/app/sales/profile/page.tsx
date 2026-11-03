import { currentSalesUser } from "@/app/data/salesUser";
import { salesQuotations } from "@/app/data/salesQuotations";
import { salesCustomers } from "@/app/data/salesCustomers";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account details.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/15 text-2xl font-bold text-primary">
          {currentSalesUser.initials}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold text-foreground">
            {currentSalesUser.name}
          </div>
          <div className="text-sm text-primary">{currentSalesUser.role}</div>
          <div className="text-sm text-muted-foreground">
            {currentSalesUser.email}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
          <div className="text-lg font-bold text-foreground">
            {salesQuotations.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Quotations</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
          <div className="text-lg font-bold text-foreground">
            {salesCustomers.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Customers</div>
        </div>
      </div>
    </div>
  );
}
