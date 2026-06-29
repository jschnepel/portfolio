// Maps a post's topic tags to the site's category accent palette.
// A post takes the accent of its first tag that has a mapping.

export const TOPIC_ACCENTS: Record<string, string> = {
  AI: "#4DA8FF",
  RAG: "#4DA8FF",
  perception: "#4DA8FF",
  research: "#4DA8FF",
  robotics: "#00E5A0",
  controls: "#00E5A0",
  systems: "#F5C344",
  engineering: "#F5C344",
  enterprise: "#F5C344",
  platform: "#F5C344",
  coaching: "#FF6B4A",
};

export const DEFAULT_ACCENT = "#4DA8FF";

export function accentForTags(tags?: string[]): string {
  if (!tags) return DEFAULT_ACCENT;
  for (const tag of tags) {
    if (TOPIC_ACCENTS[tag]) return TOPIC_ACCENTS[tag];
  }
  return DEFAULT_ACCENT;
}
