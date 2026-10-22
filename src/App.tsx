import React, { useState } from 'react';
import { Header } from './components/Header';
import { MmmHero } from './components/MmmHero';
import { MmmHowItWorks } from './components/MmmHowItWorks';
import { MockupStudioSection } from './components/MockupStudioSection';
import { MmmFeatures } from './components/MmmFeatures';
import { MmmTemplatesCarousel } from './components/MmmTemplatesCarousel';
import { WorkshopsSection } from './components/WorkshopsSection';
import { Reveal } from './components/Reveal';
import { ScrollProgress } from './components/ScrollProgress';
import { MmmReviews } from './components/MmmReviews';
import { MmmFaq } from './components/MmmFaq';
import { MmmLocation } from './components/MmmLocation';
import { MmmFooter } from './components/MmmFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TechniqueDetailModal } from './components/TechniqueDetailModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import type { ServiceItem, PortfolioItem } from './types';

export const App: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<ServiceItem | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 1. Sticky Minimalist Header (mmmmenu style) */}
      <ScrollProgress />
      <Header />

      {/* Main Content Flow (each section fades in on scroll) */}
      <main className="w-full flex-grow bg-white">
        {/* 2. Hero with High-Contrast Typography & Continuous Infinite Marquee Showcase */}
        <MmmHero />

        {/* 3. How It Works (3 Interactive Steps with Mini Simulated UI Previews) */}
        <Reveal><MmmHowItWorks /></Reveal>

        {/* 4. Live Interactive Customizer Studio */}
        <Reveal><MockupStudioSection /></Reveal>

        {/* 5. Features Grid (Everything you need to create digital & real apparel) */}
        <Reveal><MmmFeatures /></Reveal>

        {/* 6. Blanks & Templates Horizontal Carousel with Floating Glass Arrows */}
        <Reveal><MmmTemplatesCarousel /></Reveal>

        {/* Taller de estampados (Academia de serigrafía) */}
        <Reveal><WorkshopsSection /></Reveal>

        {/* 7. Verified Client Reviews */}
        <Reveal><MmmReviews /></Reveal>

        {/* 8. Interactive FAQ Accordion */}
        <Reveal><MmmFaq /></Reveal>

        {/* 9. Workshop Location in Buga with Embedded Map */}
        <Reveal><MmmLocation /></Reveal>
      </main>

      {/* 10. Minimalist Footer */}
      <MmmFooter />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Detail Modals (if triggered) */}
      <TechniqueDetailModal
        service={selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
      />

      <ImageLightboxModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
      />
    </div>
  );
};

export default App;
