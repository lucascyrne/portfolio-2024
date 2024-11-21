'use client';

import RoundedButton from '../ui/RoundedButton';

const Footer = () => {
  return (
    <section className='flex relative z-20 py-2 px-2 w-full bg-transparent'>
      <nav className='flex items-center justify-between w-full'>
        <div className='justify-self-start'>
          <RoundedButton isMusic />
        </div>
      </nav>
    </section>
  );
};

export default Footer;
