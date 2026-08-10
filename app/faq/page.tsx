import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about A&E Joinery's quotes, timelines, warranty, and insurance for built-in wardrobes and custom joinery in Sydney.",
  alternates: {
    canonical: "/faq",
  },
};

const GENERAL_FAQS = [
  {
    q: "How does the quote process work?",
    a: "It starts with a free in-home measure — we come to you, look at the space, and talk through what you need. From that visit we put together a fixed-price quote. Nothing is cut until you confirm it.",
  },
  {
    q: "Is the quote really fixed?",
    a: "Yes. Once you confirm the quote from the in-home measure, that's the price — no surprise extras once materials are cut.",
  },
  {
    q: "What areas do you service?",
    a: "Greater Sydney — see our areas we serve page for the regions we cover most often. If you're just outside those, ask anyway.",
  },
  {
    q: "Are you insured?",
    a: "Yes, publicly insured on every job, with a certificate of currency available if your building manager or strata needs one.",
  },
  {
    q: "What's covered by the workmanship warranty?",
    a: "Doors, drawers, and cabinet alignment are covered for 5 years. If something's not running true, get in touch and we'll come back to fix it.",
  },
  {
    q: "How do I pay, and when?",
    a: "We'll talk through payment terms at the quote stage — typically a deposit to confirm the job, with the balance on completion.",
  },
  {
    q: "Do you work in apartments and strata buildings?",
    a: "Yes, regularly. We work tidily and can provide insurance documentation your building manager may ask for.",
  },
  {
    q: "What if my walls or ceilings aren't square?",
    a: "That's the norm in Sydney homes, not the exception. We measure the actual wall, floor, and ceiling line at the free measure, and build to fit those — not to a flat-pack assumption of square.",
  },
];

export default function FaqPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-6">FAQ</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6 max-w-2xl">
            Common questions,{" "}
            <em className="italic font-normal text-ink-deep">answered plainly.</em>
          </h1>
          <p className="text-paper-dim text-lg max-w-xl">
            For questions specific to wardrobes or custom joinery, see those
            service pages too — this page covers the general stuff.
          </p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="py-16 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <dl className="flex flex-col max-w-3xl">
            {GENERAL_FAQS.map((item, i) => (
              <div
                key={item.q}
                className={`py-7 ${i !== 0 ? "border-t border-line" : ""}`}
              >
                <dt className="font-display font-semibold text-lg mb-2">
                  {item.q}
                </dt>
                <dd className="text-sm text-paper-dim max-w-2xl">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-4">Still have a question?</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-4 max-w-lg">
            Ask us directly.
          </h2>
          <Link
            href="/contact"
            className="font-bold text-sm bg-white text-ink-deep px-6 py-3.5 rounded-sharp hover:bg-paper transition-colors mt-4"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
