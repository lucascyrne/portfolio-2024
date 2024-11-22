'use client'

import { useState } from 'react';
import Footer from '../components/core/Footer';
import Header from '../components/core/Header';
import SoundVisualizer from '../components/core/SoundVisualizer';
import SecretVideoPlayer from '../components/core/SecretVideoPlayer';
import Hero from '../sections/Hero';
import { useMusic } from '../context/music-context';

export default function Home() {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const { togglePlayPause } = useMusic();
  
  const handleVideoClose = () => {
    setIsSecretMode(false); // Restaura o Hero quando o vídeo é fechado
    togglePlayPause("assets/mp3/song.mp3"); // Retorna à música original
  };

  return (
    <main className="relative w-full h-screen overflow-hidden z-0">
      {isSecretMode && <SecretVideoPlayer onClose={handleVideoClose} />}
      <SoundVisualizer />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between">
        <Header />
        <Hero 
          isSecretMode={isSecretMode}
          setIsSecretMode={setIsSecretMode}
        />
        <Footer />
      </div>
    </main>
  );
}
