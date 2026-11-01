import type { ReactNode } from "react";
import {
  siAndroid, siArduino, siC, siCplusplus, siDjango, siEspressif, siExpress,
  siFastapi, siFigma, siGooglecolab, siGsap, siJavascript, siJetpackcompose,
  siKeras, siKotlin, siMongodb, siMqtt, siNextdotjs, siNodered, siNumpy,
  siNvidia, siOpencv, siPandas, siPhp, siPostgresql, siPython, siRaspberrypi,
  siReact, siScikitlearn, siTailwindcss, siTanstack, siTensorflow,
  siTypescript, siYolo,
  type SimpleIcon,
} from "simple-icons";
import type { SkillKey } from "../data/skills";

export type SkillIcon = {
  /** Brand colour (hex without #), used when the tile is hovered or focused. */
  hex: string;
  render: (size: number) => ReactNode;
};

const brand = (icon: SimpleIcon): SkillIcon => ({
  hex: icon.hex,
  render: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  ),
});

/** Line-art glyph, for tools that have no logo in the icon set. */
const glyph = (hex: string, body: ReactNode): SkillIcon => ({
  hex,
  render: (size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {body}
    </svg>
  ),
});

const office = (hex: string, letter: ReactNode) =>
  glyph(hex, (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      {letter}
    </>
  ));

export const skillIcons: Record<SkillKey, SkillIcon> = {
  javascript: brand(siJavascript),
  typescript: brand(siTypescript),
  python: brand(siPython),
  c: brand(siC),
  cpp: brand(siCplusplus),
  kotlin: brand(siKotlin),
  react: brand(siReact),
  nextjs: brand(siNextdotjs),
  django: brand(siDjango),
  fastapi: brand(siFastapi),
  jetpackcompose: brand(siJetpackcompose),
  arduino: brand(siArduino),
  esp32: brand(siEspressif),
  tensorflow: brand(siTensorflow),
  keras: brand(siKeras),
  scikitlearn: brand(siScikitlearn),
  pandas: brand(siPandas),
  numpy: brand(siNumpy),
  mongodb: brand(siMongodb),
  php: brand(siPhp),
  tailwindcss: brand(siTailwindcss),
  gsap: brand(siGsap),
  tanstack: brand(siTanstack),
  express: brand(siExpress),
  postgresql: brand(siPostgresql),
  android: brand(siAndroid),
  raspberrypi: brand(siRaspberrypi),
  jetsonnano: brand(siNvidia),
  mqtt: brand(siMqtt),
  nodered: brand(siNodered),
  opencv: brand(siOpencv),
  yolo: brand(siYolo),
  colab: brand(siGooglecolab),
  figma: brand(siFigma),

  // No logo in the icon set: drawn to match.
  restapi: glyph("4ade80", (
    <>
      <path d="M9 4H8a2 2 0 00-2 2v4a2 2 0 01-2 2 2 2 0 012 2v4a2 2 0 002 2h1" />
      <path d="M15 4h1a2 2 0 012 2v4a2 2 0 002 2 2 2 0 00-2 2v4a2 2 0 01-2 2h-1" />
      <circle cx="12" cy="12" r=".6" fill="currentColor" />
    </>
  )),
  pixhawk: glyph("f2a93b", (
    <>
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M7 7l2.5 2.5M17 7l-2.5 2.5M7 17l2.5-2.5M17 17l-2.5-2.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </>
  )),
  iot: glyph("4ade80", (
    <>
      <path d="M7 16a4 4 0 01-.6-7.95 5.5 5.5 0 0110.7-1A4.5 4.5 0 0117.5 16H7z" />
      <path d="M8 19.5h8M12 16v3.5" />
    </>
  )),
  embedded: glyph("c9814d", (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9.5 3.5V7M14.5 3.5V7M9.5 17v3.5M14.5 17v3.5M3.5 9.5H7M3.5 14.5H7M17 9.5h3.5M17 14.5h3.5" />
    </>
  )),
  sensors: glyph("4ade80", (
    <>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path d="M8.2 8.2a5.4 5.4 0 000 7.6M15.8 8.2a5.4 5.4 0 010 7.6" />
      <path d="M5.4 5.4a9.3 9.3 0 000 13.2M18.6 5.4a9.3 9.3 0 010 13.2" />
    </>
  )),
  controlsystems: glyph("f2a93b", (
    <>
      <rect x="8.5" y="5" width="7" height="6" rx="1" />
      <path d="M3 8h5.5M15.5 8H21M18.5 8v9h-13V8" />
    </>
  )),
  fuzzylogic: glyph("f2a93b", (
    <>
      <path d="M3 19h18" />
      <path d="M3 19l5-12 5 12" />
      <path d="M11 19l5-12 5 12" />
    </>
  )),
  ladderlogic: glyph("4ade80", (
    <path d="M6 3v18M18 3v18M6 8h4M14 8h4M10 6v4M14 6v4M6 16h12" />
  )),
  pcbdesign: glyph("c9814d", (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <circle cx="8" cy="8" r="1.3" />
      <circle cx="16" cy="16" r="1.3" />
      <path d="M9.3 8H13l3 3v3.7" />
      <path d="M7.5 17h2M7.5 14.5H10" />
    </>
  )),
  computervision: glyph("4ade80", (
    <>
      <path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3" />
      <path d="M6 12s2.2-4 6-4 6 4 6 4-2.2 4-6 4-6-4-6-4z" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  )),
  nlp: glyph("f2a93b", (
    <>
      <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9a1.5 1.5 0 01-1.5 1.5H11l-4.5 4v-4h-1A1.5 1.5 0 014 14.5z" />
      <path d="M8 8.5h8M8 11.5h5" />
    </>
  )),
  cnn: glyph("c9814d", (
    <>
      <circle cx="5" cy="8" r="1.7" />
      <circle cx="5" cy="16" r="1.7" />
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
      <circle cx="19" cy="12" r="1.7" />
      <path d="M6.6 7.4l3.8-1.8M6.6 8.7l3.8 2.6M6.6 15.3l3.8-2.6M6.6 16.6l3.8 1.8M13.6 5.9l3.9 5M13.7 12h3.6M13.6 18.1l3.9-5" />
    </>
  )),
  ibmgranite: glyph("0f62fe", (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 16v4M17 18h4" />
    </>
  )),
  matplotlib: glyph("8ea0b8", (
    <>
      <path d="M4 4v16h16" />
      <path d="M7.5 15l3.5-4.5 3 2.5 4.5-6" />
    </>
  )),
  fusion360: glyph("ff6b00", (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </>
  )),
  canva: glyph("00c4cc", (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.6a3.6 3.6 0 100 4.8" />
    </>
  )),
  googleworkspace: glyph("4285f4", (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  )),
  plc: glyph("4ade80", (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7h7" />
      <circle cx="9" cy="12" r=".6" fill="currentColor" />
      <circle cx="12" cy="12" r=".6" fill="currentColor" />
      <circle cx="15" cy="12" r=".6" fill="currentColor" />
      <path d="M8.5 17h7" />
    </>
  )),
  proteus: glyph("f2a93b", (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M5.5 12c1.2-4 2.4-4 3.6 0s2.4 4 3.6 0 2.4-4 3.6 0" />
    </>
  )),
  eagle: glyph("c9814d", (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h4l2 3h4" />
      <path d="M7 15h6" />
      <circle cx="7" cy="9" r="1" />
      <circle cx="17" cy="12" r="1" />
    </>
  )),
  sql: glyph("8ea0b8", (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  )),
  word: office("2b579a", <path d="M7.5 9l2 6 2.5-4.5 2.5 4.5 2-6" />),
  excel: office("21a366", <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />),
  powerpoint: office("d24726", <path d="M9.5 16V8h3.2a2.5 2.5 0 010 5H9.5" />),
};
