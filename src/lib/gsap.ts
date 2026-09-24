import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);

// Respect the user's OS-level reduced-motion preference. Scroll-linked
// parallax, tilt and pop transitions are skipped/simplified when this is
// true; simple opacity fades still run so content isn't left invisible.
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scroll to an element by id, offset for the sticky header. */
export function gsapScrollTo(id: string, offset = -24) {
  const target = document.getElementById(id);
  if (!target) return;
  if (prefersReducedMotion) {
    target.scrollIntoView({ behavior: "auto" });
    return;
  }
  gsap.to(window, {
    duration: 0.9,
    ease: "power3.inOut",
    scrollTo: { y: target, offsetY: -offset },
  });
}

export { gsap, ScrollTrigger, Flip };
