'use client';

import { useMusic } from '@/app/context/music-context';
import useButtonAnimation from '@/app/helpers/hooks/useButtonAnimation';
import { FC, ReactNode, useRef } from 'react';

type RoundedButtonProps = {
  icon?: ReactNode;
  onClick?: () => void;
  isMusic?: boolean;
};

const RoundedButton: FC<RoundedButtonProps> = ({ icon, onClick, isMusic }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isPlaying, togglePlayPause } = useMusic();

  useButtonAnimation({
    buttonRef,
    hoverBgColor: '#DA5D74',
    defaultBgColor: '#B65466',
  });

  const handleClick = () => {
    if (isMusic) {
      console.log('RoundedButton: Interagindo com o botão de música.');
      togglePlayPause();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-secondary shadow-sm ${
        isMusic && isPlaying ? 'animate-wave' : ''
      }`}
      onClick={handleClick}
    >
      {isMusic ? (
        <div
          className={`flex relative items-center justify-center p-2 w-full h-full ${
            isPlaying ? 'animate-wave' : ''
          }`}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className={'rotate-180'}
          >
            {[...Array(5)].map((_, index) => (
              <rect
                key={index}
                className={`${isPlaying ? `bar bar${index + 1}` : ''}`}
                x={3 + index * 4}
                y='4'
                width='2'
                height={6 + index * 2}
                fill='#000000'
              />
            ))}
          </svg>
        </div>
      ) : (
        icon
      )}
    </button>
  );
};


export default RoundedButton;
