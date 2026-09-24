import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function ParallaxDots({
  className = "",
  speed = 18,
  mask = true,
}: {
  /** Extra classes, e.g. to tune opacity per-section. */
  className?: string;
  /** How far the layer drifts (in px) across the section's scroll range. */
  speed?: number;
  /** Fade the dots out toward the edges with a radial mask. */
  mask?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const dots = dotsRef.current;
    if (!wrap || !dots || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dots,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        ref={dotsRef}
        className="grid-dots absolute -inset-x-4 -top-1/4 -bottom-1/4"
        style={
          mask
            ? {
                maskImage:
                  "radial-gradient(ellipse at center, black, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black, transparent 75%)",
              }
            : undefined
        }
      />
    </div>
  );
}
