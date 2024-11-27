'use client';

import { FC, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import usePrimaryButtonAnimation from '@/resources/hooks/useButtonAnimation';

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

  usePrimaryButtonAnimation({
    buttonRef,
    iconRef,
    hoverBgColor: '#E06A7F',
    defaultBgColor: '#B65466',
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      className="flex items-center justify-center px-6 py-3 gap-2 bg-primary rounded-full shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      {value}
      <span ref={iconRef}>{icon}</span>
    </button>
  );
};

export default PrimaryButton;
