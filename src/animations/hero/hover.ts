// animations/hero/hover.ts

import { gsap } from '../../lib/gsap';

/** Zooms the photo when the card is hovered. Returns a cleanup function. */
export function setupImageHover(card: HTMLDivElement) {
  // Both layers zoom together: after the About story the secondary photo
  // sits on top of the primary one.
  const images = card.querySelectorAll('.hero-image, .hero-image-secondary');

  if (!images.length) return;

  const handleEnter = () => {
    gsap.to(images, {
      scale: 1.06,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    gsap.to(images, {
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  card.addEventListener('mouseenter', handleEnter);
  card.addEventListener('mouseleave', handleLeave);

  return () => {
    card.removeEventListener('mouseenter', handleEnter);
    card.removeEventListener('mouseleave', handleLeave);
  };
}
