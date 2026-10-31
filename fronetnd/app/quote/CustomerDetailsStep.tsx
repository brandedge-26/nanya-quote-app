import type { CustomerDetails } from "./types";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-zinc-600 transition-colors focus:border-primary/50 focus:outline-none";
const labelClass = "text-xs font-semibold text-muted-foreground";
const iconClass = "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600";

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={iconClass}>
      <path fillRule="evenodd" d="M10 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 8a6 6 0 1 1 12 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" clipRule="evenodd" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={iconClass}>
      <path d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v.3l-7 4.2-7-4.2V5Z" />
      <path d="M17 7.4 10.5 11.3a1 1 0 0 1-1 0L3 7.4V15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.4Z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={iconClass}>
      <path fillRule="evenodd" d="M4 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14h1a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1V3Zm3 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2H7Zm0 4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H7Zm4-4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H11Zm0 4a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H11ZM8 17v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2H8Z" clipRule="evenodd" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} top-3.5 translate-y-0`}>
      <path fillRule="evenodd" d="M4 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707l-3.414-3.414A1 1 0 0 0 12.586 3H4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H7Z" clipRule="evenodd" />
    </svg>
  );
}

export function CustomerDetailsStep({
  details,
  onChange,
}: {
  details: CustomerDetails;
  onChange: (details: CustomerDetails) => void;
}) {
  function set<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    onChange({ ...details, [key]: value });
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Your Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll use this to prepare your quotation.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Full Name *</span>
            <div className="relative">
              <UserIcon />
              <input
                type="text"
                value={details.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Email *</span>
            <div className="relative">
              <MailIcon />
              <input
                type="email"
                value={details.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="john@company.com"
                className={inputClass}
              />
            </div>
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Company Name</span>
          <div className="relative">
            <BuildingIcon />
            <input
              type="text"
              value={details.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Company name"
              className={inputClass}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Notes (optional)</span>
          <div className="relative">
            <NoteIcon />
            <textarea
              value={details.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any specific requirement..."
              rows={3}
              className={inputClass}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
