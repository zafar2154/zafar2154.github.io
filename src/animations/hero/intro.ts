import gsap from 'gsap';

export function desktopIntro() {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  tl.from('.hero-label', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  })
    .from(
      '.hero-title-line',
      {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.25',
    )
    .from(
      '.hero-focus',
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.45',
    )
    .from(
      '.hero-intro',
      {
        y: 25,
        opacity: 0,
        duration: 0.7,
      },
      '-=0.4',
    )
    .from(
      '.hero-button',
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      '-=0.35',
    )
    .from(
      '.hero-status',
      {
        y: 15,
        opacity: 0,
        duration: 0.5,
      },
      '-=0.35',
    )
    .from(
      '.hero-card',
      {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 1,
      },
      '-=0.7',
    )
    .from(
      '.hero-left-pin',
      {
        x: -35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      },
      '-=0.65',
    )
    .from(
      '.hero-right-pin',
      {
        x: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      },
      '<',
    );

  return tl;
}

export function mobileIntro() {
  const tl = gsap.timeline();

  tl.from('.hero-label', {
    y: 15,
    opacity: 0,
    duration: 0.5,
  })
    .from(
      '.hero-title-line',
      {
        yPercent: 100,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
      },
      '-=0.2',
    )
    .from(
      '.hero-focus',
      {
        y: 15,
        opacity: 0,
        duration: 0.5,
      },
      '-=0.25',
    )
    .from(
      '.hero-intro',
      {
        y: 15,
        opacity: 0,
        duration: 0.5,
      },
      '-=0.25',
    )
    .from(
      '.hero-button',
      {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
      },
      '-=0.2',
    )
    .from(
      '.hero-status',
      {
        y: 10,
        opacity: 0,
        duration: 0.4,
      },
      '-=0.25',
    )
    .from(
      '.hero-card',
      {
        y: 25,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
      },
      '-=0.3',
    );

  return tl;
}