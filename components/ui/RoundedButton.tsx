'use client';

import usePrimaryButtonAnimation from '@/resources/hooks/useButtonAnimation';
import { useMusic } from '@/resources/music/music-context';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { IoMdDownload } from 'react-icons/io';
import { IoPlay } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

type RoundedButtonProps = {
  icon?: ReactNode;
  onClick?: () => void;
  isMusic?: boolean;
};

const RoundedButton: FC<RoundedButtonProps> = ({ icon, onClick, isMusic }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    loading,
    isPlaying,
    audioReady,
    togglePlayPause,
    initializeAudioContext,
  } = useMusic();

  usePrimaryButtonAnimation({
    buttonRef,
    hoverBgColor: '#DA5D74',
    defaultBgColor: '#B65466',
  });

  const handleClick = async () => {
    if (isMusic) {
      if (!audioReady) {
        await initializeAudioContext();
      } else {
        togglePlayPause();
      }
    }
    if (onClick) onClick();
  };

  useEffect(() => {
    // Inicializa o contexto de áudio no primeiro clique.
    initializeAudioContext();
  }, [initializeAudioContext]);

  return (
    <button
      ref={buttonRef}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-secondary shadow-sm ${
        isMusic && isPlaying ? 'animate-wave' : ''
      }`}
      onClick={handleClick}
    >
      {loading.togglePlayPause && isMusic ? (
        <span className="text-sm flex items-center justify-center">
          <ClipLoader size={22} />
        </span>
      ) : (
        <>
          {isMusic ? (
            <>
              {!audioReady ? (
                <>
                  <IoMdDownload size={22} />
                </>
              ) : (
                <>
                  {!isPlaying ? (
                    <div className="relative left-[2px]">
                      <IoPlay size={22} />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex relative items-center justify-center p-2 w-full h-full ${
                          isPlaying ? 'animate-wave' : ''
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className={'rotate-180'}
                        >
                          {[...Array(5)].map((_, index) => (
                            <rect
                              key={index}
                              className={`${isPlaying ? `bar bar${index + 1}` : ''}`}
                              x={3 + index * 4}
                              y="4"
                              width="2"
                              height={6 + index * 2}
                              fill="#000000"
                            />
                          ))}
                        </svg>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <span className="flex items-center justify-center text-white">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default RoundedButton;
