import Link from "next/link";
import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";
import PhotoMarquee from "@/components/PhotoMarquee";
import PhotoGallery from "@/components/PhotoGallery";

const MARQUEE_IMAGES = [
  "/images/portfolio/kitchen_sage_wide.jpg",
  "/images/portfolio/kitchenette_brick.jpg",
  "/images/portfolio/media_unit.jpg",
  "/images/portfolio/kitchen_1.jpg",
  "/images/portfolio/kitchen_gloss_white.jpg",
];

const GALLERY_IMAGES = [
  {
    src: "/images/portfolio/kitchen_sage_wide.jpg",
    alt: "Sage green galley kitchen with white subway tile splashback and terrazzo benchtop",
  },
  {
    src: "/images/portfolio/kitchen_sage_cooktop.jpg",
    alt: "Sage green kitchen cooktop run with handle-less drawer fronts",
  },
  {
    src: "/images/portfolio/kitchen_sage_sink.jpg",
    alt: "Kitchen sink and window detail with terrazzo benchtop",
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
    src: "/images/portfolio/kitchen_gloss_white.jpg",
    alt: "Gloss white kitchen cabinetry during installation",
  },
];

export const metadata: Metadata = {
  title: "Custom Joinery",
  description:
    "Custom kitchens, laundries, and TV & media units by A&E Joinery — measured, drawn, and fitted to your space. Fixed-price quotes, 5 year workmanship warranty. Sydney-wide.",
  alternates: {
    canonical: "/services/custom-joinery",
  },
};

const QUICK_FACTS = [
  "Kitchens, laundries & media units",
  "Measured on site, not assumed",
  "Free in-home measure",
  "Fixed price before we cut",
  "5 year workmanship warranty",
];

const CATEGORIES = [
  {
    title: "Kitchens",
    body: "New kitchens and renovations, laid out around how you actually cook — bench space, storage, and appliance placement planned around your room, not a display floor.",
  },
  {
    title: "Laundries",
    body: "Cabinetry built around your washer, dryer, and everything that needs a home nearby — from a simple cupboard run to a full wall of storage.",
  },
  {
    title: "TV & media units",
    body: "Wall-mounted or floor-standing media joinery, sized to your television and gear, with cable management built in rather than bolted on.",
  },
];

const FAQS = [
  {
    q: "Do you do full kitchen renovations, or just the cabinetry?",
    a: "We handle the joinery — cabinetry, benchtops, and installation. For plumbing, electrical, or tiling we work alongside your other trades, or can recommend people we've worked with before.",
  },
  {
    q: "Can you match an existing kitchen or laundry finish?",
    a: "Where the finish is still available, yes. If it's been discontinued we'll talk through the closest match at the measure stage rather than guess over the phone.",
  },
  {
    q: "How long does a kitchen or laundry take?",
    a: "A laundry or small media unit is usually a 1-day install. Kitchens vary more with scope — we'll give you a real timeline at the quote stage based on your actual job.",
  },
  {
    q: "Is the quote fixed here too?",
    a: "Yes, same as our wardrobes — fixed price from the in-home measure, confirmed before anything is cut.",
  },
];

export default function CustomJoineryPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow mb-6">Services · Custom Joinery</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6">
              Kitchens, laundries &amp; media units,{" "}
              <em className="italic font-normal text-ink-deep">built the same way as our wardrobes.</em>
            </h1>
            <p className="text-paper-dim text-lg max-w-md mb-9">
              Measured on site, designed around your space, and quoted at a fixed
              price before anything is cut — the same process, whatever room it's for.
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
              src="/images/portfolio/kitchen_sage_wide.jpg"
              alt="Sage green galley kitchen with white subway tile splashback by A&E Joinery"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="border-y border-line py-5 px-5 sm:px-8 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-8 justify-between font-mono text-xs uppercase tracking-wide text-paper-dim whitespace-nowrap">
          {QUICK_FACTS.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* PHOTO MARQUEE */}
      <section className="py-10 border-b border-line">
        <PhotoMarquee images={MARQUEE_IMAGES} alt="Custom joinery by A&E Joinery" />
      </section>

      {/* CATEGORIES */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">What we build</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            Same process, whichever room it&apos;s for.
          </h2>
          <div className="grid sm:grid-cols-3 gap-px bg-line">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="bg-ink p-8">
                <h3 className="font-display font-semibold text-xl mb-3">
                  {cat.title}
                </h3>
                <p className="text-sm text-paper-dim">{cat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Recent work</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            Kitchens, kitchenettes &amp; media units we&apos;ve built.
          </h2>
          <PhotoGallery images={GALLERY_IMAGES} feature />
          <Link
            href="/portfolio"
            className="inline-block font-semibold text-sm border border-line px-6 py-3.5 rounded-sharp hover:border-paper-dim transition-colors mt-10"
          >
            View the full portfolio
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-5 sm:px-8 border-t border-line">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,320px)_1fr] gap-14">
          <div>
            <span className="eyebrow mb-4">Common questions</span>
            <h2 className="font-display font-semibold text-3xl mt-4">
              Custom joinery FAQs
            </h2>
          </div>
          <dl className="flex flex-col">
            {FAQS.map((item, i) => (
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

      {/* FINAL CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <span className="eyebrow mb-4">Get started</span>
            <h2 className="font-display font-semibold text-3xl mt-4 mb-4">
              Get a fixed price on your kitchen, laundry, or media unit.
            </h2>
            <p className="text-white/70">
              Free in-home measure, no obligation. Servicing Greater Sydney.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
