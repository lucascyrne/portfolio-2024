import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

type MusicContextType = {
  isPlaying: boolean;
  togglePlayPause: (newSongSrc?: string) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  analyser: AnalyserNode | null;
  audioReady: boolean;
  loading: Record<string, boolean>;
};

const initialLoadingObject = {
  initializeAudioContext: false,
  connectAudio: false,
  togglePlayPause: false,
};

// Cria o contexto
const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(initialLoadingObject);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [activeAudio, setActiveAudio] = useState(1);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const mediaElementSourceRef = useRef<Map<HTMLAudioElement, MediaElementAudioSourceNode>>(new Map());

  const toggleLoading = useCallback(
    (key: keyof typeof loading, state: boolean) => {
      setLoading((prev) => ({ ...prev, [key]: state }));
    },
    []
  );

  const initializeAudioContext = () => {
    if (!audioInitialized) {
      toggleLoading('initializeAudioContext', true);

      console.log('AudioContext sendo inicializado após interação do usuário...');
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

      if (!AudioContextClass) {
        console.error('Web Audio API não suportada neste navegador.');
        return null;
      }

      const context = new AudioContextClass();

      if (context.state === 'suspended') {
        context.resume().then(() => console.log('AudioContext retomado com sucesso.'));
      }

      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;

      setAudioCtx(context);
      setAnalyser(analyserNode);
      setAudioInitialized(true);
      setAudioReady(true); // Indica que o áudio está pronto
      toggleLoading('initializeAudioContext', false)
      return { context, analyserNode };
    }

    
    return { context: audioCtx, analyserNode: analyser! };
  };

  const connectAudio = (audioElement: HTMLAudioElement | null) => {
    if (audioElement && audioCtx && analyser) {
      if (!mediaElementSourceRef.current.has(audioElement)) {
        toggleLoading('connectAudio', true)
        try {
          const source = audioCtx.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
          mediaElementSourceRef.current.set(audioElement, source);
          toggleLoading('connectAudio', false)
        } catch (error) {
          toggleLoading('connectAudio', false)
          console.error(`Erro ao conectar áudio: ${error}`);
        }
      }
    } else {
      console.warn('Não foi possível conectar o áudio. Certifique-se de que o AudioContext e AnalyserNode estão inicializados.');
    }
    toggleLoading('connectAudio', false)
  };

  const togglePlayPause = async (newSongSrc?: string) => {
    toggleLoading('togglePlayPause', true);
  
    if (!audioInitialized) {
      console.warn('Áudio não inicializado. Inicializando...');
      initializeAudioContext();
    }
  
    const { context, analyserNode } = initializeAudioContext() || {};
    if (!context || !analyserNode) {
      console.warn('AudioContext não inicializado.');
      toggleLoading('togglePlayPause', false);
      return;
    }
  
    const currentAudio = activeAudio === 1 ? audioRef1.current : audioRef2.current;
    const nextAudio = activeAudio === 1 ? audioRef2.current : audioRef1.current;
  
    if (!currentAudio || !nextAudio) {
      console.warn('Elementos de áudio não estão disponíveis.');
      toggleLoading('togglePlayPause', false);
      return;
    }
  
    if (newSongSrc) {
      // Configurar e conectar o novo áudio, se necessário
      const nextAudioSrc = new URL(newSongSrc, window.location.origin).href;
      if (nextAudio.src !== nextAudioSrc) {
        nextAudio.src = nextAudioSrc;
        nextAudio.load(); // Garante o carregamento da nova música
      }
  
      connectAudio(nextAudio);
  
      // Aguarda o áudio estar pronto para tocar
      nextAudio.oncanplay = async () => {
        nextAudio.volume = 0;
        await nextAudio.play();
  
        const fadeDuration = 3000;
        const startTime = Date.now();
  
        const fade = setInterval(() => {
          const elapsed = Date.now() - startTime;
          currentAudio.volume = Math.max(1 - elapsed / fadeDuration, 0);
          nextAudio.volume = Math.min(elapsed / fadeDuration, 1);
  
          if (elapsed >= fadeDuration) {
            clearInterval(fade);
            currentAudio.pause();
            setActiveAudio(activeAudio === 1 ? 2 : 1);
            setIsPlaying(true);
            toggleLoading('togglePlayPause', false);
          }
        }, 100);
      };
  
      return;
    }
  
    // Lógica de play/pause para o áudio atual
    if (isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
    } else {
      connectAudio(currentAudio);
      await currentAudio.play();
      setIsPlaying(true);
    }
  
    toggleLoading('togglePlayPause', false);
  };
  
  
  useEffect(() => {
    return () => {
      mediaElementSourceRef.current.forEach((source) => source.disconnect());
      analyser?.disconnect();
      if (audioCtx?.state !== 'closed') {
        audioCtx?.close().then(() => console.log('AudioContext fechado.'));
      }
    };
  }, [audioCtx, analyser]);

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlayPause, audioRef: activeAudio === 1 ? audioRef1 : audioRef2, analyser, audioReady, loading }}>
      {children}
      <audio ref={audioRef1} src="assets/mp3/song.mp3" loop />
      <audio ref={audioRef2} loop />
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};


