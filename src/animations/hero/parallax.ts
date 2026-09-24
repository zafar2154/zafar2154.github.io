// animations/hero/parallax.ts

import gsap from 'gsap';

interface ParallaxRefs {
  hero: HTMLElement;
  background: HTMLDivElement;
}

export function setupParallax({ hero, background }: ParallaxRefs) {
  gsap.to(background, {
    y: 160,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
    },
  });

  gsap.to('.hero-left-pins', {
    x: -300,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '30% top',
      scrub: 0.5,
    },
  });

  gsap.to('.hero-right-pins', {
    x: 300,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '30% top',
      scrub: 0.5,
    },
  });
}
