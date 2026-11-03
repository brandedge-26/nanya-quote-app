"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentSalesUser } from "@/app/data/salesUser";

const ICONS = {
  dashboard: "M4 10 10 4l6 6M6 9v7a1 1 0 0 0 1 1h2v-4h2v4h2a1 1 0 0 0 1-1V9",
  create: "M10 3v10m-5-5h10M5 17h10",
  quotations: "M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v3h3M7 10h6M7 13h6",
  customers: "M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 16c0-2.2 2.2-4 5-4s5 1.8 5 4v1H2v-1Zm10.5-3c1.9.3 3.5 1.6 3.5 3v1h-3",
  profile: "M10 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 8a6 6 0 1 1 12 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z",
  logout: "M8 4H4v12h4m4-9 3 3-3 3m3-3H6",
  menu: "M3 5h14M3 10h14M3 15h14",
};

function NavIcon({ path }: { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <path d={path} />
    </svg>
  );
}

const navItems = [
  { href: "/sales", label: "Dashboard", icon: ICONS.dashboard },
  { href: "/sales/quote", label: "Create Quotation", icon: ICONS.create },
  { href: "/sales/quotations", label: "My Quotations", icon: ICONS.quotations },
  { href: "/sales/customers", label: "Customers", icon: ICONS.customers },
  { href: "/sales/profile", label: "Profile", icon: ICONS.profile },
];

export function SalesShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function SidebarContent() {
    return (
      <div className="flex h-full flex-col">
        <Link
          href="/sales"
          className="flex items-center gap-1 px-5 py-5 text-lg font-extrabold tracking-tight"
        >
          <span className="text-foreground">NANYA</span>
          <span className="text-primary">CNC</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <NavIcon path={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <NavIcon path={ICONS.logout} />
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-zinc-950 lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-white/10 bg-zinc-950">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/5 bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground lg:hidden"
          >
            <NavIcon path={ICONS.menu} />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              {currentSalesUser.initials}
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-sm font-semibold text-foreground">
                {currentSalesUser.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentSalesUser.role}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
