import Link from "next/link";
import type { Metadata } from "next";
import { REGIONS } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "A&E Joinery is a mobile, Sydney-wide joinery business — see the regions we cover for built-in wardrobes and custom joinery.",
  alternates: {
    canonical: "/areas-we-serve",
  },
};

export default function AreasWeServePage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-6">Coverage</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6 max-w-2xl">
            Areas we serve{" "}
            <em className="italic font-normal text-ink-deep">across Sydney.</em>
          </h1>
          <p className="text-paper-dim text-lg max-w-xl">
            We're a mobile service — we come to you for the measure, the install,
            and everything in between. No showroom visit required.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {REGIONS.map((region) => (
            <Link
              key={region.slug}
              href={`/areas-we-serve/${region.slug}`}
              className="bg-ink p-8 group"
            >
              <h2 className="font-display font-semibold text-lg group-hover:text-paper-dim transition-colors">
                {region.name}
              </h2>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-4">Get started</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-4 max-w-lg">
            Not sure if we cover your suburb?
          </h2>
          <p className="text-white/70 mb-9 max-w-md">
            Ask us — if it's within Greater Sydney, chances are we do.
          </p>
          <Link
            href="/contact"
            className="font-bold text-sm bg-white text-ink-deep px-6 py-3.5 rounded-sharp hover:bg-paper transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
