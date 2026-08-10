import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A&E Joinery builds custom built-in wardrobes and joinery across Sydney — kitchens, laundries, TV & media units, all measured, drawn, and fitted to your space.",
  alternates: {
    canonical: "/services",
  },
};

const SERVICES = [
  {
    title: "Built-In Wardrobes",
    slug: "wardrobes",
    flagship: true,
    image: "/images/portfolio/wardrobe_2.jpg",
    description:
      "Our core trade: sliding or hinged built-in wardrobes, designed around your room's actual dimensions — not a catalogue size.",
  },
  {
    title: "Custom Joinery",
    slug: "custom-joinery",
    flagship: false,
    image: "/images/portfolio/kitchen_1.jpg",
    description:
      "Kitchens, laundries, and TV & media units built the same way as our wardrobes — measured, drawn, and fitted to your space.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-6">Services</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6 max-w-2xl">
            Wardrobes are where we started.{" "}
            <em className="italic font-normal text-ink-deep">It&apos;s not where we stop.</em>
          </h1>
          <p className="text-paper-dim text-lg max-w-xl">
            Every job — wardrobe, kitchen, laundry, or media unit — starts with a
            free in-home measure and a fixed price before anything is cut.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-px bg-line-dark">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-ink-deep text-white p-8 group"
              >
                <div className="relative aspect-[4/3] rounded-sharp overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {service.flagship && (
                  <span className="font-mono text-xs text-white uppercase tracking-wide">
                    Core service
                  </span>
                )}
                <h2 className="font-display font-semibold text-xl mt-2 mb-2">
                  {service.title}
                </h2>
                <p className="text-sm text-white/70">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-4">Not sure which you need?</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-4 max-w-lg">
            Tell us about your space and we&apos;ll talk it through.
          </h2>
          <Link
            href="/contact"
            className="font-bold text-sm bg-ink-deep text-white px-6 py-3.5 rounded-sharp hover:bg-[#262626] transition-colors mt-4"
          >
            Request a free measure &amp; quote
          </Link>
        </div>
      </section>
    </>
  );
}
