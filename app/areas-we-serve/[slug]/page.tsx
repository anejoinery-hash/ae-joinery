import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REGIONS, getRegion } from "@/lib/regions";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";

export function generateStaticParams() {
  return REGIONS.map((region) => ({ slug: region.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const region = getRegion(params.slug);
  if (!region) return {};

  return {
    title: `Built-In Wardrobes & Joinery in ${region.name}`,
    description: `A&E Joinery builds and installs custom built-in wardrobes and joinery in ${region.name}, Sydney. Free in-home measure, fixed-price quotes, 5 year workmanship warranty.`,
    alternates: {
      canonical: `/areas-we-serve/${region.slug}`,
    },
  };
}

const REASONS = [
  {
    title: "Measured on site, not assumed",
    body: "We take real measurements in your room before anything is designed, so the finished piece fits the wall you actually have.",
  },
  {
    title: "Fixed price before we cut",
    body: "Once the quote's confirmed from your free measure, that's the price — no surprise extras once materials are cut.",
  },
  {
    title: "One team, start to finish",
    body: "The same team that measures your space designs it, builds it, and installs it — one point of contact if anything needs adjusting.",
  },
];

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = getRegion(params.slug);
  if (!region) notFound();

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow mb-6">Areas We Serve · {region.name}</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6">
              Built-in wardrobes &amp; joinery in{" "}
              <em className="italic font-normal text-ink-deep">{region.name}.</em>
            </h1>
            <p className="text-paper-dim text-lg max-w-md mb-9">
              We measure, design, build, and install across {region.name} and the
              rest of Greater Sydney — starting with a free in-home measure and a
              fixed price before we cut.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="font-bold text-sm bg-ink-deep text-white px-6 py-3.5 rounded-sharp hover:bg-[#262626] transition-colors"
              >
                Request a free measure &amp; quote
              </Link>
              <Link
                href="/portfolio"
                className="font-semibold text-sm border border-line px-6 py-3.5 rounded-sharp hover:border-paper-dim transition-colors"
              >
                View recent projects
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-sharp overflow-hidden border border-line">
            <Image
              src="/images/portfolio/wardrobe_shaker_brass.jpg"
              alt={`Built-in wardrobe installed by A&E Joinery in ${region.name}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Why locals choose A&amp;E</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            The same standard, every job in {region.name}.
          </h2>
          <div className="grid sm:grid-cols-3 gap-px bg-line">
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

      {/* SERVICES */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">What we build</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-10 max-w-xl">
            Wardrobes and custom joinery, wherever you are in {region.name}.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/wardrobes"
              className="font-semibold text-sm border border-line rounded-sharp px-4 py-2.5 hover:border-paper-dim transition-colors"
            >
              Built-In Wardrobes
            </Link>
            <Link
              href="/services/custom-joinery"
              className="font-semibold text-sm border border-line rounded-sharp px-4 py-2.5 hover:border-paper-dim transition-colors"
            >
              Custom Joinery
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER AREAS */}
      <section className="py-16 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Other areas</span>
          <div className="flex flex-wrap gap-3 mt-4">
            {REGIONS.filter((r) => r.slug !== region.slug).map((r) => (
              <Link
                key={r.slug}
                href={`/areas-we-serve/${r.slug}`}
                className="font-semibold text-sm border border-line rounded-sharp px-4 py-2.5 hover:border-paper-dim transition-colors"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">Get started</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-4">
              Tell us about your space in {region.name}.
            </h2>
            <p className="text-white/70">
              Free in-home measure, no obligation.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
