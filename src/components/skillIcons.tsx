import type { ReactNode } from "react";
import {
  siArduino, siC, siCplusplus, siDjango, siEspressif, siFastapi,
  siJavascript, siJetpackcompose, siKeras, siKotlin, siMongodb, siNextdotjs,
  siNumpy, siPandas, siPython, siReact, siScikitlearn, siTensorflow,
  siTypescript,
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

  // No logo in the icon set: drawn to match.
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
