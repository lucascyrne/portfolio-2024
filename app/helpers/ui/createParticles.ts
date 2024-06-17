import gsap from 'gsap';

// Cria partículas e as anima
export function createParticles(container: HTMLElement) {
  const maxOffset = container.clientHeight;
  for (let i = 0; i < 64; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    if (Math.random() < 0.75) {
      // 45% das partículas terão um brilho
      particle.classList.add('glowing');
    }
    particle.style.top = `${Math.random() * maxOffset}px`;
    particle.style.left = `${Math.random() * container.clientWidth}px`;
    container.appendChild(particle);

    animateParticle(particle);
  }
}

// Animação individual de partícula
function animateParticle(particle: HTMLElement) {
  const duration = Math.random() * 12 + 6; // Durations between 60 and 150 seconds

  // Animação comum
  gsap.to(particle, {
    x: `+=${Math.random() * 300 - 150}`,
    y: `+=${Math.random() * 300 - 150}`,
    rotation: `+=${Math.random() * 360}`,
    scale: Math.random() * 0.2 + 0.75,
    repeat: -1,
    yoyo: true,
    duration: duration,
    ease: 'slow',
  });

  if (particle.classList.contains('glowing')) {
    // Piscar para partículas brilhantes
    gsap.to(particle, {
      opacity: 0.2,
      repeat: -1,
      yoyo: true,
      duration: Math.random() * 6 + 3, // Durations between 3 and 9 seconds
    });
  }
}
