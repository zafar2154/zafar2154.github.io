// animations/hero/parallax.ts

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxRefs {
  hero: HTMLElement;
  background: HTMLDivElement;
}

export function setupParallax({ hero, background }: ParallaxRefs) {
  // background
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

  const pinsTl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '30% top',
      scrub: 0.5,
    },
  });

  pinsTl
    .to(
      '.hero-left-pins',
      {
        x: -300,
        opacity: 0,
        ease: 'none',
      },
      0,
    )
    .to(
      '.hero-right-pins',
      {
        x: 300,
        opacity: 0,
        ease: 'none',
      },
      0,
    );

  // --- HERO CARD: pin sampai tengah section #about, + animasi "napas" saat nempel ---
  const cardEl = document.querySelector<HTMLElement>('.hero-card-intro');
  if (!cardEl) return;

  ScrollTrigger.create({
    id: 'hero-card-pin',
    trigger: cardEl,
    start: '40% center',
    endTrigger: '#about',
    end: 'center center', // lepas pin persis saat titik tengah #about menyentuh atas viewport
    pin: true,
    pinType: 'fixed',
    anticipatePin: 1,
    invalidateOnRefresh: true,
    pinSpacing: false,
    markers: true,
  });
}
