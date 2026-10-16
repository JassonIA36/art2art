import React, { useState, useRef } from 'react';
import {
  MOCKUP_GARMENTS,
  MOCKUP_COLORS,
  MOCKUP_PRESETS,
  type GarmentViewConfig,
} from '../data/mockupData';
import { GarmentVectorPreview } from './GarmentVectorPreview';
import { TECHNIQUE_OPTIONS, COMPANY_INFO, getWhatsAppLink } from '../data/mockData';
import confetti from 'canvas-confetti';
import type { MockupGarmentId } from '../types';

export const MockupStudioSection: React.FC = () => {
  // Selected Garment & Options
  const [selectedGarmentId, setSelectedGarmentId] = useState<MockupGarmentId>('camiseta');
  const [selectedColor, setSelectedColor] = useState<string>(MOCKUP_COLORS[0].hex);
  const [customColor, setCustomColor] = useState<string>('#18181B');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedPosition, setSelectedPosition] = useState<'frente' | 'espalda' | 'ambos'>('frente');

  // Selected Artwork
  const [artworkUrl, setArtworkUrl] = useState<string | null>(MOCKUP_PRESETS[0].url);
  const [artworkName, setArtworkName] = useState<string>(MOCKUP_PRESETS[0].name);

  // Technique
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string>('dtf');

  // Transform states
  const [scale, setScale] = useState<number>(85);
  const [rotation, setRotation] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [showPrintZone, setShowPrintZone] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'garment' | 'art' | 'transform' | 'technique'>('garment');

  // Quantity & Discount State
  const [quantity, setQuantity] = useState<number>(1);

  // Export & WhatsApp Modal States
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [hasDownloadedPreview, setHasDownloadedPreview] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentGarment: GarmentViewConfig =
    MOCKUP_GARMENTS.find((g) => g.id === selectedGarmentId) || MOCKUP_GARMENTS[0];

  const currentColorConfig = MOCKUP_COLORS.find(
    (c) => c.hex.toLowerCase() === selectedColor.toLowerCase()
  ) || {
    name: 'Color Personalizado',
    hex: selectedColor,
    isDark: true,
  };

  const currentTechnique =
    TECHNIQUE_OPTIONS.find((t) => t.id === selectedTechniqueId) || TECHNIQUE_OPTIONS[0];

  // Base Prices per garment
  const garmentBasePrices: Record<MockupGarmentId, number> = {
    camiseta: 18000,
    hoodie: 48000,
    oversize: 24000,
    totebag: 8500,
    gorra: 12000,
  };

  // Base technique print cost
  const techniqueCost = currentTechnique.costPerUnit || 12000;
  // Extra cost if printed on both sides
  const positionExtraCost = selectedPosition === 'ambos' ? 8000 : 0;

  // Single unit base price
  const baseUnitPrice = (garmentBasePrices[selectedGarmentId] || 18000) + techniqueCost + positionExtraCost;

  // Calculate discount percentage
  let discountPercentage = 0;
  if (quantity >= 12) {
    discountPercentage = 0.20; // 20%
  } else if (quantity >= 6) {
    discountPercentage = 0.10; // 10%
  }

  const subtotalBeforeDiscount = baseUnitPrice * quantity;
  const discountAmount = Math.round(subtotalBeforeDiscount * discountPercentage);
  const totalPrice = subtotalBeforeDiscount - discountAmount;
  const finalUnitPrice = Math.round(totalPrice / quantity);

  // Physical size estimation in CM
  const approxWidthCm = Math.round(
    currentGarment.printableWidthCm * (scale / 100) * 0.75
  );
  const approxHeightCm = Math.round(
    currentGarment.printableHeightCm * (scale / 100) * 0.75
  );

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setArtworkUrl(result);
      setArtworkName(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  // Position presets
  const setQuickPlacement = (type: 'center' | 'pocket' | 'maxi' | 'collar') => {
    if (type === 'center') {
      setOffsetX(0);
      setOffsetY(0);
      setScale(85);
      setRotation(0);
    } else if (type === 'pocket') {
      setOffsetX(-35);
      setOffsetY(-35);
      setScale(42);
      setRotation(0);
    } else if (type === 'maxi') {
      setOffsetX(0);
      setOffsetY(10);
      setScale(125);
      setRotation(0);
    } else if (type === 'collar') {
      setOffsetX(0);
      setOffsetY(-45);
      setScale(50);
      setRotation(0);
    }
  };

  // Generate and Download Mockup as PNG via Canvas
  const handleDownloadMockup = () => {
    setIsExporting(true);
    try {
      const svgElement = document.querySelector('#mockup-preview-box svg') as SVGSVGElement | null;
      if (!svgElement) {
        setIsExporting(false);
        return;
      }

      const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
      svgClone.setAttribute('width', '1200');
      svgClone.setAttribute('height', '1300');

      const xmlSerializer = new XMLSerializer();
      const svgString = xmlSerializer.serializeToString(svgClone);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Dark urban canvas backdrop
          ctx.fillStyle = '#0f0f12';
          ctx.fillRect(0, 0, 1200, 1300);

          // Card container behind garment
          ctx.fillStyle = '#1a1a20';
          ctx.roundRect ? ctx.roundRect(40, 40, 1120, 1100, 24) : ctx.fillRect(40, 40, 1120, 1100);
          ctx.fill();

          ctx.drawImage(image, 0, 0, 1200, 1200);

          // Bottom Art2Art Atelier Watermark & Spec Banner
          ctx.fillStyle = '#141418';
          ctx.fillRect(40, 1140, 1120, 120);

          ctx.fillStyle = '#e6197e';
          ctx.font = 'bold 30px "Bebas Neue", sans-serif';
          ctx.fillText('Art2Art Estampados — Guadalajara de Buga', 70, 1185);

          ctx.fillStyle = '#9ca3af';
          ctx.font = '16px "Inter", sans-serif';
          ctx.fillText(
            `Prenda: ${currentGarment.name} | Talla: ${selectedSize} | Posición: ${selectedPosition.toUpperCase()} | Color: ${currentColorConfig.name} | WhatsApp: ${COMPANY_INFO.whatsappDisplay}`,
            70,
            1225
          );

          const pngData = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = `art2art-preview-${selectedGarmentId}-${selectedSize}-${currentColorConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`;
          downloadLink.href = pngData;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobURL);
          setHasDownloadedPreview(true);
        }
        setIsExporting(false);
      };
      image.onerror = () => {
        setIsExporting(false);
        URL.revokeObjectURL(blobURL);
      };
      image.src = blobURL;
    } catch {
      setIsExporting(false);
    }
  };

  // Build formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const positionLabel =
      selectedPosition === 'frente'
        ? 'Frente'
        : selectedPosition === 'espalda'
        ? 'Espalda'
        : 'Frente y Espalda (Ambos lados)';

    const discountText =
      discountPercentage > 0
        ? ` (¡${discountPercentage * 100}% Descuento Aplicado!)`
        : '';

    return `¡Hola Art2Art! 👋 Acabo de configurar este pedido en su Personalizador Web y deseo realizarlo:

👕 *Prenda:* ${currentGarment.name} (${currentGarment.badge})
🎨 *Color:* ${currentColorConfig.name} (${currentColorConfig.hex})
📏 *Talla:* ${selectedSize}
📍 *Posición del Estampado:* ${positionLabel}
🛠️ *Técnica Sugerida:* ${currentTechnique.name}
📦 *Cantidad:* ${quantity} unidad${quantity > 1 ? 'es' : ''}${discountText}
💰 *Total Estimado:* $${totalPrice.toLocaleString('es-CO')} COP

📎 Te envío mi diseño y la vista previa por este chat`;
  };

  // Open confirmation modal before redirecting to WhatsApp
  const handleInitiateWhatsAppOrder = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#e6197e', '#00b4d8', '#ffd60a', '#25D366'],
      });
    } catch {
      // ignore
    }
    setIsWhatsAppModalOpen(true);
  };

  const handleConfirmAndOpenWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const link = getWhatsAppLink(message);
    window.open(link, '_blank');
    setIsWhatsAppModalOpen(false);
  };

  return (
    <section
      id="personalizador"
      className="w-full py-16 sm:py-24 bg-[#0f0f12] text-white relative overflow-hidden border-t border-[#2a2a36]"
    >
      {/* Background radial glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#e6197e]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-[#00b4d8]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1a20] border border-[#2a2a36] text-xs font-semibold uppercase tracking-wider text-[#ffd60a]">
            <span className="w-2 h-2 rounded-full bg-[#e6197e]"></span>
            <span className="w-2 h-2 rounded-full bg-[#00b4d8]"></span>
            <span className="w-2 h-2 rounded-full bg-[#ffd60a]"></span>
            <span>Personalizador Textil en Vivo • Art2Art</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display text-white tracking-wider">
            Diseña tu Prenda y Cotiza con Descuento
          </h2>

          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
            Elige prenda, color, talla y posición de estampado. Sube tu arte, previsualiza el resultado y calcula el precio en tiempo real con hasta 20% de descuento.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Garment Preview Stage */}
          <div className="lg:col-span-7 bg-[#1a1a20] rounded-2xl border border-[#2a2a36] p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-between space-y-4">
            {/* Stage Bar Controls */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#2a2a36]">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#e6197e] text-[20px]">
                    checkroom
                  </span>
                  <span>{currentGarment.name}</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#22222b] font-medium text-[#ffd60a] border border-[#2a2a36]">
                  Talla {selectedSize} • {selectedPosition.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Print Zone Guide Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPrintZone(!showPrintZone)}
                  className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                    showPrintZone
                      ? 'bg-[#e6197e]/15 border-[#e6197e]/40 text-[#e6197e] font-medium'
                      : 'bg-[#1a1a20] border-[#2a2a36] text-[#9ca3af] hover:text-white'
                  }`}
                  title="Mostrar u ocultar marco de impresión"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showPrintZone ? 'visibility' : 'visibility_off'}
                  </span>
                  <span>Guía ({currentGarment.printableWidthCm}×{currentGarment.printableHeightCm}cm)</span>
                </button>

                {/* Reset Center */}
                <button
                  type="button"
                  onClick={() => setQuickPlacement('center')}
                  className="text-xs px-2.5 py-1 rounded-lg border border-[#2a2a36] bg-[#22222b] hover:bg-[#2c2c38] text-[#9ca3af] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Centrar</span>
                </button>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div
              id="mockup-preview-box"
              className="w-full bg-[#141418] bg-studio-dark-pattern rounded-2xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden min-h-[420px] sm:min-h-[480px] border border-[#2a2a36]"
            >
              <GarmentVectorPreview
                garmentId={selectedGarmentId}
                garmentColor={selectedColor}
                isDark={currentColorConfig.isDark}
                artworkUrl={artworkUrl}
                techniqueId={selectedTechniqueId}
                showPrintZone={showPrintZone}
                scale={scale}
                rotation={rotation}
                offsetX={offsetX}
                offsetY={offsetY}
                onDragOffsetChange={(newX, newY) => {
                  setOffsetX(newX);
                  setOffsetY(newY);
                }}
                printZone={currentGarment.printZone}
                position={selectedPosition}
              />
            </div>

            {/* Quick Placement Presets */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
              <span className="text-[#9ca3af] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#00b4d8]">crop_free</span>
                <span>Ubicación rápida:</span>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setQuickPlacement('center')}
                  className="px-2.5 py-1 rounded-md bg-[#22222b] hover:bg-[#2c2c38] text-white transition-colors"
                >
                  Centro Pecho
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('pocket')}
                  className="px-2.5 py-1 rounded-md bg-[#22222b] hover:bg-[#2c2c38] text-white transition-colors"
                >
                  Bolsillo / Escudo
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('maxi')}
                  className="px-2.5 py-1 rounded-md bg-[#22222b] hover:bg-[#2c2c38] text-white transition-colors"
                >
                  Maxi Print
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('collar')}
                  className="px-2.5 py-1 rounded-md bg-[#22222b] hover:bg-[#2c2c38] text-white transition-colors"
                >
                  Superior
                </button>
              </div>
            </div>

            {/* Stage Footer: Download Preview Button */}
            <div className="w-full pt-3 border-t border-[#2a2a36] flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadMockup}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22222b] hover:bg-[#2c2c38] text-white border border-[#2a2a36] hover:border-[#00b4d8] text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[#00b4d8] text-[18px]">
                  {isExporting ? 'hourglass_top' : 'download'}
                </span>
                <span>{isExporting ? 'Generando PNG...' : 'Descargar vista previa'}</span>
              </button>

              <span className="text-xs text-[#9ca3af] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span>Guarda el PNG para adjuntarlo al chat de WhatsApp</span>
              </span>
            </div>
          </div>

          {/* RIGHT: Tool Controls & Customizer Tabs */}
          <div className="lg:col-span-5 bg-[#1a1a20] rounded-2xl border border-[#2a2a36] shadow-2xl overflow-hidden flex flex-col">
            {/* Customizer Tabs */}
            <div className="flex border-b border-[#2a2a36] bg-[#141418]">
              <button
                type="button"
                onClick={() => setActiveTab('garment')}
                className={`flex-1 py-3 px-2 text-center text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'garment'
                    ? 'border-[#e6197e] text-[#e6197e] font-bold bg-[#1a1a20]'
                    : 'border-transparent text-[#9ca3af] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">checkroom</span>
                <span>Prenda & Talla</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('art')}
                className={`flex-1 py-3 px-2 text-center text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'art'
                    ? 'border-[#e6197e] text-[#e6197e] font-bold bg-[#1a1a20]'
                    : 'border-transparent text-[#9ca3af] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">palette</span>
                <span>Arte & Logo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transform')}
                className={`flex-1 py-3 px-2 text-center text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'transform'
                    ? 'border-[#e6197e] text-[#e6197e] font-bold bg-[#1a1a20]'
                    : 'border-transparent text-[#9ca3af] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Ajustes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('technique')}
                className={`flex-1 py-3 px-2 text-center text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'technique'
                    ? 'border-[#e6197e] text-[#e6197e] font-bold bg-[#1a1a20]'
                    : 'border-transparent text-[#9ca3af] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Técnica</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-5 sm:p-6 space-y-5 flex-grow">
              {/* TAB 1: PRENDA, COLOR, TALLA Y POSICIÓN */}
              {activeTab === 'garment' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Garment Selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                      1. Elige tu Prenda
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {MOCKUP_GARMENTS.map((g) => {
                        const isSelected = g.id === selectedGarmentId;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setSelectedGarmentId(g.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-[#e6197e] bg-[#e6197e]/10 text-white shadow-sm'
                                : 'border-[#2a2a36] hover:border-[#38384a] bg-[#22222b] text-[#9ca3af]'
                            }`}
                          >
                            <p className="text-xs font-bold text-white leading-tight">
                              {g.name}
                            </p>
                            <span className="text-[11px] text-[#ffd60a] block mt-0.5 font-semibold">
                              ${(garmentBasePrices[g.id] || 18000).toLocaleString('es-CO')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Garment Color */}
                  <div className="space-y-2 pt-2 border-t border-[#2a2a36]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">
                        2. Color del Textil
                      </label>
                      <span className="text-xs font-bold text-white">
                        {currentColorConfig.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {MOCKUP_COLORS.map((col) => {
                        const isSelected = selectedColor.toLowerCase() === col.hex.toLowerCase();
                        return (
                          <button
                            key={col.hex}
                            type="button"
                            onClick={() => setSelectedColor(col.hex)}
                            className={`h-9 rounded-lg border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'ring-2 ring-[#e6197e] ring-offset-2 ring-offset-[#1a1a20] scale-105 shadow-md'
                                : 'border-[#2a2a36] hover:scale-105'
                            }`}
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          >
                            {isSelected && (
                              <span
                                className={`material-symbols-outlined text-[16px] ${
                                  col.isDark ? 'text-white' : 'text-black'
                                }`}
                              >
                                check
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Color Picker */}
                    <div className="pt-1.5 flex items-center gap-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          setSelectedColor(e.target.value);
                        }}
                        className="w-9 h-7 p-0 rounded border border-[#2a2a36] cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-[#9ca3af]">
                        O elige un tono libre de tu preferencia
                      </span>
                    </div>
                  </div>

                  {/* SIZES SELECTOR */}
                  <div className="space-y-2 pt-2 border-t border-[#2a2a36]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold">
                        3. Talla de la Prenda
                      </label>
                      <span className="text-xs font-bold text-[#00b4d8]">
                        Seleccionada: {selectedSize}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                              isSelected
                                ? 'bg-[#00b4d8] text-[#0f0f12] shadow-md scale-105'
                                : 'bg-[#22222b] text-[#9ca3af] hover:text-white border border-[#2a2a36]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* PRINT POSITION SELECTOR */}
                  <div className="space-y-2 pt-2 border-t border-[#2a2a36]">
                    <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                      4. Posición del Estampado
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPosition('frente')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'frente'
                            ? 'border-[#e6197e] bg-[#e6197e]/15 text-white font-bold'
                            : 'border-[#2a2a36] bg-[#22222b] text-[#9ca3af] hover:text-white'
                        }`}
                      >
                        <p className="text-xs leading-tight">Frente</p>
                        <span className="text-[10px] text-[#9ca3af] block mt-0.5">Estándar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPosition('espalda')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'espalda'
                            ? 'border-[#e6197e] bg-[#e6197e]/15 text-white font-bold'
                            : 'border-[#2a2a36] bg-[#22222b] text-[#9ca3af] hover:text-white'
                        }`}
                      >
                        <p className="text-xs leading-tight">Espalda</p>
                        <span className="text-[10px] text-[#9ca3af] block mt-0.5">Estándar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPosition('ambos')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'ambos'
                            ? 'border-[#ffd60a] bg-[#ffd60a]/15 text-[#ffd60a] font-bold'
                            : 'border-[#2a2a36] bg-[#22222b] text-[#9ca3af] hover:text-white'
                        }`}
                      >
                        <p className="text-xs leading-tight">Ambos Lados</p>
                        <span className="text-[10px] text-[#ffd60a] block mt-0.5">+ $8.000 COP</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTE Y LOGO */}
              {activeTab === 'art' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                      Subir tu Logo o Ilustración
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={handleFileUpload}
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#e6197e]/40 hover:border-[#e6197e] bg-[#e6197e]/5 hover:bg-[#e6197e]/10 rounded-2xl p-5 text-center cursor-pointer transition-all space-y-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#e6197e]/15 text-[#e6197e] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                      </div>
                      <p className="text-xs font-bold text-white">
                        Haz clic aquí para cargar tu imagen
                      </p>
                      <p className="text-[11px] text-[#9ca3af]">
                        Admite PNG transparente, JPG, SVG o WebP
                      </p>
                    </div>
                  </div>

                  {/* Presets Gallery */}
                  <div className="space-y-2 pt-2 border-t border-[#2a2a36]">
                    <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                      O Prueba Diseños de Muestra Art2Art
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {MOCKUP_PRESETS.map((preset) => {
                        const isCurrent = artworkName === preset.name;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setArtworkUrl(preset.url);
                              setArtworkName(preset.name);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                              isCurrent
                                ? 'border-[#e6197e] bg-[#e6197e]/15 ring-1 ring-[#e6197e]'
                                : 'border-[#2a2a36] hover:border-[#38384a] bg-[#22222b]'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-[#141418] overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-white truncate">
                                {preset.name}
                              </p>
                              <span className="text-[10px] text-[#00b4d8] block truncate">
                                {preset.tag}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {artworkUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setArtworkUrl(null);
                        setArtworkName('Sin arte');
                      }}
                      className="text-xs text-[#ef4444] hover:underline flex items-center gap-1 pt-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      <span>Quitar arte actual</span>
                    </button>
                  )}
                </div>
              )}

              {/* TAB 3: TRANSFORMACIÓN Y ESCALA */}
              {activeTab === 'transform' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Scale Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Tamaño / Escala: {scale}%
                      </span>
                      <span className="text-[#00b4d8] font-medium">
                        ~{approxWidthCm} × {approxHeightCm} cm
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#9ca3af]">30%</span>
                      <input
                        type="range"
                        min="30"
                        max="140"
                        step="1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full accent-[#e6197e] h-2 bg-[#22222b] rounded-lg cursor-pointer"
                      />
                      <span className="text-xs text-[#9ca3af]">140%</span>
                    </div>
                  </div>

                  {/* Rotation Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Rotación Angular: {rotation}°
                      </span>
                      <button
                        type="button"
                        onClick={() => setRotation(0)}
                        className="text-[11px] text-[#ffd60a] hover:underline"
                      >
                        Restablecer a 0°
                      </button>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="1"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-[#e6197e] h-2 bg-[#22222b] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset X */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Posición Horizontal (X): {offsetX}%
                      </span>
                      <span className="text-[#9ca3af] text-[11px]">
                        {offsetX < 0 ? 'Izquierda' : offsetX > 0 ? 'Derecha' : 'Centrado'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      step="1"
                      value={offsetX}
                      onChange={(e) => setOffsetX(Number(e.target.value))}
                      className="w-full accent-[#e6197e] h-2 bg-[#22222b] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset Y */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Posición Vertical (Y): {offsetY}%
                      </span>
                      <span className="text-[#9ca3af] text-[11px]">
                        {offsetY < 0 ? 'Hacia el cuello' : offsetY > 0 ? 'Hacia la base' : 'Centrado'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      step="1"
                      value={offsetY}
                      onChange={(e) => setOffsetY(Number(e.target.value))}
                      className="w-full accent-[#e6197e] h-2 bg-[#22222b] rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: TÉCNICA */}
              {activeTab === 'technique' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                      Selecciona la Técnica
                    </label>

                    <div className="grid grid-cols-1 gap-2">
                      {TECHNIQUE_OPTIONS.map((t) => {
                        const isSelected = t.id === selectedTechniqueId;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTechniqueId(t.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-[#00b4d8] bg-[#00b4d8]/15 text-white shadow-sm'
                                : 'border-[#2a2a36] bg-[#22222b] text-[#9ca3af] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                {t.name}
                              </span>
                              {isSelected && (
                                <span className="material-symbols-outlined text-[#00b4d8] text-[18px]">
                                  check_circle
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#9ca3af] mt-0.5">
                              Recomendado: {t.recommendedGarment}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#141418] border border-[#2a2a36] text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#ffd60a]">
                      <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                      <span>Asesoría de Taller Buga</span>
                    </div>
                    <p className="text-[#9ca3af] leading-relaxed">
                      El DTF Direct to Film es la técnica más versátil para prendas oscuras o claras sin límite de colores.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* REAL-TIME PRICING & VOLUME DISCOUNT SECTION */}
            <div className="p-5 sm:p-6 bg-[#141418] border-t border-[#2a2a36] space-y-4">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#9ca3af] uppercase tracking-wider font-semibold block">
                    Cantidad de Prendas
                  </span>
                  <span className="text-xs text-[#ffd60a] font-medium">
                    {quantity < 6
                      ? 'Agrega 6+ para 10% OFF'
                      : quantity < 12
                      ? '¡10% OFF activo! (12+ para 20%)'
                      : '¡Máximo 20% OFF activo!'}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-[#1a1a20] p-1 rounded-xl border border-[#2a2a36]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#22222b] hover:bg-[#2c2c38] text-white flex items-center justify-center font-bold transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center bg-transparent font-bold text-white text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#22222b] hover:bg-[#2c2c38] text-white flex items-center justify-center font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Volume Discount Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div
                  className={`py-1.5 px-2 rounded-lg border transition-all ${
                    quantity < 6
                      ? 'border-[#2a2a36] bg-[#1a1a20] text-white'
                      : 'border-[#2a2a36]/50 opacity-60 bg-[#1a1a20] text-[#9ca3af]'
                  }`}
                >
                  <span className="block font-bold">1 a 5</span>
                  <span className="text-[10px] text-[#9ca3af]">Precio base</span>
                </div>

                <div
                  className={`py-1.5 px-2 rounded-lg border transition-all ${
                    quantity >= 6 && quantity < 12
                      ? 'border-[#00b4d8] bg-[#00b4d8]/15 text-[#00b4d8] font-bold shadow-sm'
                      : 'border-[#2a2a36] bg-[#1a1a20] text-[#9ca3af]'
                  }`}
                >
                  <span className="block font-bold">6 a 11</span>
                  <span className="text-[10px] text-[#00b4d8] font-semibold">10% OFF</span>
                </div>

                <div
                  className={`py-1.5 px-2 rounded-lg border transition-all ${
                    quantity >= 12
                      ? 'border-[#ffd60a] bg-[#ffd60a]/15 text-[#ffd60a] font-bold shadow-sm'
                      : 'border-[#2a2a36] bg-[#1a1a20] text-[#9ca3af]'
                  }`}
                >
                  <span className="block font-bold">12 o más</span>
                  <span className="text-[10px] text-[#ffd60a] font-semibold">20% OFF</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#1a1a20] p-4 rounded-xl border border-[#2a2a36] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#9ca3af]">
                  <span>Precio unitario regular:</span>
                  <span>${baseUnitPrice.toLocaleString('es-CO')} COP</span>
                </div>

                {discountPercentage > 0 && (
                  <div className="flex justify-between text-[#ffd60a] font-semibold">
                    <span>Descuento aplicado ({discountPercentage * 100}%):</span>
                    <span>- ${discountAmount.toLocaleString('es-CO')} COP</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#2a2a36] flex justify-between items-baseline">
                  <div>
                    <span className="text-white font-bold text-sm block">Total ({quantity} und):</span>
                    <span className="text-[11px] text-[#9ca3af]">
                      (${finalUnitPrice.toLocaleString('es-CO')} c/u)
                    </span>
                  </div>
                  <span className="text-2xl font-display text-[#e6197e] font-bold tracking-wider">
                    ${totalPrice.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Order & Download Preview */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleInitiateWhatsAppOrder}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] font-bold text-sm shadow-whatsapp-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                  <span>Pedir por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMockup}
                  disabled={isExporting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#22222b] hover:bg-[#2c2c38] text-white border border-[#2a2a36] hover:border-[#00b4d8] text-xs font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-[#00b4d8] text-[18px]">
                    {hasDownloadedPreview ? 'check_circle' : 'download'}
                  </span>
                  <span>
                    {hasDownloadedPreview
                      ? 'Vista previa guardada (clic para volver a descargar)'
                      : 'Descargar vista previa PNG'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHATSAPP ADVICE MODAL DIALOG */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1a1a20] max-w-lg w-full rounded-2xl p-6 border-2 border-[#e6197e]/60 shadow-2xl relative space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e6197e]/15 text-[#e6197e] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">attach_file</span>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-display text-white tracking-wide">
                ¡Paso Final para tu Pedido!
              </h3>
              <p className="text-sm text-[#f3f4f6] leading-relaxed">
                Debido a que WhatsApp no permite adjuntar archivos automáticamente desde navegadores web,{' '}
                <strong className="text-[#ffd60a]">
                  por favor recuerda adjuntar tu archivo de diseño y la vista previa descargada
                </strong>{' '}
                directamente en el chat cuando se abra.
              </p>
            </div>

            <div className="bg-[#141418] p-3.5 rounded-xl border border-[#2a2a36] text-xs text-[#9ca3af] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span className="material-symbols-outlined text-[16px] text-[#25D366]">chat</span>
                <span>Tu mensaje incluirá automáticamente:</span>
              </div>
              <p className="italic text-[#f3f4f6]">
                «... 📎 Te envío mi diseño y la vista previa por este chat»
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleConfirmAndOpenWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-[#0f0f12] font-bold text-sm shadow-whatsapp-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Continuar a WhatsApp</span>
              </button>

              {!hasDownloadedPreview && (
                <button
                  type="button"
                  onClick={handleDownloadMockup}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#22222b] hover:bg-[#2c2c38] text-white border border-[#00b4d8]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[#00b4d8] text-[16px]">download</span>
                  <span>Descargar vista previa primero</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="w-full py-2 text-center text-xs text-[#9ca3af] hover:text-white transition-colors"
              >
                Volver y seguir editando
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
