export type Category =
  | "time"
  | "developers"
  | "design"
  | "calculators"
  | "converters";

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
  { id: "time", label: "Time" },
  { id: "developers", label: "Developers" },
  { id: "design", label: "Design" },
  { id: "calculators", label: "Calculators" },
  { id: "converters", label: "Converters" },
];

export const PROJECTS: Project[] = [
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
];
