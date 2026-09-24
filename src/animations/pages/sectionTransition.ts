import gsap from 'gsap';

export function setupHeroToAbout() {
  const hero = document.querySelector('.hero-section');
  const about = document.querySelector('.about-section');
  const card = document.querySelector('.hero-card');

  if (!hero || !about || !card) return;

  gsap.to(card, {
    y: 150,
    rotateZ: 3,
    scale: 0.9,
    ease: 'none',

    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      endTrigger: about,
      end: 'top 70%',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}
