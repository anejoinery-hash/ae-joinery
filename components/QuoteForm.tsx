"use client";

import { useState, FormEvent } from "react";

const PHONE_DISPLAY = "0414 711 741";
const PHONE_HREF = "tel:+61414711741";
const EMAIL = "anejoinery@gmail.com";

const SERVICES = [
  { value: "wardrobes", label: "Built-in wardrobe" },
  { value: "kitchens", label: "Kitchen" },
  { value: "laundries", label: "Laundry" },
  { value: "tv-units", label: "TV / media unit" },
  { value: "other", label: "Other custom joinery" },
];

const FALLBACK_ERROR = "Something went wrong at our end.";

type Lead = Record<string, string>;

/**
 * A prefilled email containing everything the visitor just typed. If saving the
 * enquiry fails for any reason, this still gets it to the business in one tap
 * rather than losing it behind an error message.
 */
function mailtoLink(lead: Lead) {
  const service =
    SERVICES.find((s) => s.value === lead.service)?.label || lead.service || "—";
  const body = [
    `Name: ${lead.name || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Suburb: ${lead.suburb || "—"}`,
    `What I need: ${service}`,
    "",
    "About the space:",
    lead.message || "—",
  ].join("\n");
  const subject = lead.name ? `Quote request — ${lead.name}` : "Quote request";
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(FALLBACK_ERROR);
  const [lead, setLead] = useState<Lead>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Lead;
    setLead(data);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let message = FALLBACK_ERROR;
        try {
          const payload = await res.json();
          if (typeof payload?.error === "string" && payload.error) {
            message = payload.error;
          }
        } catch {
          // No JSON body — keep the fallback.
        }
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("We could not reach our server.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-sharp border border-line">
        <p className="text-sm text-ink-deep">
          Thanks — your request is in. We&apos;ll call you back within a business
          day.
        </p>
        <p className="text-xs text-paper-dim mt-3">
          Need us sooner? Call{" "}
          <a href={PHONE_HREF} className="underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-sharp border border-line"
    >
      <Field label="Name" name="name" required autoComplete="name" />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
      />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Suburb" name="suburb" autoComplete="address-level2" />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="quote-service"
          className="font-mono text-xs uppercase tracking-wide text-paper-dim"
        >
          What do you need?
        </label>
        <select
          id="quote-service"
          name="service"
          className="bg-transparent border border-line rounded-sharp px-3.5 py-3 text-sm focus:outline-none focus:border-ink-deep"
        >
          {SERVICES.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="quote-message"
          className="font-mono text-xs uppercase tracking-wide text-paper-dim"
        >
          Tell us about the space
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={4}
          placeholder="Room size, timing, anything else useful..."
          className="bg-transparent border border-line rounded-sharp px-3.5 py-3 text-sm focus:outline-none focus:border-ink-deep resize-y"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-bold text-sm bg-ink-deep text-white px-6 py-3.5 rounded-sharp hover:bg-[#262626] transition-colors disabled:opacity-60 self-start"
      >
        {status === "sending" ? "Sending..." : "Request a free measure & quote"}
      </button>

      {status === "error" && (
        <div
          role="alert"
          className="flex flex-col gap-3 border border-line rounded-sharp p-4"
        >
          <p className="text-sm text-ink-deep">
            {errorMessage} Your details are still here — send them straight to us
            instead:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={mailtoLink(lead)}
              className="font-bold text-sm bg-ink-deep text-white px-5 py-3 rounded-sharp hover:bg-[#262626] transition-colors"
            >
              Email this enquiry
            </a>
            <a
              href={PHONE_HREF}
              className="font-bold text-sm border border-line px-5 py-3 rounded-sharp hover:border-ink-deep transition-colors"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}

      {status !== "error" && (
        <p className="text-xs text-paper-dim">
          Prefer to talk? Call{" "}
          <a href={PHONE_HREF} className="underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  const id = `quote-${name}`;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-wide text-paper-dim"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="bg-transparent border border-line rounded-sharp px-3.5 py-3 text-sm focus:outline-none focus:border-ink-deep"
      />
    </div>
  );
}
