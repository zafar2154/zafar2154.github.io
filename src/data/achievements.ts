export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "certification" | "award" | "thesis";
  description: string;
  /** Path inside /public/img. Only used for the featured item. */
  image?: string;
  /** The featured item gets the large card. Mark one item at most. */
  featured?: boolean;
};

/**
 * Bootcamps, certifications, competition results, and the thesis.
 * type: "certification" = completed training/program, "award" = competition
 * result, "thesis" = final-year research work.
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
      "Reached the national final round with an autonomous surface vessel that combined GPS navigation, computer vision, sensors, and motor control, so the boat could steer itself with no one at the helm.",
  },
  {
    id: "thesis-water-quality",
    title: "Undergraduate Thesis — Portable Water Quality Monitoring",
    issuer: "UPN Veteran Jakarta",
    year: "2026",
    type: "thesis",
    description:
      "Designed and built a portable IoT device that rates drinking water quality with Fuzzy Mamdani logic and maps every reading with GPS.",
  },
  {
    id: "dbs-coding-camp-ml",
    title: "DBS Coding Camp — Machine Learning Path",
    issuer: "Dicoding x Bank DBS Indonesia",
    year: "2024",
    type: "certification",
    description:
      "Completed an intensive bootcamp track covering machine learning fundamentals, model building, and deployment.",
  },
];
