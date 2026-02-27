'use client';

import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });

export function ClientEffects() {
  return (
    <>
      <Preloader />
      <CustomCursor />
    </>
  );
}
