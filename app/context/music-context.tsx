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
  analyser: AnalyserNode | null;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);


  const togglePlayPause = async () => {
    if (!audioRef.current) {
      console.error("togglePlayPause: audioRef está indisponível.");
      return;
    }
  
    if (!audioCtx) {
      // Criação do AudioContext após o clique do usuário
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
  
      if (!AudioContextClass) {
        console.error("togglePlayPause: Web Audio API não suportada.");
        return;
      }
  
      const context = new AudioContextClass();
      setAudioCtx(context);
      console.log("togglePlayPause: AudioContext criado.");
  
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      setAnalyser(analyserNode);
  
      const source = context.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(context.destination);
      mediaElementSourceRef.current = source;
      console.log("togglePlayPause: AnalyserNode e MediaElementAudioSourceNode configurados.");
    }
  
    if (audioCtx?.state === "suspended") {
      await audioCtx.resume();
      console.log("togglePlayPause: AudioContext ativado.");
    }
  
    if (isPlaying) {
      console.log("Pausando música.");
      audioRef.current.pause();
    } else {
      console.log("Reproduzindo música.");
      audioRef.current.play();
    }
  
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!audioRef.current || !audioRef.current.src || !audioCtx) {
      console.warn("useEffect: O elemento de áudio ou a fonte do áudio não está configurado.");
      return;
    }
  
    console.log("useEffect: Inicializando AudioContext...");
  
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
  
      if (!AudioContextClass) {
        console.error("useEffect: Web Audio API não é suportada neste navegador.");
        return;
      }
  
      const context = new AudioContextClass();
      setAudioCtx(context);
      console.log("useEffect: AudioContext criado.");
  
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256; // Define a resolução da visualização
      setAnalyser(analyserNode);
      console.log("useEffect: AnalyserNode criado com fftSize =", analyserNode.fftSize);
  
      if (!mediaElementSourceRef.current) {
        console.log("useEffect: Conectando MediaElementAudioSourceNode...");
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(analyserNode);
        analyserNode.connect(context.destination);
        mediaElementSourceRef.current = source;
        console.log("useEffect: MediaElementAudioSourceNode conectado.");
      }
  
      return () => {
        console.log("useEffect: Limpando conexões do AudioContext...");
        analyserNode.disconnect();
        mediaElementSourceRef.current?.disconnect();
        context.close();
      };
    }
  }, [audioRef.current?.src, audioCtx]);
  
  return (
    <MusicContext.Provider value={{ isPlaying, togglePlayPause, audioRef, analyser }}>
      {children}
      <audio ref={audioRef} src='assets/mp3/portfolio-song-final.mp3' loop />
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
