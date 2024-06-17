'use client';

import { useMusic } from '@/app/context/musicContext';
import useButtonAnimation from '@/app/helpers/hooks/useButtonAnimation';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

type RoundedButtonProps = {
  icon?: ReactNode;
  onClick?: () => void;
  isMusic?: boolean;
};

const RoundedButton: FC<RoundedButtonProps> = ({ icon, onClick, isMusic }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, togglePlayPause } = useMusic();

  useButtonAnimation({
    buttonRef,
    iconRef,
    hoverBgColor: '#DA5D74',
    defaultBgColor: '#B65466',
  });

  const handleClick = () => {
    if (isMusic) {
      togglePlayPause();
    }
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  if (isMusic)
    return (
      <button
        ref={buttonRef}
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-secondary shadow-sm ${
          isPlaying ? 'animate-wave' : ''
        }`}
        onClick={handleClick}
      >
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
            <rect
              className={`${isPlaying ? 'bar bar1' : ''}`}
              x='3'
              y='4'
              width='2'
              height='6'
              fill='#000000'
            />
            <rect
              className={`${isPlaying ? 'bar bar2' : ''}`}
              x='7'
              y='4'
              width='2'
              height='12'
              fill='#000000'
            />
            <rect
              className={`${isPlaying ? 'bar bar3' : ''}`}
              x='11'
              y='4'
              width='2'
              height='10'
              fill='#000000'
            />
            <rect
              className={`${isPlaying ? 'bar bar4' : ''}`}
              x='15'
              y='4'
              width='2'
              height='14'
              fill='#000000'
            />
            <rect
              className={`${isPlaying ? 'bar bar5' : ''}`}
              x='19'
              y='4'
              width='2'
              height='8'
              fill='#000000'
            />
          </svg>
        </div>
        <audio ref={audioRef} src='/assets/mp3/song.mp3' loop />
      </button>
    );

  return (
    <button
      ref={buttonRef}
      className={
        'flex items-center justify-center w-10 h-10 rounded-full bg-secondary shadow-sm'
      }
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default RoundedButton;
