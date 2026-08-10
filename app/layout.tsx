import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Single type family for everything but the wordmark and the eyebrow labels:
// headings, body copy, buttons, and nav all pull from this one variable at
// different weights, per the site's type scale.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
// Fallback for the "A&E Joinery" wordmark: Rockwell Extra Bold is a commercial
// Monotype font we can't bundle, so it's declared first and used wherever a
// visitor already has it installed (common on Windows/Office). Roboto Slab at
// a heavy weight is the closest open substitute for everyone else.
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aejoinery.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "A&E Joinery | Custom Wardrobes & Joinery, Sydney",
    template: "%s | A&E Joinery",
  },
  description:
    "A&E Joinery builds and installs custom built-in wardrobes with sliding doors across Sydney, with a fixed-price quote before work starts and a 5 year workmanship warranty.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "A&E Joinery",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "A&E Joinery",
    image: `${siteUrl}/images/logo.png`,
    telephone: "+61414711741",
    email: "anejoinery@gmail.com",
    url: siteUrl,
    areaServed: {
      "@type": "City",
      name: "Sydney",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    sameAs: ["https://www.instagram.com/ae.joinery"],
  };

  return (
    <html
      lang="en-AU"
      className={`${manrope.variable} ${plexMono.variable} ${robotoSlab.variable}`}
    >
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
