export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  type: "work" | "organization";
  description: string;
};

/**
 * Combined work + organizational experience, ordered chronologically
 * (oldest first). `type` controls the icon/color used in the timeline:
 * "work" = campus/paid role, "organization" = student org / community role.
 */
export const experience: ExperienceItem[] = [
  {
    id: "ksm-iot-staff",
    role: "Staff Software Engineer",
    org: "KSM Internet of Things",
    period: "2023 – 2024",
    type: "organization",
    description:
      "I joined KSM Internet of Things at the end of 2023 as a software engineer, working on the club's web and IoT projects.",
  },
  {
    id: "asisten-algpro",
    role: "Algorithm and Programming Lab Assistant",
    org: "UPN Veteran Jakarta",
    period: "2024",
    type: "work",
    description:
      "In 2024 I became a lab assistant for Algorithm and Programming, designing the learning curriculum and guiding 80+ electrical engineering students through C and Python fundamentals, including Matplotlib and Pandas for data analysis.",
  },
  {
    id: "ksm-iot-lead",
    role: "Head of Software Engineering Division",
    org: "KSM Internet of Things",
    period: "2025 – 2026",
    type: "organization",
    description:
      "A year later I became head of the division, leading 5 staff and writing a 10-module syllabus to train them in software and IoT development. At KSM IoT I delivered the club website, the web dashboard for the autonomous surface vessel, and a website with machine learning for an automated urine system.",
  },
  {
    id: "asisten-mekatronika",
    role: "Mechatronics Lab Assistant",
    org: "UPN Veteran Jakarta",
    period: "2025 – 2026",
    type: "work",
    description:
      "From 2025 to 2026 I taught PLC fundamentals and ladder diagram programming to 150+ electrical engineering students across 10 practicum sessions per semester, and wrote Module 1 of the practicum curriculum every semester.",
  },
  {
    id: "pln-magang",
    role: "Intern, Protection Division",
    org: "PT PLN (Persero)",
    period: "2025",
    type: "work",
    description:
      "In 2025 I interned in the protection division at PLN, studying electrical protection systems, occupational health and safety (K3), and the working environment at PLN.",
  },
  {
    id: "heyjong-eo-lead",
    role: "Head of Event Organizer Division",
    org: "Heyjong Community",
    period: "2026",
    type: "organization",
    description:
      "In 2026 I led 11 staff at Heyjong Community, running weekly community events and 4 major events, including community service and science teaching for children.",
  },
];
