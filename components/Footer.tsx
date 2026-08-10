import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="wordmark mb-3">A&amp;E Joinery</p>
            <p className="text-sm text-paper-dim">
              Custom built-in wardrobes and joinery, made and installed across Sydney.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-paper-dim mb-3">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+61414711741" className="font-semibold hover:text-ink-deep">
                  0414 711 741
                </a>
              </li>
              <li>
                <a href="mailto:anejoinery@gmail.com" className="font-semibold hover:text-ink-deep">
                  anejoinery@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ae.joinery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-ink-deep"
                >
                  @ae.joinery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-paper-dim mb-3">
              Site
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/portfolio" className="font-semibold hover:text-ink-deep">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-semibold hover:text-ink-deep">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="font-semibold hover:text-ink-deep">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-semibold hover:text-ink-deep">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="font-mono text-xs text-paper-dim mt-10">
          © {new Date().getFullYear()} A&amp;E Joinery. Sydney, NSW. Publicly insured.
        </p>
      </div>
    </footer>
  );
}
