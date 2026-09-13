export type Category =
  | "time"
  | "developers"
  | "design"
  | "calculators"
  | "converters"
  | "images"
  | "spatial"
  | "starters"
  | "extensions";

export type Project = {
  slug: string;
  name: string;
  pitch: string;
  category: Category;
  url: string;
  host: string;
  github: string;
  accent: string;
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "spatial", label: "Spatial" },
  { id: "time", label: "Time" },
  { id: "developers", label: "Developers" },
  { id: "design", label: "Design" },
  { id: "calculators", label: "Calculators" },
  { id: "converters", label: "Converters" },
  { id: "images", label: "Images" },
  { id: "starters", label: "Starters" },
  { id: "extensions", label: "Extensions" },
];

export const PROJECTS: Project[] = [
  {
    slug: "desarrolla",
    name: "Desarrolla",
    pitch: "Sheet-metal unfold — 3D fittings to flat nets with SVG/DXF export.",
    category: "spatial",
    url: "https://desarrolla.pages.dev",
    host: "desarrolla.pages.dev",
    github: "https://github.com/neferpi/desarrolla",
    accent: "#f59e0b",
  },
  {
    slug: "rafterspace",
    name: "RafterSpace",
    pitch: "Live 3D roof framing — hips, jacks, cheek bevels, cut list.",
    category: "spatial",
    url: "https://rafterspace.pages.dev",
    host: "rafterspace.pages.dev",
    github: "https://github.com/neferpi/rafterspace",
    accent: "#84cc16",
  },
  {
    slug: "fishmouth",
    name: "Fishmouth",
    pitch: "Pipe intersections → printable wrap templates for the shop.",
    category: "spatial",
    url: "https://fishmouth.pages.dev",
    host: "fishmouth.pages.dev",
    github: "https://github.com/neferpi/fishmouth",
    accent: "#06b6d4",
  },
  {
    slug: "stamply",
    name: "Stamply",
    pitch: "Unix timestamp converter — epoch ↔ human time, fast and private.",
    category: "time",
    url: "https://stamply-cdm.pages.dev",
    host: "stamply-cdm.pages.dev",
    github: "https://github.com/neferpi/stamply",
    accent: "#38bdf8",
  },
  {
    slug: "cronnest",
    name: "CronNest",
    pitch: "Cron expression explainer with next runs and format converters.",
    category: "developers",
    url: "https://cronnest.pages.dev",
    host: "cronnest.pages.dev",
    github: "https://github.com/neferpi/cronnest",
    accent: "#a78bfa",
  },
  {
    slug: "miltime",
    name: "Miltime",
    pitch: "Military / 24-hour time converter for schedules and ops.",
    category: "time",
    url: "https://miltime-2tu.pages.dev",
    host: "miltime-2tu.pages.dev",
    github: "https://github.com/neferpi/miltime",
    accent: "#34d399",
  },
  {
    slug: "chromanest",
    name: "ChromaNest",
    pitch: "Color palette suite — generate, contrast-check, and export.",
    category: "design",
    url: "https://chromanest.pages.dev",
    host: "chromanest.pages.dev",
    github: "https://github.com/neferpi/chromanest",
    accent: "#f472b6",
  },
  {
    slug: "calcnest",
    name: "CalcNest",
    pitch: "Everyday calculators in one clean nest.",
    category: "calculators",
    url: "https://calcnest-7k5.pages.dev",
    host: "calcnest-7k5.pages.dev",
    github: "https://github.com/neferpi/calcnest",
    accent: "#fbbf24",
  },
  {
    slug: "unitnest",
    name: "UnitNest",
    pitch: "Unit converters for length, mass, temp, and more.",
    category: "converters",
    url: "https://unitnest.pages.dev",
    host: "unitnest.pages.dev",
    github: "https://github.com/neferpi/unitnest",
    accent: "#fb923c",
  },
  {
    slug: "pixnest",
    name: "PixNest",
    pitch: "Convert and compress images in your browser — nothing uploaded.",
    category: "images",
    url: "https://pixnest-e9z.pages.dev",
    host: "pixnest-e9z.pages.dev",
    github: "https://github.com/neferpi/pixnest",
    accent: "#22d3ee",
  },
  {
    slug: "nestkits-launch",
    name: "NestKits Launch",
    pitch: "Free MIT launch starter — landing, waitlist, Stripe stub on Pages.",
    category: "starters",
    url: "https://nestkits-launch.pages.dev",
    host: "nestkits-launch.pages.dev",
    github: "https://github.com/neferpi/nestkits-launch",
    accent: "#c084fc",
  },
  {
    slug: "nestpin",
    name: "NestPin",
    pitch: "Chrome extension — nest & pin ChatGPT + Claude chats locally.",
    category: "extensions",
    url: "https://github.com/neferpi/nestpin",
    host: "",
    github: "https://github.com/neferpi/nestpin",
    accent: "#e879f9",
  },
];
