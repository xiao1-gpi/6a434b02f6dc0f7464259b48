import { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import Portfolio from '@/components/portfolio/Portfolio';
import OpeningOverlay from '@/components/ui/OpeningOverlay';
import { useOpeningAnimation } from '@/hooks/useGsapAnimations';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 首屏开场动画
  useOpeningAnimation(containerRef, overlayRef);

  return (
    <div ref={containerRef} className="min-h-screen text-text-primary">
      {/* 开场遮幕 */}
      <OpeningOverlay ref={overlayRef} />
      <div className="noise-overlay" />
      <div>
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider max-w-content mx-auto" />
          <Portfolio />
        </main>
        <Footer />
      </div>
    </div>
  );
}
