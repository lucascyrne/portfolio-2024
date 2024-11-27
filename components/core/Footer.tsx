'use client';

import { useMusic } from '@/resources/music/music-context';
import RoundedButton from '../ui/RoundedButton';
import { ClipLoader } from 'react-spinners';

const FooterContact = () => {
  const { audioReady, isPlaying } = useMusic();

  return (
    <section className="fixed bottom-0 left-0 py-2 px-2 w-full bg-transparent z-30">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center justify-self-start gap-2">
          <RoundedButton isMusic />
          {!audioReady && (
            <>
              <p className="hidden sm:flex items-center p-2 text-sm font-inria text-primary gap-2">
                <span className="relative top-[1px]">
                  <ClipLoader size={12} color={'#B65466'} />
                </span>
                Inicializando visualizador de áudio...
              </p>
            </>
          )}
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

export default FooterContact;
