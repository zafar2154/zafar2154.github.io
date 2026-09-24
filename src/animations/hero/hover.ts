// animations/hero/hover.ts

import gsap from 'gsap';

export function handleCardMove(
  card: HTMLDivElement,
  e: React.MouseEvent<HTMLDivElement>,
) {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 5;
  const rotateX = (y / rect.height - 0.5) * -5;

  gsap.to(card, {
    rotateX,
    rotateY,
    scale: 1.02,
    duration: 0.5,
    ease: 'power3.out',
    transformPerspective: 1000,
  });
}

export function handleCardLeave(card: HTMLDivElement) {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.7,
    ease: 'power3.out',
  });
}

export function setupImageHover(card: HTMLDivElement) {
  const image = card.querySelector('.hero-image');

  if (!image) return;

  const handleEnter = () => {
    gsap.to(image, {
      scale: 1.06,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    gsap.to(image, {
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
