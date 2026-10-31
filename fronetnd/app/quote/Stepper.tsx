export const QUOTE_STEPS = [
  { id: 1, label: "Select Machine" },
  { id: 2, label: "Accessories" },
  { id: 3, label: "Customer Details" },
  { id: 4, label: "Review & Download" },
] as const;

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center overflow-x-auto px-1 py-1">
      {QUOTE_STEPS.map((step, i) => {
        const state =
          step.id < current ? "done" : step.id === current ? "active" : "todo";
        return (
          <div key={step.id} className="flex shrink-0 items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  state === "todo"
                    ? "border border-white/15 text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {state === "done" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`hidden whitespace-nowrap text-xs font-semibold sm:inline ${
                  state === "todo" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < QUOTE_STEPS.length - 1 && (
              <div
                className={`mx-2 h-px w-6 sm:w-10 ${
                  state === "done" ? "bg-primary" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
