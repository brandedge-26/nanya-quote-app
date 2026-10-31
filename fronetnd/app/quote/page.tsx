import { Suspense } from "react";
import { QuoteFlow } from "./QuoteFlow";

export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteFlow />
    </Suspense>
  );
}
