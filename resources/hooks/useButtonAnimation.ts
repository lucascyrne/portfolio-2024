import { useEffect, RefObject } from 'react';
import gsap from 'gsap';

type UseButtonAnimationProps = {
  buttonRef: RefObject<HTMLButtonElement>;
  iconRef?: RefObject<HTMLElement>;
  hoverBgColor?: string;
  defaultBgColor?: string;
  hoverIconRotation?: number;
  defaultIconRotation?: number;
};

const usePrimaryButtonAnimation = ({
  buttonRef,
  iconRef,
  hoverBgColor = '#DA5D74',
  defaultBgColor = '#B65466',
}: UseButtonAnimationProps) => {
  useEffect(() => {
    const button = buttonRef.current;
    const icon = iconRef?.current;

    if (button) {
      const handleMouseEnter = () => {
        gsap.to(button, { backgroundColor: hoverBgColor, duration: 0.5 });
      };

      const handleMouseLeave = () => {
        gsap.to(button, { backgroundColor: defaultBgColor, duration: 0.5 });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [buttonRef, iconRef, hoverBgColor, defaultBgColor]);
};

export default usePrimaryButtonAnimation;
