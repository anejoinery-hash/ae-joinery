"use client";

import { useState, FormEvent } from "react";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-ink-deep bg-white p-6 sm:p-8 rounded-sharp border border-line">
        Thanks — your request is in. We&apos;ll call you back within a business day.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 sm:p-8 rounded-sharp border border-line"
    >
      <Field label="Name" name="name" required />
      <Field label="Phone" name="phone" type="tel" required />
      <Field label="Email" name="email" type="email" />
      <Field label="Suburb" name="suburb" />
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-wide text-paper-dim">
          What do you need?
        </label>
        <select
          name="service"
          className="bg-transparent border border-line rounded-sharp px-3.5 py-3 text-sm focus:outline-none focus:border-ink-deep"
        >
          <option value="wardrobes">Built-in wardrobe</option>
          <option value="kitchens">Kitchen</option>
          <option value="laundries">Laundry</option>
          <option value="tv-units">TV / media unit</option>
          <option value="other">Other custom joinery</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-wide text-paper-dim">
          Tell us about the space
        </label>
        <textarea
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
        <p className="text-xs text-paper-dim">
          Something went wrong — call us on 0414 711 741 instead, or try again.
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-xs uppercase tracking-wide text-paper-dim">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border border-line rounded-sharp px-3.5 py-3 text-sm focus:outline-none focus:border-ink-deep"
      />
    </div>
  );
}
