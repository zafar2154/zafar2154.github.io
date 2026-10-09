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
    period: "2024",
    type: "organization",
    description:
      "I started in 2024 as a software engineer on the KSM Internet of Things team, building and maintaining tools for the club's IoT projects.",
  },
  {
    id: "asisten-algpro",
    role: "Asisten Laboratorium Algoritma & Pemrograman",
    org: "UPN Veteran Jakarta",
    period: "2024",
    type: "work",
    description:
      "The same year, I became a lab assistant for Algorithms & Programming at UPN Veteran Jakarta, guiding students through the practical sessions.",
  },
  {
    id: "ksm-iot-lead",
    role: "Ketua Software Engineer",
    org: "KSM Internet of Things",
    period: "2025",
    type: "organization",
    description:
      "A year later I was promoted to head of the software engineering division, setting project direction and mentoring junior members.",
  },
  {
    id: "pln-magang",
    role: "Internship — Protection Division",
    org: "PT PLN (Persero)",
    period: "2025",
    type: "work",
    description:
      "In 2025 I interned in the protection division at PLN, working with relay protection schemes and the devices that keep power systems safe.",
  },
  {
    id: "asisten-mekatronika",
    role: "Asisten Laboratorium Mekatronika",
    org: "UPN Veteran Jakarta",
    period: "2025 – 2026",
    type: "work",
    description:
      "From 2025 to 2026 I assisted the Mechatronics lab, guiding students through embedded systems, sensors, and control practicals.",
  },
  {
    id: "heyjong-it-lead",
    role: "Ketua IT Unit",
    org: "Heyjong Community",
    period: "2026",
    type: "organization",
    description:
      "In 2026 I led the IT unit at Heyjong Community, taking care of its digital tools and technical infrastructure.",
  },
  {
    id: "heyjong-eo-lead",
    role: "Ketua Event Organizer",
    org: "Heyjong Community",
    period: "2026",
    type: "organization",
    description:
      "I also led the event organizing team, planning and running the community's programs and activities.",
  },
];
