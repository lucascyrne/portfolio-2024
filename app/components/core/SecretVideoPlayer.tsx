'use client';

import { useMusic } from '@/app/context/music-context';

const SecretVideoPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { togglePlayPause } = useMusic();

    const handlePause = () => {
        togglePlayPause("assets/mp3/song.mp3"); // Retorna à música original
        onClose();
      };

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-80">
       <video
        src="/assets/videos/portfolio-2024-video.mp4"
        className="w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        onEnded={handlePause}
      />
      <button
        onClick={handlePause}
        className="relative top-5 right-5 text-white bg-black bg-opacity-50 rounded-full px-4 py-2"
      >
        Close
      </button>
    </div>
  );
};

export default SecretVideoPlayer;
