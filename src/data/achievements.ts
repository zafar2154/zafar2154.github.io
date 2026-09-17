export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: "certification" | "award";
  description: string;
};

/**
 * Bootcamps, certifications, and competition results.
 * type: "certification" = completed training/program, "award" = competition result.
 */
export const achievements: Achievement[] = [
  {
    id: "dbs-coding-camp-ml",
    title: "DBS Coding Camp — Machine Learning Path",
    issuer: "Dicoding x Bank DBS Indonesia",
    year: "2024",
    type: "certification",
    description:
      "Completed an intensive bootcamp track covering machine learning fundamentals, model building, and deployment.",
  },
  {
    id: "kki-asv-finalist",
    title: "Finalist — Kontes Kapal Indonesia (KKI), ASV Category",
    issuer: "National Competition",
    year: "2024",
    type: "award",
    description:
      "Reached the national final round with an autonomous surface vessel integrating navigation, computer vision, and embedded control.",
  },
];
