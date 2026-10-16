import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExelentexHero } from './components/ExelentexHero';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { ProductsInBriefSection } from './components/ProductsInBriefSection';
import { ApplicationsSliderSection } from './components/ApplicationsSliderSection';
import { MockupStudioSection } from './components/MockupStudioSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ImproveYourBusinessSection } from './components/ImproveYourBusinessSection';
import { TechnologiesSection } from './components/TechnologiesSection';
import { WholesaleSection } from './components/WholesaleSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TechniqueDetailModal } from './components/TechniqueDetailModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import type { ServiceItem, PortfolioItem } from './types';

export const App: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<ServiceItem | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#dc0c1c]/40 selection:text-white">
      {/* Fixed eXelentex Minimalist Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="w-full flex-grow bg-[#0a0d14]">
        {/* 1. Hero with Interactive Three.js 3D Particle Mesh & Signature Slogan */}
        <ExelentexHero />

        {/* 2. What We Do (Editorial Two-Column Grid) */}
        <WhatWeDoSection />

        {/* 3. Products in Brief (Grid with existing photos) */}
        <div id="productos">
          <ProductsInBriefSection />
        </div>

        {/* 4. Applications of Our Expertise (Interactive Bullet Tabs) */}
        <div id="aplicaciones">
          <ApplicationsSliderSection />
        </div>

        {/* 5. Live Interactive Customizer Studio */}
        <MockupStudioSection />

        {/* 6. How It Works (4-Step Workflow) */}
        <HowItWorksSection />

        {/* 7. Improve Your Business (Signature eXelentex Dark CTA with Circular Arrow) */}
        <ImproveYourBusinessSection />

        {/* 8. Technologies in Depth */}
        <TechnologiesSection />

        {/* 9. Realized Portfolio Gallery & Wholesale */}
        <WholesaleSection
          onOpenLightbox={(item) => setSelectedPortfolioItem(item)}
        />

        {/* 10. Verified Client Reviews */}
        <div id="opiniones">
          <ReviewsSection />
        </div>

        {/* 11. Interactive FAQ Accordion */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* 12. Physical Location & Map */}
        <div id="contacto">
          <LocationSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
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
