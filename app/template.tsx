'use client';

import { useEffect, useState } from 'react';
import { animatePageIn } from '../resources/hooks/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marque o componente como montado após o primeiro render
  }, []);

  useEffect(() => {
    if (mounted) {
      animatePageIn();
    }
  }, [mounted]);

  return (
    <div>
      <div
        id='transition-element'
        className='w-screen h-screen bg-primary z-50 fixed top-0 left-0'
      ></div>
      {children}
    </div>
  );
}
