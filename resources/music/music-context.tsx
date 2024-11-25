import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type MusicContextType = {
  isPlaying: boolean;
  togglePlayPause: (newSongSrc?: string) => void;
  initializeAudioContext: () => void;
  changeTrack: (newTrackSrc: string) => void;
  audioRef1: React.RefObject<HTMLAudioElement>;
  audioRef2: React.RefObject<HTMLAudioElement>;
  analyser: AnalyserNode | null;
  audioReady: boolean;
  loading: Record<string, boolean>;
};

const initialLoadingObject = {
  initializeAudioContext: false,
  connectAudio: false,
  togglePlayPause: false,
  changeTrack: false,
};

// Cria o contexto
const MusicContext = createContext<MusicContextType | undefined>(undefined);

const useMusicState = () => {
  const [loading, setLoading] = useState(initialLoadingObject);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [activeAudio, setActiveAudio] = useState(1);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const mediaElementSourceRef = useRef<
    Map<HTMLAudioElement, MediaElementAudioSourceNode>
  >(new Map());

  const toggleLoading = useCallback(
    (key: keyof typeof loading, state: boolean) => {
      setLoading((prev) => ({ ...prev, [key]: state }));
    },
    []
  );

  const initializeAudioContext = useCallback(async () => {
    if (audioInitialized) return;

    toggleLoading('initializeAudioContext', true);
    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      // Configura o AnalyserNode
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256; // Ajuste conforme necessário
      setAnalyser(analyserNode);

      // Conecta o áudio ao analyser
      const connectAudio = (audio: HTMLAudioElement | null) => {
        if (!audio || !audioCtxRef.current || !analyserNode) return;

        let source = mediaElementSourceRef.current.get(audio);
        if (!source) {
          source = audioCtxRef.current.createMediaElementSource(audio);
          mediaElementSourceRef.current.set(audio, source);
        }

        source.connect(analyserNode);
        analyserNode.connect(audioCtxRef.current.destination);
      };

      // Conectar o analyser a ambos os áudios
      connectAudio(audioRef1.current);
      connectAudio(audioRef2.current);

      setAudioInitialized(true);
      setAudioReady(true);
    } finally {
      toggleLoading('initializeAudioContext', false);
    }
  }, [audioInitialized]);

  const changeTrack = useCallback(
    async (newTrackSrc: string) => {
      toggleLoading('changeTrack', true);
      try {
        // Pausar o áudio ativo
        const currentAudio =
          activeAudio === 1 ? audioRef1.current : audioRef2.current;
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0; // Opcional: resetar para o início do áudio
        }

        // Configurar e tocar o próximo áudio
        const nextAudio =
          activeAudio === 1 ? audioRef2.current : audioRef1.current;
        if (!nextAudio) return;

        nextAudio.src = newTrackSrc;
        await nextAudio.load();
        await nextAudio.play();

        // Atualizar o áudio ativo
        if (audioCtxRef.current && analyser) {
          const source = mediaElementSourceRef.current.get(nextAudio);
          if (source) {
            source.connect(analyser);
            analyser.connect(audioCtxRef.current.destination);
          }
        }

        setActiveAudio(activeAudio === 1 ? 2 : 1);
        setIsPlaying(true);
      } finally {
        toggleLoading('changeTrack', false);
      }
    },
    [activeAudio, analyser]
  );

  const togglePlayPause = useCallback(async () => {
    if (!audioReady) return;

    const currentAudio =
      activeAudio === 1 ? audioRef1.current : audioRef2.current;

    if (isPlaying) {
      currentAudio?.pause();
      setIsPlaying(false);
    } else {
      await currentAudio?.play();
      setIsPlaying(true);
    }
  }, [audioReady, activeAudio, isPlaying]);

  // useEffect(() => {
  //   const unlockAudio = () => {
  //     if (!audioCtx || audioInitialized) return;

  //     // Cria um buffer vazio
  //     const buffer = audioCtx.createBuffer(1, 1, 22050);
  //     const source = audioCtx.createBufferSource();
  //     source.buffer = buffer;

  //     // Conecta ao destino (alto-falantes)
  //     source.connect(audioCtx.destination);

  //     // Toca o som silencioso
  //     source.start(0);

  //     console.log('Áudio desbloqueado.');
  //     setAudioInitialized(true);

  //     // Remove o listener após desbloquear o áudio
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };

  //   window.addEventListener('touchstart', unlockAudio, false);

  //   return () => {
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };
  // }, [audioCtx, audioInitialized]);

  // useEffect(() => {
  //   const unlockAudio = () => {
  //     if (!audioCtx || audioInitialized) return;

  //     const buffer = audioCtx.createBuffer(1, 1, 22050);
  //     const source = audioCtx.createBufferSource();
  //     source.buffer = buffer;
  //     source.connect(audioCtx.destination);
  //     source.start(0);

  //     // Inicializa e conecta o AnalyserNode
  //     const analyserNode = audioCtx.createAnalyser();
  //     analyserNode.fftSize = 256;

  //     setAnalyser(analyserNode);
  //     setAudioInitialized(true);
  //     setAudioReady(true);

  //     console.log('AudioContext desbloqueado e AnalyserNode inicializado.');
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };

  //   window.addEventListener('touchstart', unlockAudio, false);

  //   return () => {
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };
  // }, [audioCtx, audioInitialized]);

  return {
    isPlaying,
    togglePlayPause,
    audioRef1,
    audioRef2,
    analyser,
    audioReady,
    loading,
    initializeAudioContext,
    changeTrack,
  };
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const musicState = useMusicState();

  return (
    <MusicContext.Provider value={musicState}>
      {children}
      <audio ref={musicState.audioRef1} src="assets/mp3/song.mp3" loop />
      <audio
        ref={musicState.audioRef2}
        src="assets/mp3/portfolio-song-final.mp3"
        loop
      />
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
