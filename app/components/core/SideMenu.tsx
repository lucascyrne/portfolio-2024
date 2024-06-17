'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Close from '@/public/assets/icons/close.svg';
import Image from 'next/image';
import RoundedButton from '../ui/RoundedButton';

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const CloseIcon = (
    <Image src={Close} alt={'Close Icon'} className='w-[70%] h-auto' />
  );

  useEffect(() => {
    const menu = menuRef.current;

    if (isOpen) {
      gsap.to(menu, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(menu, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.querySelector('.underline');
    const text = e.currentTarget.querySelector('.text');
    if (target && text) {
      gsap.to(target, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.querySelector('.underline');
    const text = e.currentTarget.querySelector('.text');
    if (target && text) {
      gsap.to(target, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
      gsap.to(text, {
        fontFamily: '',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  };

  return (
    <div
      ref={menuRef}
      className='fixed z-50 top-0 right-0 py-2 px-2 w-64 h-full bg-primary opacity-90 shadow-lg transform translate-x-full'
    >
      <div className='flex justify-end'>
        <RoundedButton icon={CloseIcon} onClick={onClose} />
      </div>
      <nav className='flex flex-col items-start justify-star mt-16'>
        <button
          className='flex items-start relative px-4 py-2 w-full text-xl font-normal text-white overflow-hidden'
          onClick={() => handleNavigate('/')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='relative top-1 mr-[2px] align-top text-sm'>01</span>
          <span className='text relative'>Home</span>
          <span className='underline absolute left-0 bottom-0 h-[2px] w-full bg-white transform scale-x-0 origin-left'></span>
        </button>
        <button
          className='flex items-start relative px-4 py-2 w-full text-xl font-normal text-white overflow-hidden'
          onClick={() => handleNavigate('/projects')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='relative top-1 mr-[2px] align-top text-sm'>02</span>
          <span className='text relative'>Projects</span>
          <span className='underline absolute left-0 bottom-0 h-[2px] w-full bg-white transform scale-x-0 origin-left'></span>
        </button>
        <button
          className='flex items-start relative px-4 py-2 w-full text-xl font-normal text-white overflow-hidden'
          onClick={() => handleNavigate('/contact')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className='relative top-1 mr-[2px] align-top text-sm'>03</span>
          <span className='text relative'>Contact</span>
          <span className='underline absolute left-0 bottom-0 h-[2px] w-full bg-white transform scale-x-0 origin-left'></span>
        </button>
      </nav>
    </div>
  );
};

export default SideMenu;
