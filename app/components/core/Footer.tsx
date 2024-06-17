'use client';

import RoundedButton from '../ui/RoundedButton';
import AudioWave from '@/public/assets/icons/audio_wave.svg';
import Image from 'next/image';
import { useState } from 'react';

const Footer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => setIsOpen(!isOpen);

  return (
    <section className='flex relative z-20 py-2 px-2 w-full bg-white'>
      <nav className='flex items-center justify-between w-full'>
        <div className='justify-self-start'>
          <RoundedButton onClick={openMenu} isMusic />
        </div>
      </nav>
    </section>
  );
};

export default Footer;
