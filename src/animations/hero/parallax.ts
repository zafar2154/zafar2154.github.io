// animations/hero/parallax.ts

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxRefs {
  hero: HTMLElement;
  background: HTMLDivElement;
}

export function setupParallax({ hero, background }: ParallaxRefs) {
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

  // ─── 3. Breathing Animation (hanya menyentuh .hero-card-breathe)
  const breatheTl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
  breatheTl.to('.hero-card-breathe', {
    rotate: 2,
    duration: 1.8,
    ease: 'sine.inOut',
  });

  let resetTween: gsap.core.Tween | undefined;

  const startBreathe = () => {
    resetTween?.kill();
    breatheTl.restart();
  };

  const stopBreathe = () => {
    breatheTl.pause();
    resetTween = gsap.to('.hero-card-breathe', {
      rotate: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  // ─── 4. State awal elemen storytelling ────────────────────────
  gsap.set('.about-inner', { x: -150, opacity: 0 });
  gsap.set('.hero-end-left-pins', { x: -60, opacity: 0 });
  gsap.set('.hero-end-right-pins', { x: 60, opacity: 0 });
  gsap.set('.hero-image-secondary', { opacity: 0 });

  const storyTl = gsap.timeline({
    scrollTrigger: {
      id: 'about-story',
      trigger: '.about-section',
      start: 'center center',
      end: '+=1000',
      pin: true,
      pinSpacing: true,
      scrub: 1,
    },
  });

  storyTl
    .to('.about-inner', {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    })
    .to(
      '.hero-image-secondary',
      { opacity: 1, duration: 1, ease: 'power1.inOut' },
      '-=1',
    )
    .to(
      '.hero-end-left-pins',
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3',
    )
    .to(
      '.hero-end-right-pins',
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '<',
    );

  const storyStart = () => ScrollTrigger.getById('about-story')?.start ?? 0;
  const storyEnd = () => ScrollTrigger.getById('about-story')?.end ?? 1;

  gsap.to(background, {
    y: 200,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: storyStart,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });

  ScrollTrigger.create({
    id: 'hero-bg-pin',
    trigger: '.hero-bg-pin',
    start: storyStart,
    end: storyEnd,
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
  });

  ScrollTrigger.create({
    id: 'hero-card-pin',
    trigger: '.hero-card-pin',
    start: 'center center',
    // berakhir persis di akhir pin about
    end: () => ScrollTrigger.getById('about-story')?.end ?? '+=1',
    pin: true,
    pinSpacing: false,
    invalidateOnRefresh: true,
    onEnter: startBreathe,
    onLeave: stopBreathe,
    onEnterBack: startBreathe,
    onLeaveBack: stopBreathe,
  });
}
