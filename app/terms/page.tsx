import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the A&E Joinery website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="pt-40 pb-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="font-display font-extrabold text-4xl leading-[1.05] mt-6 mb-6">
          Terms of Use
        </h1>
        <p className="text-paper-dim mb-10">
          Last updated {new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long" })}.
          These terms cover use of this website. They don't cover the terms of any job we
          quote or carry out for you — those are agreed separately, in writing, before work
          starts.
        </p>

        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Website content</h2>
            <p className="text-paper-dim">
              The photos, descriptions, and pricing indications on this site are provided as a
              general guide to our work and are not a binding quote. Every job is priced
              individually from an in-home measure — nothing here should be relied on as a fixed
              price for your specific space.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Enquiries</h2>
            <p className="text-paper-dim">
              Submitting the quote form doesn't create a contract between us — it's a request
              for us to get in touch. Any agreement to carry out work is made separately, once
              we've measured your space and you've confirmed a quote.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Accuracy</h2>
            <p className="text-paper-dim">
              We try to keep this site accurate and up to date, but details like finishes,
              lead times, and service areas can change. If something here doesn't match what
              we tell you directly, what we tell you directly takes priority.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Liability</h2>
            <p className="text-paper-dim">
              To the extent permitted by law, A&amp;E Joinery isn't liable for any loss arising
              from use of this website or reliance on its content, beyond what's required under
              Australian Consumer Law.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Governing law</h2>
            <p className="text-paper-dim">
              These terms are governed by the laws of New South Wales, Australia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
