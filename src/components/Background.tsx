import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

// Matches .grid-dots' background-size. Dots repeat every cell, so wrapping the
// drift at one cell looks continuous however long the page is.
const DOT_CELL = 22;
const DRIFT_SPEED = 0.12;

/** Site-wide backdrop, fixed behind every section: soft glows, dots, vignette. */
export default function Background() {
  const dotsRef = useRef<HTMLDivElement>(null);

  // Dots drift slower than the content, so scrolling has a little depth.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const setY = gsap.quickSetter(dotsRef.current, "y", "px");
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => setY(-(self.scroll() * DRIFT_SPEED) % DOT_CELL),
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    // h-lvh: stays the same size when a phone's address bar slides away.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh overflow-hidden"
    >
      <div className="ambient-glow absolute inset-0" />
      <div
        ref={dotsRef}
        className="grid-dots absolute inset-x-0 top-0 -bottom-6 opacity-25"
      />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
