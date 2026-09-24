import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

/**
 * Subtle 3D tilt + lift that tracks the pointer, for cards and panels.
 * Falls back to a plain hover lift on touch devices / reduced motion.
 */
export function useTilt<T extends HTMLElement>(
  options: { max?: number; scale?: number; lift?: number } = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { max = 8, scale = 1.02, lift = 4 } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(node, "rotationY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "rotationX", { duration: 0.5, ease: "power3.out" });
    const sTo = gsap.quickTo(node, "scale", { duration: 0.4, ease: "power3.out" });
    const liftTo = gsap.quickTo(node, "y", { duration: 0.4, ease: "power3.out" });

    gsap.set(node, { transformPerspective: 700, transformStyle: "preserve-3d" });

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(px * max * 2);
      yTo(-py * max * 2);
    };

    const onEnter = () => {
      sTo(scale);
      liftTo(-lift);
    };
    const onLeave = () => {
      sTo(1);
      xTo(0);
      yTo(0);
      liftTo(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [max, scale, lift]);

  return ref;
}

/** Pulls an element a few pixels toward the cursor — for nav items / small buttons. */
export function useMagnetic<T extends HTMLElement>(strength = 0.35): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * strength);
      yTo((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return ref;
}

/** A tactile press-down/spring-back on click or tap — for any clickable element. */
export function usePressFeedback<T extends HTMLElement>(amount = 0.92): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const onDown = () => gsap.to(node, { scale: amount, duration: 0.15, ease: "power2.out" });
    const onUp = () =>
      gsap.to(node, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.4)" });

    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointerleave", onUp);
    return () => {
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointerleave", onUp);
    };
  }, [amount]);

  return ref;
}
