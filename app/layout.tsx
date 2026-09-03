import type { Metadata } from "next";
import { Chakra_Petch, Barlow, Share_Tech_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { BlurredBackground } from "@/components/BlurredBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { Terminal } from "@/components/Terminal";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joey Schnepel",
    template: "%s · Joey Schnepel",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Joey Schnepel",
    url: SITE_URL,
    title: "Joey Schnepel",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Joey Schnepel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joey Schnepel",
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"],
  },
};

/**
 * Person schema. The audience here searches by name, so an explicit machine-readable
 * identity is what lets a search engine tell this Joey Schnepel from any other.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joey Schnepel",
  url: SITE_URL,
  jobTitle: "Software Engineer, AI & Robotics",
  description: SITE_DESCRIPTION,
  alumniOf: "Western Governors University",
  knowsAbout: [
    "Computer Vision",
    "Interactive Digital Characters",
    "Robotics",
    "Explainable AI",
    "Machine Learning",
  ],
  sameAs: ["https://linkedin.com/in/joey-schnepel", "https://github.com/jschnepel"],
};

/**
 * Serialize for embedding in a <script> tag. Every value above is a hardcoded
 * constant today, so nothing can inject — escaping `<` keeps that true if this
 * schema ever starts carrying dynamic content.
 */
const personSchemaJson = JSON.stringify(personSchema).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${barlow.variable} ${shareTechMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personSchemaJson }}
        />
        <ScrollProgress />
        <BlurredBackground />
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Terminal />
      </body>
    </html>
  );
}
