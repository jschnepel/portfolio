export type ChapterStatus = "vision" | "building" | "built" | "next" | "planned";

export interface Chapter {
  id: string;
  num: string;
  name: string;
  literal: string;
  status: ChapterStatus;
  statusLabel: string;
  /** Page description for this chapter's own route — used for <title>, meta and share cards. */
  blurb: string;
  /** Share image for this chapter's route, relative to /public. */
  share: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "vision", num: "00", name: "The Vision", literal: "The Idea",
    status: "vision", statusLabel: "The throughline",
    blurb:
      "One character across four bodies — screen, face, simulation, robot — built on a single bet: engagement feels alive when it is earned and intentional, not constant.",
    share: "/projects/davinci/dashboard.png",
  },
  {
    id: "mind", num: "01", name: "The Mind", literal: "Interaction Models",
    status: "built", statusLabel: "Built & running",
    blurb:
      "The perception and restraint engine, running today at ~26 FPS on one consumer GPU. It commits to at most one person, or deliberately waits — and every call, including every restraint, is re-derivable from the log.",
    share: "/projects/davinci/dashboard.png",
  },
  {
    id: "face", num: "02", name: "The Face", literal: "Expressive Character",
    status: "building", statusLabel: "Building now",
    blurb:
      "Giving the mind a face: a cartoon Leonardo grounded in his own self-portrait, animated deterministically from the logged decision, plus a GAGAvatar 3D head and the honest limits it hit.",
    share: "/projects/davinci/face/davinci_cartoon_beats_poster.jpg",
  },
  {
    id: "bridge", num: "03", name: "The Bridge", literal: "Sim-to-Real",
    status: "next", statusLabel: "Next build",
    blurb:
      "Crossing from simulation to hardware: expressive motion authored in sim that still reads as alive once real actuators, joint limits and a safety envelope are in the way.",
    share: "/projects/davinci/dashboard.png",
  },
  {
    id: "body", num: "04", name: "The Body", literal: "Live Robot",
    status: "planned", statusLabel: "Planned",
    blurb:
      "The character fully embodied — perception, expressive face and proven sim-to-real motion running on a physical robot that shares a real space with guests.",
    share: "/projects/davinci/dashboard.png",
  },
];

/** Canonical path for a chapter. Chapter 00 is the case study's root URL. */
export function chapterHref(id: string): string {
  return id === "vision" ? "/projects/davinci" : `/projects/davinci/${id}`;
}

export function getChapter(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export interface TeaserContent {
  tagline: string;
  proves: string;
  goal: string;
  build: string[];
  hero: { label: string; ratio?: string };
  visuals: { label: string }[];
}

export const TEASERS: Record<string, TeaserContent> = {
  bridge: {
    tagline: "Cross from simulation to hardware.",
    proves:
      "Expressive motion is easy to author in a simulator and hard to trust on real actuators. This phase builds the bridge: performances designed and tested in sim, then transferred to hardware that has to obey physics, joint limits, and safety, without losing the believability that makes it read as Leonardo.",
    goal: "A move authored in sim plays back on the hardware and still feels alive.",
    build: [
      "Physics simulation of the head and neck, then the full body",
      "Domain randomization to close the sim-to-real gap",
      "Motion retargeting from authored performance to real actuator limits",
      "A safety envelope that holds with guests in arm's reach",
    ],
    hero: { label: "simulation viewport", ratio: "16 / 10" },
    visuals: [{ label: "sim ↔ real split-screen" }, { label: "actuator tracking plot" }, { label: "safety envelope map" }],
  },
  body: {
    tagline: "The character, fully embodied.",
    proves:
      "Everything converges: the perception-and-decision engine, the expressive face, and proven sim-to-real motion, running on a physical robot that shares a real space with guests. A character that notices the specific person in front of it, then turns, leans, and plays to them with a body.",
    goal: "Someone forgets, for a second, that it's a machine.",
    build: [
      "A physical platform built for expressive, safe motion",
      "On-board, real-time perception and decision-making",
      "Whole-of-character motion: gaze, posture, and gesture together",
      "Live interaction with guests in a public space",
    ],
    hero: { label: "robot concept render", ratio: "16 / 10" },
    visuals: [{ label: "system architecture diagram" }, { label: "live deployment shot" }, { label: "motion study frames" }],
  },
};
