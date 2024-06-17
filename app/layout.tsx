'use client';

import 'tailwindcss/tailwind.css';
import './globals.css';
import { Inter } from 'next/font/google';
import { MusicProvider } from './context/musicContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
