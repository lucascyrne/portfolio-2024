import src from 'gsap/src';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

type MusicContextType = {
  isPlaying: boolean;
  togglePlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlayPause, audioRef }}>
      {children}
      <audio ref={audioRef} src='/assets/mp3/song.mp3' loop />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
