'use client';

import Footer from '../components/core/Footer';
import Header from '../components/core/Header';
import useCustomCursor from '../helpers/hooks/useCustomCursor';
import useRevealText from '../helpers/hooks/useRevealText';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Gowdock from '@/public/assets/icons/gowdock_logo.svg';
import NovoAtacarejo from '@/public/assets/icons/novo_atacarejo_logo.svg';
import LucidDreams from '@/public/assets/icons/lucid_dreams_logo.svg';
import GeniusLine from '@/public/assets/icons/geniusline_icon.svg';
import Lovepay from '@/public/assets/icons/lovepay_icon.svg';

const Work = () => {
  const partners = [Gowdock, NovoAtacarejo, LucidDreams, GeniusLine, Lovepay];
  const extendedPartners = [...partners, ...partners];
  const cursorRef = useCustomCursor();
  useRevealText();

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden'>
      <Header />
      <div ref={cursorRef} className='reveal-cursor'></div>
      <section className='flex flex-col flex-grow w-full lg:h-screen'>
        <div className='flex flex-col lg:flex-row lg:h-1/2'>
          <div className='relative reveal-area lg:w-1/2 lg:min-h-full'>
            <div className='absolute inset-0 flex items-center justify-center reveal-hidden bg-primary'>
              <h3 className='font-inria text-2xl text-white italic under text-center'>
                Still working on this video...
              </h3>
            </div>
            <div className='flex items-center justify-center w-full h-56 lg:min-h-full reveal-visible'>
              <h3 className='font-inria text-2xl italic'>Projects</h3>
            </div>
          </div>

          <div className='w-full lg:w-1/2 lg:h-full'>
            <video className='w-full h-full object-cover' autoPlay loop muted>
              <source
                src='/assets/videos/portfolio-final.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row-reverse lg:h-1/2'>
          <div className='relative reveal-area lg:w-1/2 lg:min-h-full'>
            <div className='absolute inset-0 flex items-center justify-center reveal-hidden bg-white'>
              <h3 className='font-inria text-2xl italic'>
                The best of all time!
              </h3>
            </div>
            <div className='flex items-center justify-center w-full h-56 lg:h-full reveal-visible bg-primary'>
              <h3 className='font-inria text-2xl italic text-white'>
                Customers
              </h3>
            </div>
          </div>

          <div className='flex lg:items-center lg:justify-center w-full lg:w-1/2 md:h-full overflow-hidden'>
            <motion.ul
              className='flex relative items-center justify-center m-0 p-0 gap-24'
              animate={{
                x: ['-105%', '54%'],
                transition: {
                  x: {
                    ease: 'linear',
                    repeat: Infinity,
                    duration: 12,
                  },
                },
              }}
            >
              {extendedPartners.map((partner, index) => (
                <li
                  key={index}
                  className='carousel-item'
                  style={{
                    display: 'flex',
                    flexShrink: '0',
                    width: `${100 / partners.length}%`,
                  }}
                >
                  <Image
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    className='flex items-center justify-center w-32 h-auto'
                  />
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Work;
