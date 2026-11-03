import { Suspense } from "react";
import { QuoteFlow } from "@/app/quote/QuoteFlow";

export default function SalesCreateQuotationPage() {
  return (
    <div className="-mx-4 -my-6 sm:-mx-6 sm:-my-8">
      <Suspense fallback={null}>
        <QuoteFlow />
      </Suspense>
    </div>
  );
}
