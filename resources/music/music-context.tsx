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

  const initializeAudioContext = useCallback((onReady?: () => void) => {
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
      setAudioReady(true);
  
      console.log('AudioContext e AnalyserNode inicializados.');
      if (onReady) onReady(); // Executa callback se fornecido
      toggleLoading('initializeAudioContext', false);
  
      return { context, analyserNode };
    }
  
    return { context: audioCtx, analyserNode: analyser! };
  }, [audioInitialized, toggleLoading, audioCtx, analyser]);

  const connectAudio = useCallback(
    (audioElement: HTMLAudioElement | null) => {
      if (audioElement && audioCtx && analyser) {
        if (!mediaElementSourceRef.current.has(audioElement)) {
          toggleLoading('connectAudio', true);
          try {
            const source = audioCtx.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            mediaElementSourceRef.current.set(audioElement, source);
            toggleLoading('connectAudio', false);
          } catch (error) {
            toggleLoading('connectAudio', false);
            console.error(`Erro ao conectar áudio: ${error}`);
          }
        }
      } else {
        console.warn(
          'Não foi possível conectar o áudio. Certifique-se de que o AudioContext e AnalyserNode estão inicializados.'
        );
      }
    },
    [audioCtx, analyser, toggleLoading]
  );
  
  const togglePlayPause = useCallback(
    async (newSongSrc?: string) => {
      // Inicialize o contexto de áudio, se necessário
      const { context, analyserNode } = initializeAudioContext() || {};
      if (!context || !analyserNode) {
        console.warn('AudioContext não inicializado.');
        return;
      }
  
      const currentAudio = activeAudio === 1 ? audioRef1.current : audioRef2.current;
      const nextAudio = activeAudio === 1 ? audioRef2.current : audioRef1.current;
  
      if (!currentAudio || !nextAudio) {
        console.warn('Elementos de áudio não estão disponíveis.');
        return;
      }
  
      if (newSongSrc) {
        const nextAudioSrc = new URL(newSongSrc, window.location.origin).href;
        if (nextAudio.src !== nextAudioSrc) {
          nextAudio.src = nextAudioSrc;
          nextAudio.load();
        }
  
        connectAudio(nextAudio);
  
        nextAudio.oncanplay = async () => {
          nextAudio.volume = 1;
          await nextAudio.play();
          currentAudio.pause();
          setActiveAudio(activeAudio === 1 ? 2 : 1);
          setIsPlaying(true);
        };
  
        return;
      }
  
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        connectAudio(currentAudio);
        await currentAudio.play();
        setIsPlaying(true);
      }
    },
    [initializeAudioContext, connectAudio, activeAudio, isPlaying]
  );
  
  
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


