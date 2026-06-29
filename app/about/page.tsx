import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Soccer, a fractured spine, sixteen years of coaching, and the theme park that rerouted my career into AI and edge robotics.",
};

const ACCENT = "#4DA8FF";

type Section = {
  label: string;
  body: string[];
  quote?: string;
};

const sections: Section[] = [
  {
    label: "// the game",
    body: [
      "I started playing soccer when I was three and fell in love with it on the spot. By middle school I was on three teams at once and spending more time on the pitch than I ever did in a classroom. I got lucky and landed on a team run by a former Italian player, and I took in everything he taught. School, on the other hand, never fit me, and back then I had no idea why.",
      "I was never the flashiest or the biggest kid on the field. I was the most technical and the most strategic, and that is what got noticed. By tenth grade I had college programs watching me, not for goals but because I had the most assists in every league I played in. I knew exactly how good I was. I had more looks than some seniors, and I will be honest, I was cocky about it.",
    ],
  },
  {
    label: "// the break",
    body: [
      "Twelfth grade humbled me fast. I fractured my spine at practice, and every offer I had was medically disqualified almost overnight. Soccer had been the entire plan. It was who I was, and I had no backup.",
      "Once I couldn't play, a lot of the friendships that came with the game disappeared too. I got depressed. I didn't know who I was anymore, and I didn't go to college.",
    ],
    quote: "Soccer was the whole plan. Then, in one practice, it wasn't.",
  },
  {
    label: "// the sideline",
    body: [
      "Something kept pulling me back toward the game, so I started coaching. It turned out to be one of the best decisions I have ever made. The things that had made me a good player, reading the field, breaking down technique, thinking two moves ahead, are things you can actually teach. And I learned that aiming that energy outward, into other people instead of into my own game, was far more rewarding than playing had ever been.",
      "I started at the high school level and was quickly hired to coach the varsity team at my old school. I would pick apart each player's technical weaknesses, show them how to fix them, then bring everyone back together around a strategy. The program had gone 5-7 the season before. My first year we went 11-3. Seven of my nine seniors earned scholarships, and one of them turned his down. From there I moved into club soccer and coached a range of ages, and earned my US Soccer National \"D\" coaching license along the way. Coaching is the one thread that never left, sixteen years and counting.",
    ],
  },
  {
    label: "// the long way around",
    body: [
      "For a stretch I was just trying to find what came next. I went back to school for psychology and got most of the way through a degree before admitting it wasn't for me. I looked into physical therapy and got certified through the National Academy of Sports Medicine to test it out, then realized that wasn't it either. So I shifted toward project management.",
      "At the time I was managing a boat club, and one of my favorite members and I got to talking. He found out I was chasing the project management track and offered me a job. He wouldn't say what it was, only that I would be working directly under him. I jumped at it.",
    ],
  },
  {
    label: "// a clearance and a hovercraft",
    body: [
      "Five months later I had a secret clearance and I was helping retrofit Navy hovercraft. The leadership there was the best I have worked under. They pushed me to get my hands dirty in every part of the operation: software, procurement, manufacturing, all of it. The part I kept gravitating to was the software, so they backed me to get Scrum certified. The deeper I went, the more I loved writing it and working through the complexity. I started leaning hard that way.",
      "Then the contract got bought out by another contractor and everyone lost their job. Panama City didn't have much of a tech scene, so it was either go back to small-town work or leave. I chose Phoenix.",
    ],
  },
  {
    label: "// starting over",
    body: [
      "In Phoenix I landed an analytics apprenticeship through the Department of Labor, which got my foot in the door at Infosys and a lot of hands-on work. I started my software engineering degree, and the direction finally felt like mine. The goal got specific: become a software engineer at a company like Amazon, IBM, or Google.",
    ],
  },
  {
    label: "// the missing piece",
    body: [
      "Halfway through my software engineering degree, I finally got an answer to something that had bothered me my whole life. I was describing my struggles to an academic advisor, the way some things clicked instantly and stuck while others would not stay no matter how much I practiced or studied, and he stopped me. He said he had never heard some of what I was describing, and that it might be worth getting checked out. The testing came back with ADHD and three different forms of dyslexia.",
      "It was a strange kind of relief. I wasn't lazy and I wasn't broken. My brain just runs in a particular shape: fast and deep on anything spatial, structural, or strategic, and slow on the rote memorization school is mostly built around. Once I had a name for it, I could learn the strategies to work with it instead of against it, and for the first time school got easier, and honestly enjoyable. The same wiring that let me read a field two moves ahead is what lets me hold a whole system in my head and see how the pieces have to fit. I stopped trying to learn like everyone else and started building on how I actually think.",
    ],
  },
  {
    label: "// the theme park",
    body: [
      "A few years into the industry, I went to a theme park, and it reset the whole plan. I stood in front of the animatronics and the robotics and my mind went somewhere it hadn't before. For years I had been sure I wanted to build large-scale software systems. One afternoon changed that. All I could think about was the intricacy of it, how I would write the code behind those characters, those rides, those systems. I was seeing it all in a completely new light, and it would not let me go.",
      "I went home and enrolled in an AI/ML master's.",
    ],
  },
  {
    label: "// what I'm building toward",
    body: [
      "Now the whole focus is making that pivot real: out of large-scale systems and into edge robotics. Da Vinci and Ballbot are the first steps, characters and machines that notice the specific person in front of them and react like they're alive.",
      "Sixteen years on the sideline taught me to read people and build for the ones actually on the field. That is the exact instinct I am bringing to robots now.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="relative z-10 pt-32 pb-16 max-w-[960px] mx-auto px-8">
      {/* Header */}
      <p
        className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-4"
        style={{ color: ACCENT }}
      >
        // about
      </p>
      <h1 className="page-title leading-tight mb-4">How I got here</h1>
      <p className="text-[#999] text-[17px] leading-[1.7] max-w-[600px] italic">
        Soccer, a fractured spine, sixteen years of coaching, and the theme park that rerouted my
        career.
      </p>
      <span aria-hidden="true" className="block h-px w-16 mt-7 mb-14" style={{ background: ACCENT }} />

      {/* Story */}
      <div className="max-w-[680px]">
        {sections.map((section) => (
          <ScrollReveal key={section.label}>
            <section className="mb-14">
              <h2
                className="font-[family-name:var(--font-share-tech-mono)] text-[11px] uppercase tracking-[2.5px] mb-5"
                style={{ color: ACCENT }}
              >
                {section.label}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="text-[#B6B8BD] text-[15px] leading-[1.9] mb-5">
                  {para}
                </p>
              ))}
              {section.quote && (
                <blockquote
                  className="font-[family-name:var(--font-chakra-petch)] font-bold text-white leading-[1.4] my-8 pl-5"
                  style={{ fontSize: "clamp(18px, 2.2vw, 22px)", borderLeft: `2px solid ${ACCENT}` }}
                >
                  {section.quote}
                </blockquote>
              )}
            </section>
          </ScrollReveal>
        ))}

        {/* Closing CTA */}
        <ScrollReveal>
          <div
            className="rounded-lg p-7 flex items-center justify-between gap-6 flex-wrap"
            style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}22` }}
          >
            <p className="text-[#CCC] text-[14px] leading-[1.7] max-w-[420px]">
              The work is where the story is going next.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/projects"
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] transition-colors duration-300 hover:text-white"
                style={{ color: ACCENT }}
              >
                See the work &rarr;
              </Link>
              <Link
                href="/contact"
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#777] transition-colors duration-300 hover:text-white"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
