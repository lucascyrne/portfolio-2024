'use client'

import Footer from '@/components/core/Footer';
import Header from '@/components/core/Header';
import Hero from '@/components/core/Hero';
import QuoteCarousel from '@/components/core/QuoteCarousel';
import SecretVideoPlayer from '@/components/core/SecretVideoPlayer';
import SoundVisualizer from '@/components/core/SoundVisualizer';
import { useMusic } from '@/resources/music/music-context';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [showQuoteCarousel, setShowQuoteCarousel] = useState(false);
  const { togglePlayPause } = useMusic();

  const handleVideoClose = () => {
    setIsSecretMode(false); // Restaura o Hero quando o vídeo é fechado
    togglePlayPause("assets/mp3/song.mp3"); // Retorna à música original
  };

  useEffect(() => {
    if (isSecretMode) {
      const timeout = setTimeout(() => setShowQuoteCarousel(true), 700); // Espera 700ms
      return () => clearTimeout(timeout);
    } else {
      setShowQuoteCarousel(false);
    }
  }, [isSecretMode]);

  return (
    <main className="flex flex-col w-full h-screen overflow-hidden bg-gradient-to-b from-gray-300 via-white to-white">
      {/* Camada do visualizador de som */}
      <div className="absolute inset-0 pointer-events-none">
        <SoundVisualizer isSecretMode={isSecretMode} />
      </div>

      {/* Camada do conteúdo principal */}
      <div className="flex flex-col w-full h-screen items-center justify-between bg-transparent">
        <Header isSecretMode={isSecretMode} />
        {isSecretMode && <SecretVideoPlayer onClose={handleVideoClose} />}
        <Hero isSecretMode={isSecretMode} setIsSecretMode={setIsSecretMode} />
        {showQuoteCarousel && <QuoteCarousel />}
        <Footer />
      </div>
    </main>
  );
}


