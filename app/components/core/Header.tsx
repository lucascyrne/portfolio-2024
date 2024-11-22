'use client';

import Image from 'next/image';
import RoundedButton from '../ui/RoundedButton';
import MoreOptions from '@/public/assets/icons/more-options.svg';
import { FC, useState } from 'react';
import SideMenu from './SideMenu';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  isSecretMode?: boolean;
}

const Header: FC<HeaderProps> = ({
  isSecretMode
}) => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => setIsOpen(!isOpen);

  return (
    <section className='flex relative py-2 px-2 w-full bg-transparent z-40'>
      <nav className='flex items-center justify-between w-full'>
        <span className='w-10 h-10' />
        <h3 className={`flex items-center justify-start font-semibold cursor-pointer ${isSecretMode ? 'text-white' : 'text-black'}`} onClick={() => push('/')}>
          HORIZONTE
          <span className='font-inria text-base ml-1 font-light'>
            studio<span className='relative -top-2 text-[10px]'>&copy;</span>
          </span>
        </h3>
        <RoundedButton
          icon={<Image src={MoreOptions} alt={'An alt caption'} />}
          onClick={openMenu}
        />
      </nav>
      <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
};

export default Header;
