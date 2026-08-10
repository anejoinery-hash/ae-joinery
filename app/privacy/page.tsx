import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How A&E Joinery collects, uses, and stores information submitted through this website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="font-display font-extrabold text-4xl leading-[1.05] mt-6 mb-6">
          Privacy Policy
        </h1>
        <p className="text-paper-dim mb-10">
          Last updated {new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long" })}.
          This page explains what information we collect through this website and how it's used.
        </p>

        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-display font-semibold text-xl mb-3">What we collect</h2>
            <p className="text-paper-dim">
              When you submit the quote form on this site, we collect the information you
              provide: your name, phone number, and optionally your email, suburb, the type of
              job you're enquiring about, and any message you add. We don't collect this
              information any other way — there's no account creation, and we don't use
              tracking cookies or analytics scripts on this site.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">How we use it</h2>
            <p className="text-paper-dim">
              Information submitted through the quote form is used only to respond to your
              enquiry — to call or email you back, arrange a measure, and provide a quote. We
              don't sell, rent, or share it with third parties, other than service providers
              (such as our hosting and database provider) who help us run this website and
              store enquiries securely.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Where it's stored</h2>
            <p className="text-paper-dim">
              Quote form submissions are stored in a Supabase database. Access is restricted —
              the public website can submit new enquiries but can't read, edit, or export
              existing ones.
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Your rights</h2>
            <p className="text-paper-dim">
              You can ask us what information we hold about you, request a correction, or ask
              us to delete it, at any time — just get in touch using the details on our{" "}
              <a href="/contact" className="underline hover:text-ink-deep transition-colors">
                contact page
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display font-semibold text-xl mb-3">Changes to this policy</h2>
            <p className="text-paper-dim">
              If this policy changes, we'll update this page. Check back here if you want the
              latest version.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
