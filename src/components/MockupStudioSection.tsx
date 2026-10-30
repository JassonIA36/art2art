import React, { useState, useRef, useEffect } from 'react';
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

type Side = 'frente' | 'espalda';

interface SideDesign {
  url: string | null;
  name: string;
  scale: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

const EMPTY_SIDE: SideDesign = {
  url: null,
  name: 'Sin arte',
  scale: 85,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
};

// Garments whose back view we can show (front, back or both together)
const TWO_SIDED: MockupGarmentId[] = ['camiseta', 'oversize'];

const SIDE_LABEL: Record<Side, string> = { frente: 'Frente', espalda: 'Espalda' };

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

  // Export & WhatsApp Modal States
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [hasDownloadedPreview, setHasDownloadedPreview] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Two-sided editing: the states above always belong to the side being edited;
  // the other side's design is kept aside and swapped in when the user switches.
  const [activeSide, setActiveSide] = useState<Side>('frente');
  const [otherDesign, setOtherDesign] = useState<SideDesign>(EMPTY_SIDE);

  const snapshotDesign = (): SideDesign => ({
    url: artworkUrl,
    name: artworkName,
    scale,
    rotation,
    offsetX,
    offsetY,
  });

  const switchSide = (next: Side) => {
    if (next === activeSide) return;
    const incoming = otherDesign;
    setOtherDesign(snapshotDesign());
    setArtworkUrl(incoming.url);
    setArtworkName(incoming.name);
    setScale(incoming.scale);
    setRotation(incoming.rotation);
    setOffsetX(incoming.offsetX);
    setOffsetY(incoming.offsetY);
    setActiveSide(next);
  };

  const choosePosition = (next: 'frente' | 'espalda' | 'ambos') => {
    setSelectedPosition(next);
    if (next !== 'ambos') switchSide(next);
  };

  // Tapping a side that carries no print adds it (the "Ambos lados" surcharge applies)
  const selectSide = (side: Side) => {
    if (selectedPosition !== 'ambos' && selectedPosition !== side) setSelectedPosition('ambos');
    switchSide(side);
  };

  const isPrinted = (side: Side) => selectedPosition === 'ambos' || selectedPosition === side;
  const designOf = (side: Side): SideDesign => (side === activeSide ? snapshotDesign() : otherDesign);

  const selectGarment = (id: MockupGarmentId) => {
    const garment = MOCKUP_GARMENTS.find((g) => g.id === id);
    if (!garment) return;
    setSelectedGarmentId(id);
    setSelectedTechniqueId(garment.defaultTechniqueId);
    setSelectedSize((prev) => (id === 'mug' ? 'Única' : prev === 'Única' ? 'M' : prev));
  };

  // Lets catalog/hero cards preselect a garment before scrolling here
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<MockupGarmentId>).detail;
      selectGarment(id);
    };
    window.addEventListener('art2art:select-garment', onSelect);
    return () => window.removeEventListener('art2art:select-garment', onSelect);
  }, []);

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

  // Turn every external image reference of an SVG into a data URL so it survives rasterization
  const inlineSvgImages = async (svg: SVGSVGElement) => {
    const images = Array.from(svg.querySelectorAll('image'));
    await Promise.all(
      images.map(async (img) => {
        const href = img.getAttribute('href') || img.getAttribute('xlink:href');
        if (!href || href.startsWith('data:')) return;
        try {
          const blob = await (await fetch(href)).blob();
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result as string);
            r.onerror = reject;
            r.readAsDataURL(blob);
          });
          img.setAttribute('href', dataUrl);
        } catch {
          // leave as is
        }
      })
    );
  };

  const rasterizeSvg = async (svg: SVGSVGElement, w: number, h: number) => {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('width', String(w));
    clone.setAttribute('height', String(h));
    await inlineSvgImages(clone);
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    try {
      return await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
    } finally {
      // the decoded bitmap stays valid after revoking
      setTimeout(() => URL.revokeObjectURL(url), 0);
    }
  };

  // Generate and Download Mockup as PNG via Canvas (every side shown in the preview)
  const handleDownloadMockup = async () => {
    setIsExporting(true);
    try {
      const svgs = Array.from(
        document.querySelectorAll<SVGSVGElement>('#mockup-preview-box svg')
      );
      if (!svgs.length) return;

      const n = svgs.length;
      const cellW = n === 2 ? 1000 : 1100;
      const cellH = Math.round((cellW * 650) / 600);
      const W = n * cellW + (n + 1) * 40;
      const H = cellH + 40 + 120 + 40;

      const bitmaps = await Promise.all(svgs.map((svg) => rasterizeSvg(svg, cellW, cellH)));

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(20, 20, W - 40, cellH + 20);

      const sides: Side[] = n === 2 ? ['frente', 'espalda'] : [activeSide];
      bitmaps.forEach((bmp, i) => {
        const x = 40 + i * (cellW + 40);
        ctx.drawImage(bmp, x, 30, cellW, cellH);
        if (n === 2) {
          ctx.fillStyle = '#64748b';
          ctx.font = 'bold 26px "Jost", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(SIDE_LABEL[sides[i]].toUpperCase(), x + cellW / 2, cellH + 10);
          ctx.textAlign = 'left';
        }
      });

      // Bottom Art2Art spec banner
      const bannerY = cellH + 60;
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(20, bannerY, W - 40, 130);

      ctx.fillStyle = '#dc0c1c';
      ctx.font = 'bold 30px "Jost", "Bebas Neue", sans-serif';
      ctx.fillText('Art2Art Estampados — Guadalajara de Buga', 50, bannerY + 52);

      ctx.fillStyle = '#334155';
      ctx.font = '18px "Inter", sans-serif';
      ctx.fillText(
        `Prenda: ${currentGarment.name} | Talla: ${selectedSize} | Posición: ${selectedPosition.toUpperCase()} | Color: ${currentColorConfig.name} | WhatsApp: ${COMPANY_INFO.whatsappDisplay}`,
        50,
        bannerY + 96
      );

      const downloadLink = document.createElement('a');
      downloadLink.download = `art2art-preview-${selectedGarmentId}-${selectedSize}-${currentColorConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      downloadLink.href = canvas.toDataURL('image/png');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setHasDownloadedPreview(true);
    } catch {
      // ignore
    } finally {
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

    const designLines = TWO_SIDED.includes(selectedGarmentId)
      ? (['frente', 'espalda'] as Side[])
          .filter(isPrinted)
          .map((side) => `
🖼️ *Diseño ${side}:* ${designOf(side).name === 'Sin arte' ? 'por definir' : designOf(side).name}`)
          .join('')
      : '';

    return `¡Hola Art2Art! 👋 Acabo de configurar este pedido en su Personalizador Web y deseo realizarlo:

👕 *Prenda:* ${currentGarment.name} (${currentGarment.badge})
🎨 *Color:* ${currentColorConfig.name} (${currentColorConfig.hex})
📏 *Talla:* ${selectedSize}
📍 *Posición del Estampado:* ${positionLabel}${designLines}
🛠️ *Técnica Sugerida:* ${currentTechnique.name}

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
      className="w-full py-20 bg-white text-black relative overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header (mmmmenu style) */}
        <div className="flex flex-col items-center gap-5 text-center max-w-[680px] mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs sm:text-sm font-medium text-black">
            Personalizador en Vivo
          </span>

          <h2 className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] tracking-[-0.05em] text-black">
            Diseña tu prenda en tiempo real
          </h2>

          <p className="text-[17px] sm:text-[18px] tracking-[-0.025em] text-black/60 max-w-[540px]">
            Elige silueta, color y técnica. Sube tu logo o vector y visualiza el resultado antes de producir.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Garment Preview Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col items-center justify-between space-y-4">
            {/* Stage Bar Controls */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-[#0b0e17] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dc0c1c] text-[20px]">
                    checkroom
                  </span>
                  <span>{currentGarment.name}</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700 border border-slate-200">
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
                      ? 'bg-[#dc0c1c]/10 border-[#dc0c1c]/30 text-[#dc0c1c] font-medium'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
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
                  className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Centrar</span>
                </button>
              </div>
            </div>

            {/* Always-visible upload of the customer's own design */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-neutral-800 py-3 px-4 text-sm font-semibold transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
              <span>{artworkName && artworkName !== 'Sin arte' ? `Cambiar diseño (${artworkName})` : 'Subir mi diseño o logo'}</span>
            </button>

            {/* SVG Interactive Canvas with subtle studio background */}
            <div
              id="mockup-preview-box"
              className="w-full bg-[#f8fafc] bg-studio-pattern rounded-2xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden min-h-[420px] sm:min-h-[480px] border border-slate-200"
            >
              {TWO_SIDED.includes(selectedGarmentId) ? (
                <div
                  className={`w-full grid gap-2 sm:gap-6 ${
                    selectedPosition === 'ambos' ? 'grid-cols-2' : 'grid-cols-1 max-w-[480px] mx-auto'
                  }`}
                >
                  {(selectedPosition === 'ambos'
                    ? (['frente', 'espalda'] as Side[])
                    : [selectedPosition as Side]
                  ).map((side) => {
                    const d = designOf(side);
                    const isActive = side === activeSide;
                    const zone = currentGarment.printZone;
                    return (
                      <div key={side} className="flex flex-col items-center gap-2 min-w-0">
                        <GarmentVectorPreview
                          garmentId={selectedGarmentId}
                          garmentColor={selectedColor}
                          isDark={currentColorConfig.isDark}
                          artworkUrl={d.url}
                          techniqueId={selectedTechniqueId}
                          showPrintZone={showPrintZone}
                          scale={d.scale}
                          rotation={d.rotation}
                          offsetX={d.offsetX}
                          offsetY={d.offsetY}
                          onDragOffsetChange={(newX, newY) => {
                            setOffsetX(newX);
                            setOffsetY(newY);
                          }}
                          printZone={
                            side === 'espalda'
                              ? { ...zone, y: zone.y - 25, height: zone.height + 25 }
                              : zone
                          }
                          position={side.toUpperCase()}
                          view={side === 'espalda' ? 'back' : 'front'}
                          printed={isPrinted(side)}
                          active={isActive}
                          onSelect={() => selectSide(side)}
                          compact={selectedPosition === 'ambos'}
                        />
                        {selectedPosition === 'ambos' && (
                        <button
                          type="button"
                          onClick={() => selectSide(side)}
                          aria-pressed={isActive}
                          className={`min-h-[40px] px-4 rounded-full text-xs font-semibold border transition-colors active:scale-[0.97] ${
                            isActive
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {SIDE_LABEL[side]}
                        </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
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
                  position={selectedPosition === 'ambos' ? 'FRENTE + ESPALDA' : selectedPosition.toUpperCase()}
                />
              )}
            </div>
            {TWO_SIDED.includes(selectedGarmentId) && selectedPosition === 'ambos' && (
              <p className="w-full text-center text-xs text-slate-500 -mt-1">
                Estás editando la <strong className="text-slate-800">{SIDE_LABEL[activeSide].toLowerCase()}</strong>.
                Toca la otra camiseta para diseñar el otro lado.
              </p>
            )}

            {/* Quick Placement Presets */}
            <div className="w-full flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#dc0c1c]">crop_free</span>
                <span>Ubicación rápida:</span>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setQuickPlacement('center')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  Centro Pecho
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('pocket')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  Bolsillo / Escudo
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('maxi')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  Maxi Print
                </button>
                <button
                  type="button"
                  onClick={() => setQuickPlacement('collar')}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  Superior
                </button>
              </div>
            </div>

            {/* Stage Footer: Download Preview Button */}
            <div className="w-full pt-3 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownloadMockup}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b0e17] hover:bg-[#dc0c1c] text-white text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isExporting ? 'hourglass_top' : 'download'}
                </span>
                <span>{isExporting ? 'Generando PNG...' : 'Descargar vista previa'}</span>
              </button>

              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span>Guarda el PNG para adjuntarlo al chat de WhatsApp</span>
              </span>
            </div>
          </div>

          {/* RIGHT: Tool Controls & Customizer Tabs */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Customizer Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => setActiveTab('garment')}
                className={`flex-1 py-3 px-2 text-center text-xs transition-all border-b-2 flex flex-col items-center gap-1 ${
                  activeTab === 'garment'
                    ? 'border-[#dc0c1c] text-[#dc0c1c] font-bold bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
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
                    ? 'border-[#dc0c1c] text-[#dc0c1c] font-bold bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
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
                    ? 'border-[#dc0c1c] text-[#dc0c1c] font-bold bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
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
                    ? 'border-[#dc0c1c] text-[#dc0c1c] font-bold bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
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
                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                      1. Elige tu Prenda
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {MOCKUP_GARMENTS.map((g) => {
                        const isSelected = g.id === selectedGarmentId;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => selectGarment(g.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-[#dc0c1c] bg-[#dc0c1c]/5 text-[#0b0e17] shadow-sm ring-1 ring-[#dc0c1c]'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                            }`}
                          >
                            <p className="text-xs font-bold text-slate-900 leading-tight">
                              {g.name}
                            </p>
                                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Garment Color */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        2. Color del Textil
                      </label>
                      <span className="text-xs font-bold text-slate-900">
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
                                ? 'ring-2 ring-[#dc0c1c] ring-offset-2 ring-offset-white scale-105 shadow-md'
                                : 'border-slate-300 hover:scale-105'
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
                        className="w-9 h-7 p-0 rounded border border-slate-300 cursor-pointer bg-transparent"
                      />
                      <span className="text-xs text-slate-500">
                        O elige un tono libre de tu preferencia
                      </span>
                    </div>
                  </div>

                  {/* SIZES SELECTOR (not applicable to mugs) */}
                  {selectedGarmentId !== 'mug' && (
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        3. Talla de la Prenda
                      </label>
                      <span className="text-xs font-bold text-[#dc0c1c]">
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
                                ? 'bg-[#0b0e17] text-white shadow-sm scale-105'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  )}

                  {/* PRINT POSITION SELECTOR */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                      4. Posición del Estampado
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => choosePosition('frente')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'frente'
                            ? 'border-[#dc0c1c] bg-[#dc0c1c]/10 text-[#dc0c1c] font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-xs leading-tight font-medium">Frente</p>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Estándar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => choosePosition('espalda')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'espalda'
                            ? 'border-[#dc0c1c] bg-[#dc0c1c]/10 text-[#dc0c1c] font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-xs leading-tight font-medium">Espalda</p>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Estándar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => choosePosition('ambos')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPosition === 'ambos'
                            ? 'border-[#dc0c1c] bg-[#dc0c1c]/10 text-[#dc0c1c] font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-xs leading-tight font-medium">Ambos Lados</p>
                        <span className="text-[10px] text-[#dc0c1c] block mt-0.5 font-semibold">+ $8.000 COP</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTE Y LOGO */}
              {activeTab === 'art' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                      Subir tu Logo o Ilustración
                    </label>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-[#dc0c1c] bg-slate-50 hover:bg-slate-100 rounded-2xl p-5 text-center cursor-pointer transition-all space-y-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#dc0c1c]/10 text-[#dc0c1c] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        Haz clic aquí para cargar tu imagen
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Admite PNG transparente, JPG, SVG o WebP
                      </p>
                    </div>
                  </div>

                  {/* Presets Gallery */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
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
                                ? 'border-[#dc0c1c] bg-[#dc0c1c]/5 ring-1 ring-[#dc0c1c]'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {preset.name}
                              </p>
                              <span className="text-[10px] text-slate-500 block truncate">
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
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 pt-1"
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
                      <span className="font-semibold text-slate-900">
                        Tamaño / Escala: {scale}%
                      </span>
                      <span className="text-[#dc0c1c] font-medium">
                        ~{approxWidthCm} × {approxHeightCm} cm
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">30%</span>
                      <input
                        type="range"
                        min="30"
                        max="140"
                        step="1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className="w-full accent-[#dc0c1c] h-2 bg-slate-200 rounded-lg cursor-pointer"
                      />
                      <span className="text-xs text-slate-500">140%</span>
                    </div>
                  </div>

                  {/* Rotation Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">
                        Rotación Angular: {rotation}°
                      </span>
                      <button
                        type="button"
                        onClick={() => setRotation(0)}
                        className="text-[11px] text-[#dc0c1c] hover:underline"
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
                      className="w-full accent-[#dc0c1c] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset X */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">
                        Posición Horizontal (X): {offsetX}%
                      </span>
                      <span className="text-slate-500 text-[11px]">
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
                      className="w-full accent-[#dc0c1c] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Offset Y */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">
                        Posición Vertical (Y): {offsetY}%
                      </span>
                      <span className="text-slate-500 text-[11px]">
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
                      className="w-full accent-[#dc0c1c] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: TÉCNICA */}
              {activeTab === 'technique' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
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
                                ? 'border-[#dc0c1c] bg-[#dc0c1c]/5 text-[#0b0e17] shadow-sm ring-1 ring-[#dc0c1c]'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">
                                {t.name}
                              </span>
                              {isSelected && (
                                <span className="material-symbols-outlined text-[#dc0c1c] text-[18px]">
                                  check_circle
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Recomendado: {t.recommendedGarment}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#dc0c1c]">
                      <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                      <span>Asesoría de Taller Buga</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      El DTF Direct to Film es la técnica más versátil para prendas oscuras o claras sin límite de colores ni degradados.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* DOWNLOAD & SHARE */}
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Action Buttons: WhatsApp Order & Download Preview */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleInitiateWhatsAppOrder}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                  <span>Enviar diseño por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadMockup}
                  disabled={isExporting}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-slate-700 text-[18px]">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl relative space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dc0c1c]/10 text-[#dc0c1c] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">attach_file</span>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-display text-slate-900 tracking-wide">
                ¡Paso Final para tu Pedido!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Debido a que WhatsApp no permite adjuntar archivos automáticamente desde navegadores web,{' '}
                <strong className="text-[#dc0c1c]">
                  por favor recuerda adjuntar tu archivo de diseño y la vista previa descargada
                </strong>{' '}
                directamente en el chat cuando se abra.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span className="material-symbols-outlined text-[16px] text-[#25D366]">chat</span>
                <span>Tu mensaje incluirá automáticamente:</span>
              </div>
              <p className="italic text-slate-700">
                «... 📎 Te envío mi diseño y la vista previa por este chat»
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleConfirmAndOpenWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Continuar a WhatsApp</span>
              </button>

              {!hasDownloadedPreview && (
                <button
                  type="button"
                  onClick={handleDownloadMockup}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-slate-700 text-[16px]">download</span>
                  <span>Descargar vista previa primero</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-900 transition-colors"
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
