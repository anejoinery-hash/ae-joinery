import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with A&E Joinery for a free in-home measure and fixed-price quote on your built-in wardrobe or custom joinery project. Servicing Greater Sydney.",
  alternates: {
    canonical: "/contact",
  },
};

const CONTACT_ITEMS = [
  {
    label: "Phone",
    value: "0414 711 741",
    href: "tel:+61414711741",
  },
  {
    label: "Email",
    value: "anejoinery@gmail.com",
    href: "mailto:anejoinery@gmail.com",
  },
  {
    label: "Instagram",
    value: "@ae.joinery",
    href: "https://www.instagram.com/ae.joinery",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow mb-6">Get in touch</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6">
              Let&apos;s talk about{" "}
              <em className="italic font-normal text-ink-deep">your space.</em>
            </h1>
            <p className="text-paper-dim text-lg max-w-md mb-9">
              Fill in the form, call, or email — most quotes start with a free
              in-home measure. We&apos;ll get back to you within a business day.
            </p>
            <div className="flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-baseline gap-3 group"
                >
                  <span className="font-mono text-xs uppercase tracking-wide text-paper-dim w-20 shrink-0">
                    {item.label}
                  </span>
                  <span className="font-display font-semibold text-lg group-hover:text-paper-dim transition-colors">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-sharp overflow-hidden border border-line">
            <Image
              src="/images/portfolio/wardrobe_shaker_brass.jpg"
              alt="Four-door white shaker wardrobe with brass pull handles by A&E Joinery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">Request a quote</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-4">
              Tell us about your space.
            </h2>
            <p className="text-paper-dim mb-4">
              A few details about the room and what you're after is enough to get
              started — we&apos;ll follow up to book a free in-home measure and
              talk through the rest.
            </p>
            <p className="text-paper-dim">
              Servicing Greater Sydney. Publicly insured, with a 5 year workmanship
              warranty on every job.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
