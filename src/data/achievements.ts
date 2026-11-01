export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "certification" | "award" | "thesis";
  description: string;
  /** Path inside /public/img. Only used for the featured item. */
  image?: string;
  /** Where to verify the achievement, e.g. a certificate page. Optional. */
  link?: string;
  /** The featured item gets the large card. Mark one item at most. */
  featured?: boolean;
};

/**
 * Bootcamps, certifications, awards, and the thesis.
 * type: "certification" = completed training/program, "award" = competition
 * result or recognition, "thesis" = final-year research work.
 */
export const achievements: Achievement[] = [
  {
    id: "kki-asv-finalist",
    title: "Finalist — Kontes Kapal Indonesia (KKI), ASV Category",
    issuer: "National Competition",
    year: "2024",
    type: "award",
    featured: true,
    image: "img/kki.webp",
    description:
      "Reached the national final round with an autonomous surface vessel that combined Jetson Nano and Arduino controllers, YOLO computer vision, and Pixhawk navigation, so the boat could steer itself with no one at the helm.",
  },
  {
    id: "best-head-division",
    title: "Best Head Division Award",
    issuer: "KSM Internet of Things UPNVJ",
    year: "2025",
    type: "award",
    description:
      "Named Most Valuable Person among the division heads for leading the software engineering division, a team of 5 staff trained with a 10-module syllabus I wrote.",
  },
  {
    id: "thesis-water-quality",
    title: "Undergraduate Thesis — Portable Water Quality Monitoring",
    issuer: "UPN Veteran Jakarta",
    year: "2026",
    type: "thesis",
    description:
      "Designed and built a portable IoT device that rates drinking water quality with Fuzzy Mamdani logic at 95.83% accuracy and maps every reading with GPS. Published in the UPNVJ repository.",
  },
  {
    id: "ibm-granite",
    title: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM SkillsBuild",
    year: "2025",
    type: "certification",
    link: "https://www.credly.com/badges/5d42d0ba-283b-4730-a93b-7e83f5e8df88",
    description:
      "Completed an IBM SkillsBuild course on generating and optimizing code with IBM Granite.",
  },
  {
    id: "dbs-coding-camp-ml",
    title: "DBS Foundation Coding Camp 2024",
    issuer: "Dicoding x DBS Foundation",
    year: "2024",
    type: "certification",
    description:
      "Completed the machine learning track: Applied Machine Learning, Machine Learning Intermediate and Basic, Python, and Data Visualization.",
  },
];
