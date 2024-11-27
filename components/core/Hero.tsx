'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';
import Image from 'next/image';
import DownRight from '/public/assets/icons/down-right.svg';
import PrimaryButton from '../ui/PrimaryButton';
import SecretButton from '../ui/SecretButton';
import { useMusic } from '@/resources/music/music-context';

type HeroProps = {
  isSecretMode: boolean;
  setIsSecretMode: Dispatch<SetStateAction<boolean>>;
};

const Hero: FC<HeroProps> = ({ isSecretMode, setIsSecretMode }) => {
  const { changeTrack } = useMusic();

  const handleSecretMode = async () => {
    setIsSecretMode(true);
    await changeTrack('/assets/mp3/portfolio-song-final.mp3');
  };

  return (
    <section
      className={`relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        isSecretMode
          ? 'opacity-0 -translate-y-full'
          : 'opacity-100 translate-y-0'
      } animate-fade-in`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h5 className="text-xsm">SOFTWARE DEVELOPER & DESIGNER</h5>
        <h4 className="font-inria text-2xl italic">Reach new</h4>
        <h5 className="font-inria text-3xl font-bold -mt-4">horizons</h5>
        <div className="flex flex-col items-center justify-center gap-2">
          <PrimaryButton
            value={'A bit of my work'}
            icon={<Image src={DownRight} alt={'An alt caption'} />}
            targetUrl={'/projects'}
          />
          <SecretButton onClick={handleSecretMode} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
