import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on built-in wardrobes and custom joinery from A&E Joinery, Sydney.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow mb-6">Blog</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] mt-6 mb-6 max-w-xl">
            Coming soon.
          </h1>
          <p className="text-paper-dim text-lg max-w-md mb-9">
            We're putting together notes on built-in wardrobes, custom joinery,
            and what to expect from a Sydney reno — check back soon, or get in
            touch directly if you've got a question now.
          </p>
          <Link
            href="/contact"
            className="font-bold text-sm bg-ink-deep text-white px-6 py-3.5 rounded-sharp hover:bg-[#262626] transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
