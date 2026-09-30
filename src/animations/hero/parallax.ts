// animations/hero/parallax.ts

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxRefs {
  hero: HTMLElement;
  background: HTMLDivElement;
}

export function setupParallax({ hero, background }: ParallaxRefs) {
  // ─── 1. Background Parallax ───────────────────────────────────
  gsap.to(background, {
    y: 200,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
    },
  });

  // ─── 2. Pin Kiri & Kanan Awal Fade Out saat Scroll ────────────
  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '20% top',
        scrub: 0.5,
      },
    })
    .to('.hero-left-pins', { x: -200, opacity: 0, ease: 'none' }, 0)
    .to('.hero-right-pins', { x: 200, opacity: 0, ease: 'none' }, 0);

  // ─── 3. Breathing Animation pada Card ────────────────────────
  const breatheTl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
  breatheTl.to('.hero-card', {
    rotate: 2,
    duration: 1.8,
    ease: 'sine.inOut',
  });

  const resetCard = () => {
    breatheTl.pause();
    gsap.to('.hero-card', {
      boxShadow:
        '0 0 0 1px rgba(201,129,77,0.35), 0 0 24px -6px rgba(201,129,77,0.45)',
      scale: 1,
      rotate: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  // ─── 4. TAHAP 1: Pin Hero Card Sampai Tengah .about-section ──
  const cardEl = document.querySelector<HTMLElement>('.hero-card-intro');
  if (cardEl) {
    ScrollTrigger.create({
      id: 'hero-card-pin',
      trigger: cardEl,
      start: 'center center',
      endTrigger: '#about',
      end: 'center center',
      pin: true,
      pinType: 'transform', // PENTING: Mencegah bug/blink akibat CSS Grid
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => breatheTl.play(),
      onLeaveBack: () => resetCard(),
    });
  }

  // ─── 5. TAHAP 2: Full-Page Pin & Storytelling Sequence ────────
  // State awal elemen sebelum animasi dimulai
  gsap.set('.about-section', { x: -150, opacity: 0 });
  gsap.set('.hero-end-left-pins', { x: -60, opacity: 0 });
  gsap.set('.hero-end-right-pins', { x: 60, opacity: 0 });
  gsap.set('.hero-image-secondary', { opacity: 0 });

  const websitePinTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-section',
      start: '60% center', // Terpemicu saat .about-section di tengah layar
      end: '+=1000', // Jarak scroll penahanan layar
      pin: hero, // Pin seluruh hero container
      pinSpacing: true,
      scrub: 1, // Animasi mulus terikat scroll mouse
      markers: true,
      onLeave: () => resetCard(),
      onEnterBack: () => breatheTl.play(),
    },
  });

  websitePinTl
    .to('.about-section', {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })

    .to(
      '.hero-image-secondary',
      {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      },
      '-=1',
    )

    .to(
      '.hero-end-left-pins',
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3',
    )

    .to(
      '.hero-end-right-pins',
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      '<',
    );
}
