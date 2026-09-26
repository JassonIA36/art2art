import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MockupStudioSection } from './components/MockupStudioSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { WholesaleSection } from './components/WholesaleSection';
import { LocationSection } from './components/LocationSection';
import { QuickChatBanner } from './components/QuickChatBanner';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { TechniqueDetailModal } from './components/TechniqueDetailModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import type { ServiceItem, PortfolioItem } from './types';

export const App: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [initialTechniqueId, setInitialTechniqueId] = useState<string | undefined>(undefined);
  const [selectedTechnique, setSelectedTechnique] = useState<ServiceItem | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const handleOpenQuoteModal = () => {
    setInitialTechniqueId(undefined);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteWithTechnique = (techniqueId: string) => {
    setInitialTechniqueId(techniqueId);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-petal-yellow/40">
      {/* Fixed Header */}
      <Header onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main className="w-full flex-grow bg-background">
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />
        
        <ServicesSection
          onSelectTechnique={(service) => setSelectedTechnique(service)}
          onOpenQuoteWithTechnique={handleOpenQuoteWithTechnique}
        />

        <MockupStudioSection
          onOpenQuoteModalWithConfig={handleOpenQuoteWithTechnique}
        />

        <WorkshopsSection />

        <WholesaleSection
          onOpenLightbox={(item) => setSelectedPortfolioItem(item)}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        <LocationSection />

        <QuickChatBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button with radar pulse */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
      <QuoteCalculatorModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialTechniqueId={initialTechniqueId}
      />

      <TechniqueDetailModal
        service={selectedTechnique}
        onClose={() => setSelectedTechnique(null)}
        onOpenQuoteWithTechnique={handleOpenQuoteWithTechnique}
      />

      <ImageLightboxModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
      />
    </div>
  );
};

export default App;
