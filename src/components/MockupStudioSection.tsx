import React, { useState, useRef } from 'react';
import {
  MOCKUP_GARMENTS,
  MOCKUP_COLORS,
  MOCKUP_PRESETS,
  type GarmentViewConfig,
} from '../data/mockupData';
import { GarmentVectorPreview } from './GarmentVectorPreview';
import { TECHNIQUE_OPTIONS, getWhatsAppLink } from '../data/mockData';
import confetti from 'canvas-confetti';
import type { MockupGarmentId } from '../types';

interface MockupStudioSectionProps {
  onOpenQuoteModalWithConfig?: (techniqueId: string) => void;
}

export const MockupStudioSection: React.FC<MockupStudioSectionProps> = ({
  onOpenQuoteModalWithConfig,
}) => {
  // Selected Garment
  const [selectedGarmentId, setSelectedGarmentId] = useState<MockupGarmentId>('camiseta');
  // Selected Color
  const [selectedColor, setSelectedColor] = useState<string>(MOCKUP_COLORS[0].hex);
  const [customColor, setCustomColor] = useState<string>('#18181B');
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
  const [isExporting, setIsExporting] = useState<boolean>(false);

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

  // Calculated physical size estimation in CM based on scale and printZone
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

  // Quick Position Presets
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

  // Handle Export Mockup as PNG
  const handleDownloadMockup = () => {
    setIsExporting(true);
    try {
      const svgElement = document.querySelector('#mockup-preview-box svg') as SVGSVGElement | null;
      if (!svgElement) {
        setIsExporting(false);
        return;
      }

      const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
      // Ensure dimensions for crisp export
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
          // Fill subtle clean background
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(0, 0, 1200, 1300);
          ctx.drawImage(image, 0, 0, 1200, 1300);

          // Add Art2Art watermark and info
          ctx.fillStyle = '#111c2d';
          ctx.font = 'bold 24px "Space Grotesk", sans-serif';
          ctx.fillText('Art2Art Estampados — Guadalajara de Buga', 50, 1230);
          ctx.fillStyle = '#64748B';
          ctx.font = '18px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(
            `Prenda: ${currentGarment.name} | Técnica: ${currentTechnique.name} | WhatsApp: +57 318 266 0432`,
            50,
            1265
          );

          const pngData = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = `art2art-mockup-${selectedGarmentId}-${currentColorConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`;
          downloadLink.href = pngData;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(blobURL);
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

  // WhatsApp Quote Builder
  const handleQuoteViaWhatsApp = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#F9DF1B', '#E02424', '#F37023', '#00A5E3', '#25D366'],
      });
    } catch {
      // ignore
    }

    const message = `¡Hola Art2Art! 👋 Acabo de diseñar un mockup en su Simulador Web y me gustaría cotizarlo:

👕 *Prenda:* ${currentGarment.name} (${currentGarment.badge})
🎨 *Color de Prenda:* ${currentColorConfig.name} (${currentColorConfig.hex})
🖼️ *Arte / Diseño:* ${artworkName}
📏 *Dimensiones Estimadas:* ~${approxWidthCm} cm de ancho × ${approxHeightCm} cm de alto
🛠️ *Técnica Sugerida:* ${currentTechnique.name}

¿Tienen disponibilidad para producir esta prenda y qué resolución mínima me recomiendan enviar del archivo? ¡Gracias!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section
      id="simulador"
      className="w-full py-space-xl bg-gradient-to-b from-background via-surface-container-low/60 to-background border-t border-surface-border/50 relative overflow-hidden"
    >
      {/* Decorative background glow accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-petal-yellow/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-petal-cyan/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-margin space-y-space-lg relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-card border border-surface-border shadow-sm text-xs font-label-sm uppercase tracking-wider text-primary">
            <span className="flex h-2 w-2 rounded-full bg-petal-yellow"></span>
            <span className="flex h-2 w-2 rounded-full bg-petal-red"></span>
            <span className="flex h-2 w-2 rounded-full bg-petal-cyan"></span>
            <span>Estudio Creativo 2D • Simulador en Vivo</span>
          </div>

          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Visualiza tu Estampado en Prenda Real
          </h2>

          <p className="font-body-md text-body-md text-secondary leading-relaxed">
            Sube tu propio arte o prueba nuestros diseños de muestra. Cambia el color del textil, ajusta proporciones en tiempo real y cotiza directamente a nuestro taller en Buga.
          </p>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN: Vector Garment Canvas */}
          <div className="lg:col-span-7 bg-surface-card rounded-2xl border border-surface-border p-4 sm:p-6 shadow-md flex flex-col items-center justify-between space-y-4 relative">
            {/* Top Canvas Bar Controls */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    checkroom
                  </span>
                  <span>{currentGarment.name}</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container font-medium text-secondary">
                  {currentColorConfig.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Print area guide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPrintZone(!showPrintZone)}
                  className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                    showPrintZone
                      ? 'bg-primary/10 border-primary/30 text-primary font-medium'
                      : 'bg-surface-card border-surface-border text-secondary hover:text-on-surface'
                  }`}
                  title="Mostrar u ocultar marco de impresión"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showPrintZone ? 'visibility' : 'visibility_off'}
                  </span>
                  <span>Guía ({currentGarment.printableWidthCm}×{currentGarment.printableHeightCm}cm)</span>
                </button>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => setQuickPlacement('center')}
                  className="text-xs px-2.5 py-1 rounded-lg border border-surface-border hover:bg-surface-container text-secondary transition-colors flex items-center gap-1"
                  title="Centrar arte"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Centrar</span>
                </button>
              </div>
            </div>

            {/* Garment SVG Interactive Stage */}
            <div
              id="mockup-preview-box"
              className="w-full bg-gradient-to-b from-surface-subtle to-surface-container-low/40 rounded-xl p-2 sm:p-4 flex items-center justify-center relative overflow-hidden min-h-[380px] sm:min-h-[440px] border border-surface-border/40"
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
              />
            </div>

            {/* Quick Placement Chips Under Canvas */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
              <span className="text-secondary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">crop_free</span>
                <span>Posición rápida:</span>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setQuickPlacement('center')}
                  className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
                >
                  Pecho Centro
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('pocket')}
                  className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
                >
                  Bolsillo / Izq.
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('maxi')}
                  className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
                >
                  Maxi Frontal
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('collar')}
                  className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
                >
                  Superior
                </button>
              </div>
            </div>

            {/* Bottom Actions Row: Download & Quote modal link */}
            <div className="w-full pt-3 border-t border-surface-border flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadMockup}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-card hover:bg-surface-bright text-on-surface border border-surface-border hover:border-primary/40 text-xs font-label-md shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">
                  {isExporting ? 'hourglass_top' : 'download'}
                </span>
                <span>{isExporting ? 'Generando PNG...' : 'Descargar Mockup en PNG'}</span>
              </button>

              {onOpenQuoteModalWithConfig && (
                <button
                  type="button"
                  onClick={() => onOpenQuoteModalWithConfig(selectedTechniqueId)}
                  className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-secondary-fixed/40 hover:bg-secondary-fixed text-primary font-label-md text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Cotizar por Volumen</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Tool Controls & Customizer Tabs */}
          <div className="lg:col-span-5 bg-surface-card rounded-2xl border border-surface-border shadow-md overflow-hidden flex flex-col">
            {/* Customizer Navigation Tabs */}
            <div className="flex border-b border-surface-border bg-surface-container-low/40">
              <button
                type="button"
                onClick={() => setActiveTab('garment')}
                className={`flex-1 py-3 px-2 text-center font-label-sm text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'garment'
                    ? 'border-primary text-primary font-bold bg-surface-card'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">checkroom</span>
                <span>Prenda & Color</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('art')}
                className={`flex-1 py-3 px-2 text-center font-label-sm text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'art'
                    ? 'border-primary text-primary font-bold bg-surface-card'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">palette</span>
                <span>Arte & Logo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transform')}
                className={`flex-1 py-3 px-2 text-center font-label-sm text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'transform'
                    ? 'border-primary text-primary font-bold bg-surface-card'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Ajustes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('technique')}
                className={`flex-1 py-3 px-2 text-center font-label-sm text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'technique'
                    ? 'border-primary text-primary font-bold bg-surface-card'
                    : 'border-transparent text-secondary hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Técnica</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-space-md sm:p-space-lg space-y-space-md flex-grow">
              {/* TAB 1: PRENDA Y COLOR */}
              {activeTab === 'garment' && (
                <div className="space-y-space-md animate-fadeIn">
                  {/* Select Garment Silhouette */}
                  <div className="space-y-2">
                    <label className="font-label-sm text-xs text-secondary uppercase tracking-wider block">
                      1. Selecciona la Prenda Textil
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MOCKUP_GARMENTS.map((g) => {
                        const isSelected = g.id === selectedGarmentId;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => {
                              setSelectedGarmentId(g.id);
                              setSelectedTechniqueId(g.defaultTechniqueId);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 ring-1 ring-primary text-on-surface shadow-sm'
                                : 'border-surface-border hover:border-primary/30 bg-surface-card text-secondary'
                            }`}
                          >
                            <p className="font-label-md text-xs font-bold text-on-surface leading-tight">
                              {g.name}
                            </p>
                            <span className="text-[11px] text-primary block mt-0.5">
                              {g.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Garment Color */}
                  <div className="space-y-2 pt-2 border-t border-surface-border">
                    <div className="flex items-center justify-between">
                      <label className="font-label-sm text-xs text-secondary uppercase tracking-wider">
                        2. Color del Textil
                      </label>
                      <span className="text-xs font-bold text-on-surface">
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
                            className={`h-10 rounded-lg border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'ring-2 ring-primary ring-offset-2 scale-105 shadow-md'
                                : 'border-surface-border hover:scale-105'
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

                    {/* Custom Color Picker input */}
                    <div className="pt-2 flex items-center gap-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setCustomColor(e.target.value);
                          setSelectedColor(e.target.value);
                        }}
                        className="w-10 h-8 p-0 rounded border border-surface-border cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-secondary">
                        O elige cualquier tono personalizado libre
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTE Y LOGO */}
              {activeTab === 'art' && (
                <div className="space-y-space-md animate-fadeIn">
                  {/* File Upload Trigger */}
                  <div className="space-y-2">
                    <label className="font-label-sm text-xs text-secondary uppercase tracking-wider block">
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
                      className="border-2 border-dashed border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                      </div>
                      <p className="font-label-md text-xs font-bold text-on-surface">
                        Haz clic aquí para cargar tu imagen
                      </p>
                      <p className="text-[11px] text-secondary">
                        Soporta PNG transparente, JPG, SVG o WebP
                      </p>
                    </div>
                  </div>

                  {/* Sample Gallery Presets */}
                  <div className="space-y-2 pt-2 border-t border-surface-border">
                    <label className="font-label-sm text-xs text-secondary uppercase tracking-wider block">
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
                                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                : 'border-surface-border hover:border-primary/40 bg-surface-card'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-surface-container overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-label-sm text-xs font-bold text-on-surface truncate">
                                {preset.name}
                              </p>
                              <span className="text-[10px] text-tertiary block truncate">
                                {preset.tag}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clear Art Option */}
                  {artworkUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setArtworkUrl(null);
                        setArtworkName('Sin arte cargado');
                      }}
                      className="text-xs text-error hover:underline flex items-center gap-1 pt-1"
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
                  {/* Scale / Size Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm font-bold text-on-surface">
                        Escala / Tamaño: {scale}%
                      </span>
                      <span className="text-secondary font-medium">
                        ~{approxWidthCm} × {approxHeightCm} cm
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-secondary">30%</span>
                      <input
                        type="range"
                        min="30"
                        max="140"
                        step="1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                      />
                      <span className="text-xs text-secondary">140%</span>
                    </div>
                  </div>

                  {/* Rotation Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm font-bold text-on-surface">
                        Rotación Angular: {rotation}°
                      </span>
                      <button
                        type="button"
                        onClick={() => setRotation(0)}
                        className="text-[11px] text-primary hover:underline"
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
                      className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Horizontal Offset */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm font-bold text-on-surface">
                        Posición Horizontal (X): {offsetX}%
                      </span>
                      <span className="text-secondary text-[11px]">
                        {offsetX < 0 ? 'Hacia la izquierda' : offsetX > 0 ? 'Hacia la derecha' : 'Centrado'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      step="1"
                      value={offsetX}
                      onChange={(e) => setOffsetX(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Vertical Offset */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-sm font-bold text-on-surface">
                        Posición Vertical (Y): {offsetY}%
                      </span>
                      <span className="text-secondary text-[11px]">
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
                      className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: TÉCNICA DE ESTAMPADO */}
              {activeTab === 'technique' && (
                <div className="space-y-space-md animate-fadeIn">
                  <div className="space-y-2">
                    <label className="font-label-sm text-xs text-secondary uppercase tracking-wider block">
                      Selecciona la Técnica para Simular
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
                                ? 'border-tertiary bg-secondary-fixed/30 ring-1 ring-tertiary shadow-sm'
                                : 'border-surface-border hover:border-tertiary/40 bg-surface-card'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-label-md text-xs font-bold text-on-surface">
                                {t.name}
                              </span>
                              {isSelected && (
                                <span className="material-symbols-outlined text-tertiary text-[18px]">
                                  check_circle
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-secondary mt-0.5">
                              Recomendado: {t.recommendedGarment}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contextual Technical Advice */}
                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-border text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-on-surface">
                      <span className="material-symbols-outlined text-petal-yellow text-[18px]">
                        lightbulb
                      </span>
                      <span>Asesoría de Taller Buga</span>
                    </div>
                    <p className="text-secondary leading-relaxed">
                      {currentColorConfig.isDark
                        ? 'En prendas oscuras como esta, el DTF Full Color o la Serigrafía con plastisol blanco garantizan la mayor fidelidad cromática.'
                        : 'En prendas claras puedes aprovechar DTF o Sublimación (si es tela con alto contenido de poliéster).'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Conversion Summary & Primary CTA */}
            <div className="p-space-md bg-surface-container-low border-t border-surface-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-secondary">Diseño: </span>
                  <span className="font-bold text-on-surface">{artworkName}</span>
                </div>
                <div className="text-right">
                  <span className="text-secondary">Área: </span>
                  <span className="font-bold text-primary">
                    ~{approxWidthCm} × {approxHeightCm} cm
                  </span>
                </div>
              </div>

              {/* WhatsApp Conversion CTA */}
              <button
                type="button"
                onClick={handleQuoteViaWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-sm shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Cotizar este Diseño por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
