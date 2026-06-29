import type { Metadata } from "next";
import { BentoTile } from "@/components/BentoTile";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Contact" };

const links = [
  {
    label: "Email",
    value: "joeyschnepel@gmail.com",
    href: "mailto:joeyschnepel@gmail.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/joey-schnepel",
    href: "https://linkedin.com/in/joey-schnepel",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/jschnepel",
    href: "https://github.com/jschnepel",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      <p className="section-label mb-6">// contact</p>
      <h1 className="page-title">Contact</h1>
      <p className="page-subtitle">
        Always happy to hear from people. New opportunities, project ideas, or
        just to talk shop. The fastest way to reach me is below.
      </p>

      <div className="max-w-[560px]">
        <BentoTile>
          <div className="space-y-0">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-4 py-5"
                style={{
                  borderBottom:
                    i < links.length - 1
                      ? "0.5px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[#555] transition-colors duration-300 group-hover:text-white"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] text-[#3A3D44] mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-[#888] text-[14px] transition-colors duration-300 group-hover:text-white truncate">
                    {link.value}
                  </p>
                </div>
                <span className="text-[#3A3D44] text-xs transition-all duration-300 group-hover:text-white group-hover:translate-x-1 inline-block shrink-0">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </BentoTile>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
