import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { REGIONS } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

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

const siteUrl = SITE_URL;

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
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Walk-in dressing room with mirrored sliding wardrobe doors and a fluted vanity unit, built by A&E Joinery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
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
    // More specific than LocalBusiness, and still a valid subtype of it.
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: "A&E Joinery",
    description:
      "Custom built-in wardrobes and joinery, measured, built, and installed across Greater Sydney.",
    image: `${siteUrl}/og.jpg`,
    logo: `${siteUrl}/images/logo.png`,
    telephone: "+61414711741",
    email: "anejoinery@gmail.com",
    url: siteUrl,
    // The regions the site actually has pages for, so the markup matches the content.
    areaServed: [
      { "@type": "City", name: "Sydney" },
      ...REGIONS.map((region) => ({
        "@type": "AdministrativeArea",
        name: `${region.name}, Sydney`,
      })),
    ],
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
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVH6CV9LEJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YVH6CV9LEJ');
          `}
        </Script>
      </body>
    </html>
  );
}
