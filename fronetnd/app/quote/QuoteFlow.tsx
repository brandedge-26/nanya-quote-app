"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Stepper } from "./Stepper";
import { SelectMachineStep } from "./SelectMachineStep";
import { AccessoriesStep } from "./AccessoriesStep";
import { CustomerDetailsStep } from "./CustomerDetailsStep";
import { ReviewStep } from "./ReviewStep";
import { EMPTY_CUSTOMER_DETAILS, type CustomerDetails } from "./types";
import { machines } from "@/app/data/machines";

export function QuoteFlow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [machineId, setMachineId] = useState<string | null>(null);
  const [accessoryIds, setAccessoryIds] = useState<string[]>([]);
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_CUSTOMER_DETAILS);

  useEffect(() => {
    const preselect = searchParams.get("machine");
    if (preselect && machines.some((m) => m.id === preselect)) {
      setMachineId(preselect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleAccessory(id: string) {
    setAccessoryIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }

  const canGoNext =
    step === 1
      ? machineId !== null
      : step === 2
        ? true
        : step === 3
          ? details.name.trim() !== "" && details.email.trim() !== ""
          : true;

  return (
    <main className="flex flex-1 flex-col bg-background">
      <div className="no-print sticky top-0 z-20 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-8">
          <Stepper current={step} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-8 sm:py-10">
        <div key={step} className="animate-step-in">
          {step === 1 && (
            <SelectMachineStep selectedId={machineId} onSelect={setMachineId} />
          )}
          {step === 2 && machineId && (
            <AccessoriesStep
              machineId={machineId}
              selectedIds={accessoryIds}
              onToggle={toggleAccessory}
            />
          )}
          {step === 3 && (
            <CustomerDetailsStep details={details} onChange={setDetails} />
          )}
          {step === 4 && machineId && (
            <ReviewStep
              machineId={machineId}
              selectedAccessoryIds={accessoryIds}
              details={details}
            />
          )}
        </div>

        {step < 4 && (
          <div className="no-print mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M12.79 15.79a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.48 4.47a.75.75 0 0 1 0 1.32Z" clipRule="evenodd" />
                </svg>
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={!canGoNext}
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-400 active:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M7.21 4.21a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06L11.69 10 7.21 5.53a.75.75 0 0 1 0-1.32Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="no-print mt-6">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12.79 15.79a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.48 4.47a.75.75 0 0 1 0 1.32Z" clipRule="evenodd" />
              </svg>
              Back
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
