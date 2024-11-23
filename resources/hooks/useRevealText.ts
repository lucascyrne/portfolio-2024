import { useEffect } from 'react';
import gsap from 'gsap';

const useRevealText = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const revealAreas = document.querySelectorAll('.reveal-area');

      revealAreas.forEach((area) => {
        const rect = area.getBoundingClientRect();
        const hiddenText = area.querySelector('.reveal-hidden') as HTMLElement;

        if (hiddenText) {
          const clipPath = `circle(180px at ${e.clientX - rect.left}px ${
            e.clientY - rect.top
          }px)`;
          gsap.to(hiddenText, { clipPath });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export default useRevealText;
