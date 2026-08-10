import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { REGIONS } from "@/lib/regions";

const TRUST_ITEMS = [
  "Publicly insured",
  "Sydney-wide, mobile service",
  "Fixed-price quotes",
  "Free in-home measure",
  "5 year workmanship warranty",
];

const SERVICES = [
  {
    title: "Built-In Wardrobes",
    slug: "wardrobes",
    flagship: true,
    description:
      "Our core trade: sliding or hinged built-in wardrobes, designed around your room's actual dimensions — not a catalogue size.",
  },
  {
    title: "Custom Joinery",
    slug: "custom-joinery",
    flagship: false,
    description:
      "Kitchens, laundries, and TV & media units built the same way as our wardrobes — measured, drawn, and fitted to your space.",
  },
];

const REASONS = [
  {
    title: "Measured on site, not assumed",
    body: "Sydney homes are rarely square. We take real measurements in your room before anything is designed, so the finished wardrobe fits the wall you actually have.",
  },
  {
    title: "Custom quoted, every time",
    body: "No fixed price list. Every job is priced from the free measure, based on your room and finish — so the quote reflects your space, not an average one.",
  },
  {
    title: "Fixed price before we cut",
    body: "Once the quote's confirmed, that's the price. No surprise extras once materials are cut.",
  },
  {
    title: "One person, start to finish",
    body: "The same person who measures your space designs it, builds it, and installs it — so there's one point of contact if anything needs adjusting.",
  },
  {
    title: "5-year workmanship warranty",
    body: "Doors, drawers, and cabinet alignment covered for 5 years. We're a small, local operation, and we stand behind what we install.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Free in-home measure",
    body: "We come to you, measure the actual space, and talk through how you'll use it.",
  },
  {
    step: "02",
    title: "Design & materials",
    body: "You get a clear design and material selection, with a fixed price, before anything is cut.",
  },
  {
    step: "03",
    title: "Built for your space",
    body: "Every piece is cut and assembled to the exact measurements taken at your home.",
  },
  {
    step: "04",
    title: "Installed & finished",
    body: "Fitted on site, levelled, and adjusted until every door and drawer runs true.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — full viewport, single image, text laid over it */}
      <section className="relative h-svh min-h-[560px] w-full flex items-center">
        <Image
          src="/images/portfolio/hero.jpg"
          alt="Custom built-in wardrobe with brass handles by A&E Joinery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Readability gradient: dark behind the copy on the left, clearing to
            fully transparent by 78% so the right of the photo stays vivid.
            The photo is bright white through the middle, so the dark has to
            hold until roughly where the copy ends before it falls away. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 via-48% to-transparent to-78%"
        />
        {/* Mobile only: the copy spans most of the width there, so the
            horizontal gradient alone isn't enough behind the lower text. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent to-60% sm:hidden"
        />
        <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8">
          <div className="max-w-xl text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            <span className="eyebrow mb-6">Custom joinery · Sydney-wide</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[1.05] mt-6 mb-6">
              Joinery for your home, not just your house.
            </h1>
            <p className="text-white/80 text-lg max-w-md mb-9">
              A&amp;E Joinery designs, builds and installs custom sliding-door wardrobes
              across Sydney — and takes on kitchens, laundries and media units too.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="font-bold text-sm bg-white text-ink-deep px-6 py-3.5 rounded-sharp hover:bg-paper transition-colors"
              >
                Request a free measure &amp; quote
              </Link>
              <Link
                href="/portfolio"
                className="font-semibold text-sm border border-white/50 text-white px-6 py-3.5 rounded-sharp hover:border-white transition-colors"
              >
                View recent projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-line py-5 px-5 sm:px-8 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-8 justify-between font-mono text-xs uppercase tracking-wide text-paper-dim whitespace-nowrap">
          {TRUST_ITEMS.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">What we build</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            Wardrobes are where we started. It&apos;s not where we stop.
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-line-dark">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-ink-deep text-white p-8 sm:p-10 group"
              >
                {service.flagship && (
                  <span className="font-mono text-xs text-white uppercase tracking-wide">
                    Core service
                  </span>
                )}
                <h3 className="font-display font-semibold text-xl mt-2 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/70">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Why custom, why us</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            What actually changes when it&apos;s built for your room.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
            {REASONS.map((reason) => (
              <div key={reason.title} className="bg-ink p-8">
                <h3 className="font-display font-semibold text-lg mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-paper-dim">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-5 sm:px-8 bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">Why A&amp;E</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-6">
              Built around your walls, not a standard size.
            </h2>
            <p className="text-white/70 mb-4">
              Sydney homes are rarely square — terraces, older apartments and additions
              all have their quirks. We measure on site first, so the wardrobe we build
              fits your actual room, not an average one.
            </p>
            <p className="text-white/70">
              You get a fixed price before we cut anything, a clear timeline, and one
              team handling design through to install — so there's a single point of
              contact if anything needs adjusting.
            </p>
          </div>
          <ul className="flex flex-col gap-0">
            {PROCESS.map((item, i) => (
              <li
                key={item.step}
                className={`flex gap-6 py-6 ${i !== 0 ? "border-t border-line-dark" : ""}`}
              >
                <span className="font-mono text-sm text-white pt-0.5">{item.step}</span>
                <div>
                  <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Coverage</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-10 max-w-xl">
            Areas we serve across Sydney
          </h2>
          <div className="flex flex-wrap gap-3">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/areas-we-serve/${region.slug}`}
                className="font-semibold text-sm border border-line rounded-sharp px-4 py-2.5 hover:border-paper-dim transition-colors"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">Get started</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-4">
              Tell us about your space.
            </h2>
            <p className="text-paper-dim">
              Most quotes follow a free on-site measure. Servicing Greater Sydney.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
