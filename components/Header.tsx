import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/areas-we-serve", label: "Areas We Serve" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-lg">
          <Image src="/images/logo.png" alt="A&E Joinery" width={28} height={16} className="h-6 w-auto invert" />
          <span className="wordmark">A&amp;E Joinery</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          <ul className="flex gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-paper-dim hover:text-ink-deep transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="font-bold text-sm px-4 py-2.5 border border-ink-deep/80 text-ink-deep rounded-sharp hover:bg-ink-deep hover:text-white transition-colors"
          >
            Get a quote
          </Link>
        </nav>
        <Link
          href="/contact"
          className="lg:hidden font-bold text-xs px-3 py-2 border border-ink-deep/80 text-ink-deep rounded-sharp"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
