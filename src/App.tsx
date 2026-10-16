import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MockupStudioSection } from './components/MockupStudioSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WholesaleSection } from './components/WholesaleSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { LocationSection } from './components/LocationSection';
import { QuickChatBanner } from './components/QuickChatBanner';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TechniqueDetailModal } from './components/TechniqueDetailModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import type { ServiceItem, PortfolioItem } from './types';

export const App: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<ServiceItem | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f3f4f6] flex flex-col selection:bg-[#e6197e]/40 selection:text-white">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="w-full flex-grow bg-[#0f0f12]">
        <Hero />

        {/* Interactive Customizer Studio */}
        <MockupStudioSection />

        {/* 4-Step How It Works Section */}
        <div id="como-funciona">
          <HowItWorksSection />
        </div>

        {/* Professional Techniques Section */}
        <ServicesSection
          onSelectTechnique={(service) => setSelectedTechnique(service)}
        />

        {/* Wholesale & Realized Portfolio Gallery */}
        <WholesaleSection
          onOpenLightbox={(item) => setSelectedPortfolioItem(item)}
        />

        {/* Customer Reviews Section */}
        <div id="opiniones">
          <ReviewsSection />
        </div>

        {/* Accordion FAQ Section */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* Academia & Workshops Section */}
        <WorkshopsSection />

        {/* Workshop Physical Location */}
        <LocationSection />

        {/* Quick WhatsApp Support Banner */}
        <QuickChatBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button with radar pulse */}
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
