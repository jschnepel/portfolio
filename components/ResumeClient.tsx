"use client";

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { ScrollReveal } from "./ScrollReveal";
import { TypewriterLabel } from "./TypewriterLabel";
// ColorBleed removed from resume; keep it calm and scannable
import { Footer } from "./Footer";

/* ==========================================
   DATA
   ========================================== */

const experience = [
  {
    company: "TSMC",
    logo: "/logos/tsmc-logo.png",
    color: "#E4002B",
    role: "Process Engineer",
    location: "Phoenix, AZ",
    date: "Mar 2024 to Present",
    bullets: [
      "Built isolated programs and department web applications to streamline specification/SOP handling and reduce system bloat",
      "Monitored lithography manufacturing; identified and resolved issue wafers; enforced specs and SOPs to support yield, quality, and reliability",
      "Partnered with Mask, Equipment, and Manufacturing teams to analyze data, update SOPs, and implement process enhancements",
      "Aligned internal and external fabs to meet requirements for clients including Nvidia, Apple, AMD, Tesla, and Intel",
    ],
    clients: [
      { name: "NVIDIA", logo: "/logos/nvidia-logo.png", h: 18, mw: 95 },
      { name: "Apple", logo: "/logos/apple-logo.png", h: 22, mw: 20 },
      { name: "AMD", logo: "/logos/amd-logo.svg", h: 18, mw: 75 },
      { name: "Tesla", logo: "/logos/tesla-logo.svg", h: 14, mw: 95 },
      { name: "Intel", logo: "/logos/intel-logo.png", h: 26, mw: 40 },
    ],
  },
  {
    company: "Intel",
    logo: "/logos/intel-logo.png",
    color: "#0071C5",
    role: "IT Specialist",
    location: "Tempe, AZ",
    date: "Nov 2023 to Mar 2024",
    bullets: [
      "Designed and implemented ServiceNow workflows to improve IT support alignment with departmental needs",
      "Troubleshot and resolved hardware, software, and network incidents via the help desk",
      "Maintained infrastructure through backups, updates, and patch management",
      "Generated KPI and SLA reports for performance tracking",
    ],
    clients: [],
  },
  {
    company: "Infosys",
    logo: "/logos/infosys-logo.png",
    color: "#1B77D2",
    role: "Data Analyst / DevOps Engineer",
    location: "Phoenix, AZ",
    date: "Jul 2022 to Mar 2024",
    bullets: [
      "Supported initiatives at Google (GCP), Microsoft (Loop), Intel (ServiceNow), Verizon (AI), CVS (ETL), and Bank of America (cloud)",
      "Built Tableau dashboards and used SQL and Python for analytics and insights",
      "Developed ML models with TensorFlow and scikit-learn; deployed on AWS SageMaker",
      "Built CI/CD and infrastructure with Jenkins, Docker, Kubernetes, and Terraform",
      "Automated workflows with Apache Airflow and Kubernetes to streamline ML operations",
    ],
    clients: [
      { name: "Google", logo: "/logos/google-logo.png", h: 18, mw: 60 },
      { name: "Microsoft", logo: "/logos/microsoft-logo.png", h: 18, mw: 95 },
      { name: "Verizon", logo: "/logos/verizon-logo.png", h: 18, mw: 80 },
      { name: "CVS", logo: "/logos/cvs-logo.png", h: 22, mw: 110 },
      { name: "BofA", logo: "/logos/bofa-logo.svg", h: 22, mw: 110 },
      { name: "Intel", logo: "/logos/intel-logo.png", h: 26, mw: 40 },
    ],
  },
  {
    company: "SAIC",
    logo: "/logos/saic-logo.png",
    color: "#00A3E0",
    role: "Software Engineer / Scrum Master",
    location: "Panama City, FL",
    date: "Internship",
    bullets: [
      "Contributed C++ development and version control on LCAC legacy-system retrofits",
      "Integrated a legacy radar/navigation system into a current LCAC model and delivered supporting documentation",
      "Facilitated Scrum ceremonies; maintained task boards and burndown charts",
      "Assisted with IMS/IMP in Confluence, Jira, and Microsoft Project",
    ],
    clients: [],
    gallery: [
      { src: "/images/saic/landing-craft-air-cushion-lcac-01.jpg", alt: "LCAC hovercraft" },
      { src: "/images/saic/LCAC-55_maneuvers_to_enter_the_well_deck.jpg", alt: "LCAC-55 entering well deck" },
      { src: "/images/saic/200902-N-CD100-1003.avif", alt: "LCAC operations" },
    ],
  },
];

const skills: Record<string, string> = {
  Languages: "Python, Java, C++, SQL, JavaScript, HTML, CSS",
  Web: "React, Vue, Angular, Next.js, RESTful APIs",
  "Cloud & DevOps": "AWS, Docker, Kubernetes, Jenkins, Terraform, Git, GCP, CI/CD",
  "Data & Analytics": "Pandas, NumPy, Matplotlib, BigQuery, Power BI, Tableau",
  "ML Frameworks": "PyTorch, TensorFlow, scikit-learn, OpenCV",
  "Deep Learning": "CNNs, RNNs / LSTMs, Transformers, GANs, Autoencoders, Computer Vision, NLP, Reinforcement Learning",
  "AI Methods": "Adversarial ML & Robustness, Transfer Learning, Fine-Tuning, Model Quantization, Embeddings, RAG, LLMs",
  "MLOps & Tooling": "SageMaker, MLflow, LangChain, Hugging Face, Vector Databases, Airflow",
  "Currently Learning": "Diffusion Models (DDPM / Latent Diffusion), Generative Video",
};

const education: { degree: string; school: string; logo: string; award?: string }[] = [
  { degree: "M.S. Computer Science, AI/ML", school: "Western Governors University", logo: "/logos/wgu-logo.svg", award: "2× Academic Awards of Excellence" },
  { degree: "B.S. Software Engineering", school: "Western Governors University", logo: "/logos/wgu-logo.svg" },
  { degree: "Data Analytics Apprenticeship", school: "New Apprenticeship", logo: "" },
];

const certifications = [
  { name: "AWS Certified Cloud Practitioner", org: "Amazon", year: "2025", logo: "/logos/aws.svg", logoSize: "w-12 h-12" },
  { name: "ITIL 4 Foundation", org: "PeopleCert", year: "2025", logo: "/logos/itil-logo.svg", logoSize: "w-14 h-14" },
  { name: "Data Analytics Apprenticeship", org: "U.S. Department of Labor", year: "2023", logo: "", logoSize: "" },
  { name: "Google Data Analytics", org: "Google", year: "2022", logo: "/logos/google-logo.png", logoSize: "w-10 h-10" },
  { name: "Certified ScrumMaster", org: "Scrum Alliance", year: "2021", logo: "/logos/scrum-alliance-logo.svg", logoSize: "w-12 h-12" },
];

/* ==========================================
   GALLERY IMAGE: tooltip zoom on hover
   ========================================== */

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imgRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Position the popup above and to the right of the cursor
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        ref={imgRef}
        className="relative w-20 h-14 rounded overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          border: hover ? "0.5px solid rgba(0,163,224,0.3)" : "0.5px solid rgba(255,255,255,0.06)",
          boxShadow: hover ? "0 4px 16px rgba(0,163,224,0.1)" : "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-300"
          style={{
            opacity: hover ? 1 : 0.6,
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Tooltip popup, portaled to body so it escapes overflow:hidden */}
      {hover && typeof document !== "undefined" && createPortal(
        <div
          className="fixed pointer-events-none rounded-lg overflow-hidden"
          style={{
            zIndex: 9999,
            left: `${pos.x + 20}px`,
            top: `${pos.y - 160}px`,
            width: "360px",
            height: "240px",
            border: "0.5px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.05)",
            background: "#0D0F12",
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>,
        document.body
      )}
    </>
  );
}

/* ==========================================
   EXPERIENCE CARD
   ========================================== */

function ExperienceCard({
  job,
  onHover,
}: {
  job: (typeof experience)[0];
  onHover?: (color: string | null, x?: number, y?: number) => void;
}) {
  const [hover, setHover] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onHover?.(job.color, e.clientX, e.clientY);
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-lg overflow-hidden cursor-default"
      style={{
        background: hover ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
        border: hover
          ? `0.5px solid ${job.color}25`
          : "0.5px solid rgba(255,255,255,0.06)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover
          ? `0 8px 32px ${job.color}08, 0 0 0 0.5px ${job.color}15`
          : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        onHover?.(null);
      }}
    >
      {/* Cursor-tracking inner glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          background: hover
            ? `radial-gradient(circle 250px at ${glowPos.x}px ${glowPos.y}px, ${job.color}10, transparent 70%)`
            : "transparent",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Left accent */}
      <div
        className="absolute top-0 left-0 w-[3px] h-full transition-all duration-400"
        style={{
          background: job.color,
          boxShadow: hover ? `0 0 12px ${job.color}40` : "none",
        }}
      />

      <div className="py-4 pr-6 pl-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-16 h-16 object-contain shrink-0 transition-opacity duration-300"
            style={{ opacity: hover ? 1 : 0.8 }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between flex-wrap gap-x-4 gap-y-1">
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[16px] text-white">
                {job.role}
              </h3>
              <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#555] uppercase tracking-[1.5px] shrink-0">
                {job.date}
              </span>
            </div>
            <p className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#444] tracking-[1px] mt-0.5">
              {job.location}
            </p>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2.5">
          {job.bullets.map((bullet, j) => (
            <li key={j} className="flex gap-3 text-[13px] leading-[1.7] transition-colors duration-300" style={{ color: hover ? "#AAA" : "#888" }}>
              <span
                className="shrink-0 mt-[9px] w-1 h-1 rounded-full transition-colors duration-300"
                style={{ background: hover ? job.color : "#444" }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Client logos */}
        {job.clients.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center gap-7 mt-5 pt-4"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.04)" }}
          >
            {job.clients.map((c) => (
              <img
                key={c.name}
                src={c.logo}
                alt={c.name}
                title={c.name}
                className="object-contain opacity-50 hover:opacity-90 transition-opacity duration-300 cursor-default"
                style={{ height: `${c.h || 18}px`, maxWidth: `${c.mw || 80}px` }}
              />
            ))}
          </div>
        )}

        {/* Photo gallery */}
        {"gallery" in job && (job as any).gallery?.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center gap-7 mt-5 pt-4"
            style={{ borderTop: "0.5px solid rgba(255,255,255,0.04)" }}
          >
            {(job as any).gallery.map((img: { src: string; alt: string }) => (
              <GalleryImage key={img.src} src={img.src} alt={img.alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   PAGE
   ========================================== */

export function ResumeClient() {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const handleHover = useCallback(
    (color: string | null, x?: number, y?: number) => {
      setHoverColor(color);
      if (x !== undefined && y !== undefined) setHoverPos({ x, y });
    },
    []
  );

  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      {/* ── HEADER ── */}
      <TypewriterLabel text="// resume" />
      <p className="text-[#CCC] text-[15px] leading-[1.85] max-w-[640px] mb-6">
        I&apos;m a software engineer and certified ScrumMaster with a Master&apos;s in
        AI/ML and 4+ years across full-stack development, cloud, DevOps, and data
        analytics. Most of my work has been walking into a messy system at places
        like TSMC, Intel, and Infosys and building the tool or pipeline that makes
        it simpler.
      </p>
      <div className="flex items-center gap-4 flex-wrap mb-16">
        <a
          href="/JoeySchnepelResume.pdf"
          download
          className="inline-flex items-center gap-2.5 font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[1.5px] px-6 py-3 transition-all duration-300 hover:border-white hover:text-white rounded"
          style={{ border: "0.5px solid rgba(255,255,255,0.15)", color: "#999" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </a>
        <span
          className="inline-flex items-center gap-1.5 font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] px-3.5 py-2 rounded"
          style={{ color: "#00E5A0", background: "rgba(0,229,160,0.06)", border: "0.5px solid rgba(0,229,160,0.18)" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secret Clearance
        </span>
      </div>

      {/* ── SKILLS ── */}
      <TypewriterLabel text="// skills" />
      <div
        className="rounded-lg p-7 mb-16"
        style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          {Object.entries(skills).map(([group, list], i) => {
            const learning = group === "Currently Learning";
            return (
              <ScrollReveal key={group} delay={0.05 * (i + 1)}>
                <div>
                  <p
                    className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2 flex items-center gap-1.5"
                    style={{ color: learning ? "#00E5A0" : "#555" }}
                  >
                    {learning && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#00E5A0", boxShadow: "0 0 6px rgba(0,229,160,0.5)" }}
                      />
                    )}
                    {group}
                  </p>
                  <p
                    className="text-[13px] leading-[1.75]"
                    style={{ color: learning ? "#8AA59B" : "#999", fontStyle: learning ? "italic" : "normal" }}
                  >
                    {list}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <TypewriterLabel text="// experience" />
      <div className="space-y-4 mb-16">
        {experience.map((job, i) => (
          <ScrollReveal key={job.company} delay={0.08 * (i + 1)}>
            <ExperienceCard job={job} onHover={handleHover} />
          </ScrollReveal>
        ))}
      </div>

      {/* ── EDUCATION + CERTS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
        {/* Education */}
        <div>
          <TypewriterLabel text="// education" />
          <div className="space-y-5">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.degree} delay={0.06 * (i + 1)}>
                <div className="flex items-start gap-3">
                  {edu.logo && (
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="w-7 h-7 object-contain shrink-0 mt-0.5 opacity-60"
                    />
                  )}
                  <div>
                    <p className="font-[family-name:var(--font-chakra-petch)] font-bold text-[14px] text-white">
                      {edu.degree}
                    </p>
                    <p className="text-[#666] text-[13px] mt-0.5">{edu.school}</p>
                    {edu.award && (
                      <p
                        className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1px] mt-1.5 flex items-center gap-1.5"
                        style={{ color: "#F5C344" }}
                      >
                        <span aria-hidden="true">&#9733;</span>
                        {edu.award}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <TypewriterLabel text="// certifications" />
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} delay={0.06 * (i + 1)}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.org}
                        className={`${cert.logoSize || "w-14 h-14"} object-contain opacity-60`}
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-[#CCC] text-[13px]">{cert.name}</p>
                      <p className="text-[#444] text-[11px]">{cert.org}</p>
                    </div>
                    <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] text-[#444] shrink-0">
                      {cert.year}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
