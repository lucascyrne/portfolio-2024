'use client';

import PrimaryButton from '@/app/components/ui/PrimaryButton';
import DownRight from '@/public/assets/icons/down_right.svg';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className='flex relative flex-col items-center justify-center w-full h-screen overflow-hidden'>
      <div className='flex z-20 flex-col items-center justify-center'>
        <h5 className='text-xsm'>SOFTWARE DEVELOPER & DESIGNER</h5>
        <h4 className='font-inria text-2xl italic'>Reach new</h4>
        <h3 className='text-3xl -mt-4'>horizons</h3>
        <PrimaryButton
          value={'View my work'}
          icon={<Image src={DownRight} alt={'An alt caption'} />}
          targetUrl={'/projects'}
        />
      </div>
    </section>
  );
};

export default Hero;
