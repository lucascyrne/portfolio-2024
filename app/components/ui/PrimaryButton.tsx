'use client';

import { FC, ReactNode, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useButtonAnimation from '@/app/helpers/hooks/useButtonAnimation';
import { animatePageOut } from '@/app/helpers/ui/animations';

type PrimaryButtonProps = {
  value?: string;
  icon?: ReactNode;
  targetUrl?: string;
  onClick?: () => {};
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  value,
  icon,
  targetUrl = '',
  onClick,
}) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useButtonAnimation({
    buttonRef,
    iconRef,
    hoverBgColor: '#DA5D74',
    defaultBgColor: '#B65466',
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    animatePageOut(targetUrl, router); // Use animatePageOut diretamente
  };

  return (
    <button
      ref={buttonRef}
      className='flex items-center justify-center px-6 py-3 gap-2 bg-primary shadow-text rounded-full hover:shadow-md'
      onClick={handleClick}
    >
      {value}
      <span ref={iconRef}>{icon}</span>
    </button>
  );
};

export default PrimaryButton;
