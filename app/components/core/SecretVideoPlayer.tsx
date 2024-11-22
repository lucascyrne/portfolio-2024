'use client';

import { useMusic } from '@/app/context/music-context';
import { RxCross2 } from 'react-icons/rx';

const SecretVideoPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { togglePlayPause } = useMusic();

  const handlePause = () => {
    togglePlayPause("assets/mp3/song.mp3"); // Retorna à música original
    onClose();
  };

  return (
    <div className="absolute inset-0">
      {/* Vídeo de fundo */}
      <video
        src="/assets/videos/portfolio-2024-video.mp4"
        className="w-full h-full object-cover opacity-90 z-10"
        autoPlay
        loop
        muted
        onError={() => console.error("Erro ao carregar o vídeo.")}
      />
      {/* Botão para fechar o vídeo */}
      <button
        onClick={handlePause}
        className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full p-2 text-lg cursor-pointer z-50"
      >
        <RxCross2 />
      </button>
    </div>
  );
};


export default SecretVideoPlayer;
