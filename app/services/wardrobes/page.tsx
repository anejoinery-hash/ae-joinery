import Link from "next/link";
import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";
import PhotoMarquee from "@/components/PhotoMarquee";
import PhotoGallery from "@/components/PhotoGallery";

const MARQUEE_IMAGES = [
  "/images/portfolio/wardrobe_shaker_brass.jpg",
  "/images/portfolio/wardrobe_mirror_black.jpg",
  "/images/portfolio/walkin_dressing_room.jpg",
  "/images/portfolio/wardrobe_2.jpg",
  "/images/portfolio/hero.jpg",
];

const GALLERY_IMAGES = [
  {
    src: "/images/portfolio/wardrobe_shaker_brass.jpg",
    alt: "Four-door white shaker wardrobe with brass pull handles",
  },
  {
    src: "/images/portfolio/wardrobe_mirror_black.jpg",
    alt: "Black-framed mirrored sliding wardrobe doors in a bedroom",
  },
  {
    src: "/images/portfolio/walkin_dressing_room.jpg",
    alt: "Walk-in dressing room with fluted vanity and mirrored sliding doors",
  },
  {
    src: "/images/portfolio/wardrobe_2.jpg",
    alt: "Four-panel mirrored sliding door wardrobe by A&E Joinery",
  },
  {
    src: "/images/portfolio/hero.jpg",
    alt: "Brass handle detail on a hinged wardrobe by A&E Joinery",
  },
];

export const metadata: Metadata = {
  title: "Built-In Wardrobes",
  description:
    "Custom sliding and hinged built-in wardrobes, measured and built to fit your room exactly. Free in-home measure, fixed-price quotes, 5 year workmanship warranty. Sydney-wide.",
  alternates: {
    canonical: "/services/wardrobes",
  },
};

const QUICK_FACTS = [
  "Sliding or hinged doors",
  "Custom interior fitouts",
  "Free in-home measure",
  "Fixed price before we cut",
  "5 year workmanship warranty",
];

const DOOR_STYLES = [
  {
    title: "Sliding doors",
    body: "The most space-efficient option — no swing radius, so they work well in smaller rooms or beside beds. Track-mounted, with panel finishes in laminate, mirror, or a mix of both across a single door run.",
  },
  {
    title: "Hinged doors",
    body: "A more traditional look, usually suited to larger rooms or where you want full, unobstructed access to every shelf at once. Same finish choices as our sliding doors, with soft-close hinges available if you want them.",
  },
];

const INTERIOR_FEATURES = [
  {
    title: "Hanging rails",
    body: "Single or double-hung, split to match how you actually use the space — long-hang for coats and dresses, short-hang doubled up for the rest.",
  },
  {
    title: "Shelving",
    body: "Fixed or adjustable shelving, sized around what's going in the wardrobe rather than a standard shelf spacing.",
  },
  {
    title: "Drawer banks",
    body: "Drawers built into the carcass for folded clothes, accessories, or anything you'd rather not hang — with soft-close runners available on request.",
  },
  {
    title: "Shoe storage",
    body: "Angled or flat shoe shelving, fitted into the layout wherever it makes sense for the room.",
  },
  {
    title: "Mirrored panels",
    body: "Full-height mirror on one or more doors — useful in rooms without space for a separate mirror.",
  },
  {
    title: "Finish choice",
    body: "A range of laminate colours and finishes to match your room, plus handle-less and integrated handle options.",
  },
];

const FAQS = [
  {
    q: "How long does a built-in wardrobe take?",
    a: "Most jobs run 1–2 days on site for install, once materials are ready. Lead time from confirmed quote to install is usually 2–4 weeks, depending on the finish and how busy we are — we'll give you a real date at the quote stage, not a guess.",
  },
  {
    q: "My walls aren't straight and the ceiling isn't level — is that a problem?",
    a: "It's the norm in Sydney homes, not the exception. We measure the actual wall, floor, and ceiling line at the free measure, and the wardrobe is scribed and fitted to those, not to a flat-pack assumption of square.",
  },
  {
    q: "Can you build into an alcove, or around a chimney breast, sloped ceiling, or window?",
    a: "Yes — that's most of what makes a wardrobe worth building in rather than buying flat-pack. Alcoves, angled walls, bulkheads, and sloped ceilings are all things we design around at the measure stage.",
  },
  {
    q: "Do you fit wardrobes in apartments and strata buildings?",
    a: "Yes, regularly. We're publicly insured, work tidily, and can provide a certificate of currency if your building manager asks for one.",
  },
  {
    q: "Is the quote really fixed?",
    a: "Yes. Once you confirm the quote from the in-home measure, that's the price — no surprise extras once materials are cut.",
  },
];

export default function WardrobesPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow mb-6">Services · Built-In Wardrobes</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6">
              Sliding &amp; hinged wardrobes,{" "}
              <em className="italic font-normal text-ink-deep">built to fit your room exactly.</em>
            </h1>
            <p className="text-paper-dim text-lg max-w-md mb-9">
              No fillers, no gaps, no catalogue sizing. We measure your room wall to
              wall and floor to ceiling, then design, build, and install a wardrobe
              around it — inside and out.
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
              src="/images/portfolio/wardrobe_mirror_black.jpg"
              alt="Black-framed mirrored sliding wardrobe doors by A&E Joinery"
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
        <PhotoMarquee images={MARQUEE_IMAGES} alt="Built-in wardrobe by A&E Joinery" />
      </section>

      {/* DOOR STYLES */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Door styles</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            Sliding or hinged — whichever suits the room.
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-line">
            {DOOR_STYLES.map((style) => (
              <div key={style.title} className="bg-ink p-8">
                <h3 className="font-display font-semibold text-xl mb-3">
                  {style.title}
                </h3>
                <p className="text-sm text-paper-dim">{style.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERIOR FEATURES */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">What&apos;s inside</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            The interior is designed around what you actually own.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-dark">
            {INTERIOR_FEATURES.map((feature) => (
              <div key={feature.title} className="bg-ink-deep p-8">
                <h3 className="font-display font-semibold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-4">Recent work</span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-4 mb-14 max-w-xl">
            A few wardrobes we&apos;ve built recently.
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
              Wardrobe FAQs
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
              Get a fixed price on your wardrobe.
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
