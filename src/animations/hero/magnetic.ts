import gsap from 'gsap';

export function magneticButton(
  button: HTMLButtonElement,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) {
  const rect = button.getBoundingClientRect();

  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(button, {
    x: x * 0.15,
    y: y * 0.15,
    duration: 0.4,
    ease: 'power3.out',
  });
}

export function resetMagneticButton(button: HTMLButtonElement) {
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.35)',
  });
}
