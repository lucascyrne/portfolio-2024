'use client';

import Image from 'next/image';
import RoundedButton from '../ui/RoundedButton';
import MoreOptions from '@/public/assets/icons/more-options.svg';
import { FC, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSecretMode } from '@/resources/secret-mode/secret-mode-context';

type HeaderProps = {
  toggleMenu: () => void;
};

const Header: FC<HeaderProps> = ({ toggleMenu }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { isSecretMode } = useSecretMode();

  return (
    <section
      className={`fixed top-0 left-0 w-full z-40 backdrop-blur-lg bg-transparent`}
    >
      <nav className="flex items-center justify-between py-2 px-4">
        <span className="w-10 h-10" />
        <h3
          className={`flex items-center justify-start font-semibold cursor-pointer ${
            isSecretMode || pathname === '/contact'
              ? 'text-white'
              : 'text-black'
          }`}
          onClick={() => push('/')}
        >
          HORIZONTE
          <span className="font-inria text-base ml-1 font-light">
            studio<span className="relative -top-2 text-[10px]">&copy;</span>
          </span>
        </h3>
        <RoundedButton
          icon={<Image src={MoreOptions} alt={'An alt caption'} />}
          onClick={toggleMenu}
        />
      </nav>
    </section>
  );
};

export default Header;
