import type { ReactNode } from "react";
import { SalesShell } from "./SalesShell";

export default function SalesLayout({ children }: { children: ReactNode }) {
  return <SalesShell>{children}</SalesShell>;
}
