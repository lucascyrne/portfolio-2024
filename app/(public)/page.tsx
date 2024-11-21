'use client'

import Footer from '../components/core/Footer';
import Header from '../components/core/Header';
import SoundVisualizer from '../components/core/SoundVisualizer';
import Hero from '../sections/hero';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      <SoundVisualizer />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between">
        <Header />
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
