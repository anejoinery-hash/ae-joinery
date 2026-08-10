import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";

const GALLERY_IMAGES = [
  {
    src: "/images/portfolio/kitchen_sage_wide.jpg",
    alt: "Sage green galley kitchen with white subway tile splashback",
  },
  {
    src: "/images/portfolio/wardrobe_shaker_brass.jpg",
    alt: "Four-door white shaker wardrobe with brass pull handles",
  },
  {
    src: "/images/portfolio/kitchenette_brick.jpg",
    alt: "Timber kitchenette and built-in banquette against an exposed brick wall",
  },
  {
    src: "/images/portfolio/media_unit.jpg",
    alt: "Floating white shaker media unit beneath a wall-mounted TV",
  },
  {
    src: "/images/portfolio/walkin_dressing_room.jpg",
    alt: "Walk-in dressing room with fluted vanity and mirrored sliding doors",
  },
  {
    src: "/images/portfolio/hero.jpg",
    alt: "Brass handle detail on a wardrobe built by A&E Joinery",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "A&E Joinery is a small, publicly insured joinery business serving Sydney — one team measuring, designing, building, and installing every job, start to finish.",
  alternates: {
    canonical: "/about",
  },
};

const VALUES = [
  {
    title: "Measured on site, not assumed",
    body: "Sydney homes are rarely square. We take real measurements in your room before anything is designed, so the finished piece fits the wall you actually have.",
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
    title: "One team, start to finish",
    body: "The same team that measures your space designs it, builds it, and installs it — so there's one point of contact if anything needs adjusting.",
  },
  {
    title: "5-year workmanship warranty",
    body: "Doors, drawers, and cabinet alignment covered for 5 years. We're a small, local operation, and we stand behind what we install.",
  },
  {
    title: "Publicly insured",
    body: "Full public liability cover on every job, with a certificate of currency available if your building manager or strata needs one.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow mb-6">About A&amp;E Joinery</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6">
              A small joinery business,{" "}
              <em className="italic font-normal text-ink-deep">built around doing the measure right.</em>
            </h1>
            <p className="text-paper-dim text-lg max-w-md mb-9">
              A&amp;E Joinery designs, builds, and installs custom built-in wardrobes
              and joinery across Sydney — starting with an honest, in-person measure
              of your actual room, not a catalogue size.
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
              src="/images/portfolio/kitchen_1.jpg"
              alt="A kitchen built and installed by A&E Joinery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">How we work</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-6">
              Built around your walls, not a standard size.
            </h2>
            <p className="text-paper-dim mb-4">
              A&amp;E Joinery started with built-in wardrobes, and it&apos;s still our
              core trade — but the same approach carries across everything we build:
              kitchens, laundries, and media units included. We measure on site
              first, because Sydney homes are rarely square, and a wardrobe or
              cabinet that&apos;s only ever been designed on paper tends to show it
              in the gaps.
            </p>
            <p className="text-paper-dim">
              You get a fixed price before we cut anything, a clear timeline, and
              one team handling design through to install — so there&apos;s a single
              point of contact if anything needs adjusting, from the first measure
              to the last door adjustment.
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto rounded-sharp overflow-hidden border border-line">
            <Image
              src="/images/portfolio/kitchen_sage_detail.jpg"
              alt="Cooktop and terrazzo benchtop detail in a kitchen built by A&E Joinery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">What you can expect</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            The same standard, on every job.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-dark">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-ink-deep p-8">
                <h3 className="font-display font-semibold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-white/70">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="eyebrow mb-4">Coverage</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-4">
              Sydney-wide, mobile service.
            </h2>
            <p className="text-paper-dim mb-6">
              We travel to you for the measure, the install, and everything in
              between — no showroom visit required.
            </p>
            <Link
              href="/areas-we-serve"
              className="font-semibold text-sm border border-line px-6 py-3.5 rounded-sharp hover:border-paper-dim transition-colors inline-block"
            >
              See areas we serve
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-sharp overflow-hidden border border-line">
            <Image
              src="/images/portfolio/media_unit_detail.jpg"
              alt="Built-in media unit installed by A&E Joinery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Recent work</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            A few jobs we&apos;ve finished recently.
          </h2>
          <PhotoGallery images={GALLERY_IMAGES} />
          <Link
            href="/portfolio"
            className="inline-block font-semibold text-sm border border-line px-6 py-3.5 rounded-sharp hover:border-paper-dim transition-colors mt-10"
          >
            View the full portfolio
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-4">Get started</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-4 max-w-lg">
            Tell us about your space.
          </h2>
          <p className="text-white/70 mb-9 max-w-md">
            Most quotes follow a free on-site measure. Servicing Greater Sydney.
          </p>
          <Link
            href="/contact"
            className="font-bold text-sm bg-white text-ink-deep px-6 py-3.5 rounded-sharp hover:bg-paper transition-colors"
          >
            Request a free measure &amp; quote
          </Link>
        </div>
      </section>
    </>
  );
}
