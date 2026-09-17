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
      "Joined the software development team, building and maintaining IoT-related tools and projects for the club.",
  },
  {
    id: "asisten-algpro",
    role: "Asisten Laboratorium Algoritma & Pemrograman",
    org: "UPN Veteran Jakarta",
    period: "2024",
    type: "work",
    description:
      "Assisted teaching and mentoring students through practical sessions of the Algorithms & Programming course.",
  },
  {
    id: "ksm-iot-lead",
    role: "Ketua Software Engineer",
    org: "KSM Internet of Things",
    period: "2025",
    type: "organization",
    description:
      "Promoted to lead the software engineering division — overseeing project direction and mentoring junior members.",
  },
  {
    id: "pln-magang",
    role: "Internship — Protection Division",
    org: "PT PLN (Persero)",
    period: "2025",
    type: "work",
    description:
      "Interned in the protection systems division, working with relay protection schemes and power system safety devices.",
  },
  {
    id: "asisten-mekatronika",
    role: "Asisten Laboratorium Mekatronika",
    org: "UPN Veteran Jakarta",
    period: "2025 – 2026",
    type: "work",
    description:
      "Assisted the Mechatronics lab course, guiding students through embedded systems, sensors, and control practicals.",
  },
  {
    id: "heyjong-it-lead",
    role: "Ketua IT Unit",
    org: "Heyjong Community",
    period: "2026",
    type: "organization",
    description:
      "Led the community's IT unit, overseeing its digital tools and technical infrastructure.",
  },
  {
    id: "heyjong-eo-lead",
    role: "Ketua Event Organizer",
    org: "Heyjong Community",
    period: "2026",
    type: "organization",
    description:
      "Led the event organizing team, planning and running the community's programs and activities.",
  },
];
