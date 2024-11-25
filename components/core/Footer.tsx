'use client';

import { useMusic } from '@/resources/music/music-context';
import RoundedButton from '../ui/RoundedButton';

const Footer = () => {
  const { audioReady, isPlaying } = useMusic();

  return (
    <section className="flex relative py-2 px-2 w-full bg-transparent z-30">
      <nav className="flex items-center justify-between w-full ">
        <div className="flex items-center justify-self-start gap-2">
          <RoundedButton isMusic />
          {!audioReady ||
            (!isPlaying && (
              <>
                <span className="font-inria text-sm text-primary animate-bounce">
                  Use fone de ouvido para uma melhor experiência
                </span>
              </>
            ))}
        </div>
      </nav>
    </section>
  );
};

export default Footer;
