import React, { useRef, useState, useEffect } from 'react';
import type { MockupGarmentId } from '../types';
import { MOCKUP_GARMENTS, type GarmentZone } from '../data/mockupData';
import { processRealisticGarment } from '../utils/garmentImageProcessor';

interface GarmentVectorPreviewProps {
  garmentId: MockupGarmentId;
  garmentColor: string;
  isDark: boolean;
  artworkUrl: string | null;
  techniqueId: string;
  showPrintZone: boolean;
  scale: number;
  rotation: number;
  offsetX: number; // percentage offset -50 to 50
  offsetY: number; // percentage offset -50 to 50
  onDragOffsetChange: (newX: number, newY: number) => void;
  printZone: GarmentZone;
  position?: 'frente' | 'espalda' | 'ambos';
}

export const GarmentVectorPreview: React.FC<GarmentVectorPreviewProps> = ({
  garmentId,
  garmentColor,
  isDark,
  artworkUrl,
  techniqueId,
  showPrintZone,
  scale,
  rotation,
  offsetX,
  offsetY,
  onDragOffsetChange,
  printZone,
  position = 'frente',
}) => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [colorizedUrl, setColorizedUrl] = useState<string | null>(null);
  const [shadowMapUrl, setShadowMapUrl] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string>('');

  const dragStartRef = useRef<{ x: number; y: number; startOffX: number; startOffY: number }>({
    x: 0,
    y: 0,
    startOffX: 0,
    startOffY: 0,
  });

  const currentGarment =
    MOCKUP_GARMENTS.find((g) => g.id === garmentId) || MOCKUP_GARMENTS[0];

  // Pick best studio photograph base
  const basePhoto =
    isDark && currentGarment.blackPhotoUrl && garmentColor.toLowerCase() === '#18181b'
      ? currentGarment.blackPhotoUrl
      : currentGarment.photoUrl;

  // Process realistic textile image on garment/color change
  const currentKey = `${basePhoto}_${garmentColor.toLowerCase()}`;
  const isProcessing = loadedKey !== currentKey;

  useEffect(() => {
    let isMounted = true;
    const key = `${basePhoto}_${garmentColor.toLowerCase()}`;

    processRealisticGarment(basePhoto, garmentColor, isDark)
      .then((res) => {
        if (isMounted) {
          setColorizedUrl(res.colorizedDataUrl);
          setShadowMapUrl(res.shadowMapDataUrl);
          setLoadedKey(key);
        }
      })
      .catch(() => {
        if (isMounted) {
          setColorizedUrl(basePhoto);
          setLoadedKey(key);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [basePhoto, garmentColor, isDark]);

  // Center coordinate of printable area
  const artCenterBaseX = printZone.x + printZone.width / 2;
  const artCenterBaseY = printZone.y + printZone.height / 2;

  // Mapped pixel coordinates
  const artPixelX = artCenterBaseX + (offsetX / 100) * (printZone.width * 0.7);
  const artPixelY = artCenterBaseY + (offsetY / 100) * (printZone.height * 0.7);

  // Scaled dimensions
  const artBoxWidth = printZone.width * 0.8 * (scale / 100);
  const artBoxHeight = printZone.height * 0.8 * (scale / 100);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startOffX: offsetX,
      startOffY: offsetY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleFactorX = 600 / rect.width;
    const scaleFactorY = 650 / rect.height;

    const deltaX = (e.clientX - dragStartRef.current.x) * scaleFactorX;
    const deltaY = (e.clientY - dragStartRef.current.y) * scaleFactorY;

    const deltaPercentX = (deltaX / (printZone.width * 0.7)) * 100;
    const deltaPercentY = (deltaY / (printZone.height * 0.7)) * 100;

    const nextX = Math.max(-60, Math.min(60, dragStartRef.current.startOffX + deltaPercentX));
    const nextY = Math.max(-60, Math.min(60, dragStartRef.current.startOffY + deltaPercentY));

    onDragOffsetChange(Math.round(nextX), Math.round(nextY));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  // Determine technique styling
  const getTechniqueStyle = (): React.CSSProperties => {
    if (techniqueId === 'sublimacion') {
      return {
        mixBlendMode: (isDark ? 'normal' : 'multiply') as React.CSSProperties['mixBlendMode'],
        opacity: isDark ? 0.85 : 0.94,
        filter: 'contrast(1.05) saturate(1.1)',
      };
    }
    if (techniqueId === 'serigrafia') {
      return {
        filter: 'contrast(1.18) drop-shadow(0px 1px 2px rgba(0,0,0,0.3))',
        opacity: 0.98,
      };
    }
    if (techniqueId === 'vinilo') {
      return {
        filter: 'contrast(1.22) drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
      };
    }
    // Default DTF
    return {
      filter: 'contrast(1.1) drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
    };
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none flex items-center justify-center p-1 sm:p-2">
      <svg
        ref={containerRef}
        viewBox="0 0 600 650"
        className="w-full h-auto drop-shadow-2xl overflow-visible transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Ambient Studio Ground Shadow */}
          <radialGradient id="studioGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </radialGradient>

          {/* Mask for realistic wrinkle shadow overlay on artwork */}
          <clipPath id="artworkPrintClip">
            <rect
              x={printZone.x}
              y={printZone.y}
              width={printZone.width}
              height={printZone.height}
              rx="10"
            />
          </clipPath>
        </defs>

        {/* Studio Floor Soft Contact Shadow */}
        <ellipse
          cx="300"
          cy="620"
          rx="210"
          ry="18"
          fill="url(#studioGroundShadow)"
          filter="blur(5px)"
        />

        {/* ======================================================== */}
        {/* REAL PHOTOGRAPHIC STUDIO GARMENT LAYER                   */}
        {/* ======================================================== */}
        <g id="photorealistic-garment-base">
          <image
            href={colorizedUrl || basePhoto}
            x="30"
            y="25"
            width="540"
            height="585"
            preserveAspectRatio="xMidYMid meet"
            className="transition-opacity duration-200"
            style={{ opacity: isProcessing ? 0.7 : 1 }}
          />
        </g>

        {/* ======================================================== */}
        {/* PRINTABLE BOUNDARY GUIDE (CM DIMENSIONS)                 */}
        {/* ======================================================== */}
        {showPrintZone && (
          <g id="print-zone-guide" className="transition-opacity duration-300">
            <rect
              x={printZone.x}
              y={printZone.y}
              width={printZone.width}
              height={printZone.height}
              rx="8"
              fill="rgba(0, 165, 227, 0.03)"
              stroke="#00A5E3"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <rect
              x={printZone.x + 6}
              y={printZone.y + 6}
              width="130"
              height="18"
              rx="4"
              fill="#e6197e"
              opacity="0.9"
            />
            <text
              x={printZone.x + 12}
              y={printZone.y + 19}
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
              letterSpacing="0.5"
            >
              ÁREA {position === 'ambos' ? 'FRENTE + ESPALDA' : position.toUpperCase()}
            </text>
          </g>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE ARTWORK LAYER WITH REALISTIC DRAGGING        */}
        {/* ======================================================== */}
        {artworkUrl && (
          <g
            id="artwork-interactive-group"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`cursor-grab active:cursor-grabbing transition-transform ${
              isDragging ? 'opacity-90' : 'opacity-100'
            }`}
            style={{ touchAction: 'none' }}
          >
            {/* Transformed Artwork */}
            <g transform={`translate(${artPixelX}, ${artPixelY}) rotate(${rotation})`}>
              <g
                transform={`translate(${-artBoxWidth / 2}, ${-artBoxHeight / 2})`}
                style={getTechniqueStyle()}
              >
                <image
                  href={artworkUrl}
                  width={artBoxWidth}
                  height={artBoxHeight}
                  preserveAspectRatio="xMidYMid meet"
                />

                {/* Subtle Visual Selection Frame while dragging */}
                {isDragging && (
                  <rect
                    x="-3"
                    y="-3"
                    width={artBoxWidth + 6}
                    height={artBoxHeight + 6}
                    fill="none"
                    stroke="#F9DF1B"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    rx="4"
                  />
                )}
              </g>
            </g>
          </g>
        )}

        {/* ======================================================== */}
        {/* REALISTIC WRINKLE BLEND OVERLAY                          */}
        {/* Multiplies real cotton shadows over artwork so it bends! */}
        {/* ======================================================== */}
        {shadowMapUrl && artworkUrl && (
          <image
            href={shadowMapUrl}
            x="30"
            y="25"
            width="540"
            height="585"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none"
            style={{
              mixBlendMode: 'multiply',
              opacity: isDark ? 0.45 : 0.28,
            }}
          />
        )}

        {/* Empty state prompt if no artwork is loaded */}
        {!artworkUrl && (
          <g
            transform={`translate(${artCenterBaseX}, ${artCenterBaseY})`}
            className="pointer-events-none"
          >
            <circle cx="0" cy="-10" r="26" fill="#e2e8f0" opacity="0.75" />
            <text
              x="0"
              y="-3"
              textAnchor="middle"
              fill="#475569"
              fontSize="22"
              fontFamily="sans-serif"
            >
              +
            </text>
            <text
              x="0"
              y="32"
              textAnchor="middle"
              fill="#475569"
              fontSize="12"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              Carga tu diseño o logo
            </text>
          </g>
        )}
      </svg>

      {/* Floating Interactive Badge Helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a20]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2a2a36] text-xs text-[#9ca3af] shadow-lg flex items-center gap-1.5 pointer-events-none">
        <span className="material-symbols-outlined text-[15px] text-[#e6197e]">touch_app</span>
        <span>Arrastra el arte libremente sobre la prenda</span>
      </div>
    </div>
  );
};
