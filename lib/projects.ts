export type ProjectDetail = {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  status: string;
  highlights: string[];
  thumbnail: string;
  liveUrl?: string;
};

export const allProjects: ProjectDetail[] = [
  {
    slug: "davinci",
    thumbnail: "/projects/davinci/hero_corridor.png",
    category: "AI / Robotics",
    title: "Da Vinci",
    description:
      "A real-time Leonardo da Vinci that actually sees the guests in front of it. It reads their gaze and the distinctive things they're wearing, then decides, the way a good host would, who to talk to and what to open with.",
    longDescription:
      "Looking Alive is a real-time, perceptive interactive character. It reads the people in front of it (multi-person tracking, graded gaze and head orientation, open-vocabulary recognition of distinctive details), then makes a good-host judgment about who is open to a moment, what specific detail to open on, and when to wait or earn a distracted guest's attention. Every decision is logged and explainable. The persona is Leonardo da Vinci on purpose: history's greatest observer, so the character's superpower and identity are the same. It runs at ~26 FPS on a single consumer GPU as the Master's phase of a three-part arc toward a robotic, embodied character.",
    tags: ["Computer Vision", "Open-Vocab Detection", "Gaze Estimation", "Real-Time", "Explainable AI"],
    color: "#4DA8FF",
    status: "Active Research",
    highlights: [
      "Real-time multi-person perception and tracking at ~26 FPS on one consumer GPU",
      "Open-vocabulary recognition of distinctive details, not a fixed object list",
      "Graded, directional gaze and head-orientation sensing",
      "Explainable 'good host' decision engine: engage / bid-for-attention / wait",
    ],
  },
  {
    slug: "ballbot",
    thumbnail: "/thumbnails/projects/ballbot.svg",
    category: "Robotics",
    title: "Ballbot",
    description:
      "Most robots have no personality, so I'm building one that does. It's a self-balancing bot with expressive, character-driven behaviors that reacts to the people around it.",
    longDescription:
      "A self-balancing robot built on an inverted pendulum architecture, designed to exhibit character-driven social behaviors inspired by modern animatronics and entertainment robotics. The system uses a cascaded PID control loop running on an NVIDIA Jetson Orin for real-time balance, while a higher-level behavior layer orchestrates social gestures, gaze tracking, and emotional responses. I want a robot that feels alive, not just one that stays upright.",
    tags: ["Jetson Orin", "ROS2", "PID", "Python", "C++", "CUDA"],
    color: "#00E5A0",
    status: "Active Build",
    highlights: [
      "Sub-10ms PID loop on Jetson Orin with real-time IMU fusion",
      "ROS2 node architecture for modular sensor and actuator control",
      "Character behavior layer with state machines for social gestures",
      "Integration path for multimodal perception research",
    ],
  },
  {
    slug: "pixelbrix",
    thumbnail: "/projects/pixelbrix/ui.png",
    liveUrl: "https://pixel-brix.vercel.app/",
    category: "Platform",
    title: "PixelBrix",
    description:
      "Wanted to turn any photo into a buildable brick mosaic. Built an app that maps pixels to real brick colors and generates step-by-step build instructions.",
    longDescription:
      "A web application that converts any image into a buildable brick mosaic with optimized color palettes. Users upload an image, select a grid size and available color palette, and the algorithm maps each pixel region to the nearest available brick color using perceptual color distance (CIEDE2000). The output includes a buildable grid layout, a parts list, and step-by-step assembly instructions.",
    tags: ["React", "Canvas API", "TypeScript", "Algorithms", "Tailwind"],
    color: "#F5C344",
    status: "Shipped",
    highlights: [
      "CIEDE2000 perceptual color distance for accurate palette mapping",
      "Real-time canvas rendering with adjustable grid resolution",
      "Exportable parts list and step-by-step build instructions",
      "Palette optimizer that minimizes unique brick colors needed",
    ],
  },
];

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug) ?? null;
}
