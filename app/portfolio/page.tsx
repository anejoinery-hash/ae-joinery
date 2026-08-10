import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Recent built-in wardrobes and custom joinery projects by A&E Joinery, across Sydney.",
  alternates: {
    canonical: "/portfolio",
  },
};

const PROJECTS = [
  {
    src: "/images/portfolio/kitchen_sage_wide.jpg",
    alt: "Sage green galley kitchen with white subway tile splashback and terrazzo benchtop",
    title: "Sage green kitchen renovation",
    category: "Custom joinery",
  },
  {
    src: "/images/portfolio/wardrobe_shaker_brass.jpg",
    alt: "Four-door white shaker wardrobe with brass pull handles",
    title: "Shaker wardrobe, brass hardware",
    category: "Wardrobes",
  },
  {
    src: "/images/portfolio/kitchenette_brick.jpg",
    alt: "Timber kitchenette and built-in banquette against an exposed brick wall",
    title: "Kitchenette & banquette",
    category: "Custom joinery",
  },
  {
    src: "/images/portfolio/wardrobe_mirror_black.jpg",
    alt: "Black-framed mirrored sliding wardrobe doors in a bedroom",
    title: "Black-framed mirrored sliders",
    category: "Wardrobes",
  },
  {
    src: "/images/portfolio/media_unit.jpg",
    alt: "Floating white shaker media unit beneath a wall-mounted TV",
    title: "Floating media unit",
    category: "Custom joinery",
  },
  {
    src: "/images/portfolio/walkin_dressing_room.jpg",
    alt: "Walk-in dressing room with fluted vanity and mirrored sliding doors",
    title: "Walk-in dressing room",
    category: "Wardrobes",
  },
  {
    src: "/images/portfolio/kitchen_1.jpg",
    alt: "Kitchen with timber-slat island by A&E Joinery",
    title: "Kitchen renovation",
    category: "Custom joinery",
  },
  {
    src: "/images/portfolio/wardrobe_2.jpg",
    alt: "Four-panel mirrored sliding door wardrobe by A&E Joinery",
    title: "Mirrored sliding wardrobe",
    category: "Wardrobes",
  },
  {
    src: "/images/portfolio/kitchen_gloss_white.jpg",
    alt: "Gloss white kitchen cabinetry during installation",
    title: "Gloss white kitchen",
    category: "Custom joinery",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="eyebrow mb-6">Portfolio</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6 max-w-2xl">
            A few recent jobs,{" "}
            <em className="italic font-normal text-ink-deep">more added as they wrap up.</em>
          </h1>
          <p className="text-paper-dim text-lg max-w-xl">
            This page grows with every job we finish — check back for more, or ask
            to see similar work in your area when you get a quote.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS.map((project) => (
            <div key={project.src} className="group">
              <div className="relative aspect-[4/3] rounded-sharp overflow-hidden border border-line mb-3">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <span className="font-mono text-xs uppercase tracking-wide text-paper-dim">
                {project.category}
              </span>
              <h2 className="font-display font-semibold mt-1">{project.title}</h2>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5 sm:px-8 border-t border-line bg-ink-deep text-white">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-4">Get started</span>
          <h2 className="font-display font-semibold text-3xl mt-4 mb-4 max-w-lg">
            Want something like this in your own space?
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
