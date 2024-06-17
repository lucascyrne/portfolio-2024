import Footer from './components/core/Footer';
import Header from './components/core/Header';
import Hero from './sections/hero';

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen bg-background'>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
