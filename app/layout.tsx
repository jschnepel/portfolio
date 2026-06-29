import type { Metadata } from "next";
import { Chakra_Petch, Barlow, Share_Tech_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { BlurredBackground } from "@/components/BlurredBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";
import { Terminal } from "@/components/Terminal";
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
  title: {
    default: "Joey Schnepel",
    template: "%s · Joey Schnepel",
  },
  description:
    "Software engineer with a Master's in AI/ML. Building autonomous systems, ML pipelines, and scalable platforms.",
};

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
