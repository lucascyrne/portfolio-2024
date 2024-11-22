'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';
import { MusicProvider } from './context/music-context';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = 'Horizonte Studios | Official Homepage';
  }, []);

  return (
    <html lang='en'>
      <Head>
        <meta
          name='description'
          content="Horizonte studio's digital portfolio, made by Lucas Cyrne Ferreira"
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body className={inter.className}>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
