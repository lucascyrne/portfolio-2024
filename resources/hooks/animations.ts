import gsap from 'gsap';

export const animatePageIn = () => {
  const transitionElement = document.getElementById('transition-element');

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      xPercent: 0,
    })
      .to(transitionElement, {
        xPercent: 100,
        duration: 1.6,
      })
      .to(
        transitionElement,
        {
          // borderTopLeftRadius: '50vh',
          // borderBottomLeftRadius: '50vh',
          duration: 1.2,
        },
        '<'
      );
  }
};

export const animatePageOut = (href: string, router: any) => {
  const animationWrapper = document.getElementById('transition-element');

  if (animationWrapper) {
    const tl = gsap.timeline();

    tl.set(animationWrapper, {
      xPercent: -100,
      // borderTopRightRadius: '50vh',
      // borderBottomRightRadius: '50vh',
      // borderTopLeftRadius: '0',
      // borderBottomLeftRadius: '0',
    })
      .to(animationWrapper, {
        xPercent: 0,
        duration: 1.2,
        onComplete: () => {
          router.push(href);
        },
      })
      .to(
        animationWrapper,
        {
          // borderTopRightRadius: '0',
          // borderBottomRightRadius: '0',
          duration: 0.8,
        },
        '<'
      );
  }
};
