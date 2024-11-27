'use client';

import { MusicProvider } from '@/resources/music/music-context';
import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '@/components/core/Header';
import SideMenu from '@/components/core/SideMenu';
import Footer from '@/components/core/Footer';
import { SecretModeProvider } from '@/resources/secret-mode/secret-mode-context';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    document.title = 'Horizonte Studios | Official Homepage';
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta
          name="description"
          content="Horizonte studio's digital portfolio, made by Lucas Cyrne Ferreira"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="font-inter">
        <MusicProvider>
          <SecretModeProvider>
            <Header toggleMenu={toggleMenu} />
            <SideMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
            {children}
            <Footer />
          </SecretModeProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
