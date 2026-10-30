import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Respect the user's OS-level reduced-motion preference. Scroll-linked
// parallax, tilt and pop transitions are skipped/simplified when this is
// true; simple opacity fades still run so content isn't left invisible.
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Smooth (eased) wheel scrolling. Touch keeps the native scroll, and
 * reduced-motion users get plain scrolling, so `lenis` is null for them.
 * Lenis is driven by GSAP's ticker so ScrollTrigger pins and scrubs update
 * on the same frame as the scroll.
 */
export const lenis = prefersReducedMotion ? null : new Lenis({ lerp: 0.1 });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  import.meta.hot?.dispose(() => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  });
}

/** Scroll the page to a y position or element, eased when smooth scroll is on. */
export function smoothScrollTo(
  target: number | HTMLElement,
  { offset = 0, duration = 1.1 }: { offset?: number; duration?: number } = {},
) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration });
    return;
  }
  const top =
    typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + offset, behavior: 'auto' });
}

/**
 * Smoothly scroll to a section by id, stopping `offset` px above it.
 * A section that plays a scrubbed story while pinned (a ScrollTrigger with id
 * `<section id>-story`) is scrolled to the end of that pin instead, so it
 * arrives fully revealed rather than halfway through its animation.
 */
export function gsapScrollTo(id: string, offset = 24) {
  const target = document.getElementById(id);
  if (!target) return;
  const story = ScrollTrigger.getById(`${id}-story`);
  if (story) smoothScrollTo(story.end);
  else smoothScrollTo(target, { offset: -offset });
}

export { gsap, ScrollTrigger };
