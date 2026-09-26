import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GARMENT_OPTIONS, TECHNIQUE_OPTIONS, getWhatsAppLink } from '../data/mockData';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTechniqueId?: string;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialTechniqueId,
}) => {
  const [selectedGarment, setSelectedGarment] = useState<string>(GARMENT_OPTIONS[0].id);
  const [selectedTechnique, setSelectedTechnique] = useState<string>(
    initialTechniqueId || TECHNIQUE_OPTIONS[0].id
  );
  const [quantity, setQuantity] = useState<number>(12);
  const [includeVectorAdvice, setIncludeVectorAdvice] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const garment = GARMENT_OPTIONS.find((g) => g.id === selectedGarment) || GARMENT_OPTIONS[0];
  const technique = TECHNIQUE_OPTIONS.find((t) => t.id === selectedTechnique) || TECHNIQUE_OPTIONS[0];

  // Calculate volume discount factor
  let discountPercentage = 0;
  if (quantity >= 100) {
    discountPercentage = 0.32;
  } else if (quantity >= 50) {
    discountPercentage = 0.24;
  } else if (quantity >= 24) {
    discountPercentage = 0.16;
  } else if (quantity >= 12) {
    discountPercentage = 0.10;
  } else if (quantity >= 6) {
    discountPercentage = 0.05;
  }

  // Base raw cost
  const rawUnitPrice = garment.basePrice + technique.costPerUnit;
  const discountedUnitPrice = Math.round(rawUnitPrice * (1 - discountPercentage));
  const estimatedTotal = discountedUnitPrice * quantity;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSendToWhatsApp = () => {
    // Trigger festive celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F9DF1B', '#E02424', '#F37023', '#00A5E3', '#25D366'],
      });
    } catch {
      // ignore
    }

    const message = `¡Hola Art2Art! 👋 Estuve cotizando en su calculadora web y deseo confirmar este proyecto:

👕 *Prenda:* ${garment.name}
🎨 *Técnica:* ${technique.name}
📦 *Cantidad:* ${quantity} unidad(es)
🏷️ *Descuento por volumen:* ${(discountPercentage * 100).toFixed(0)}%
💰 *Precio unitario estimado:* ${formatCOP(discountedUnitPrice)}
💵 *Total estimado:* ${formatCOP(estimatedTotal)}
${includeVectorAdvice ? '✨ *Requiere:* Asesoría de diseño/vectorización gratuita' : ''}
${notes ? `📝 *Observaciones:* ${notes}` : ''}

¿Podrían confirmarme los tiempos de entrega y métodos de pago? ¡Muchas gracias!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-surface/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-surface-card max-w-2xl w-full rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5 border border-surface-border my-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">calculate</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                Cotizador Rápido Art2Art
              </h3>
              <p className="font-body-sm text-body-sm text-secondary">
                Simula el valor aproximado de tu proyecto y recíbelo por WhatsApp en 1 clic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-secondary hover:text-on-surface hover:bg-surface-container"
            aria-label="Cerrar cotizador"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Banner to Simulator 2D */}
        <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-border flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
            <span>¿Deseas ver cómo queda tu diseño antes de cotizar?</span>
          </div>
          <a
            href="#simulador"
            onClick={onClose}
            className="text-primary hover:underline font-bold shrink-0 flex items-center gap-0.5"
          >
            <span>Ir al Simulador 2D</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>

        {/* Step 1: Prenda / Producto */}
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">1</span>
            <span>Selecciona el producto o prenda:</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GARMENT_OPTIONS.map((g) => {
              const isSelected = selectedGarment === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGarment(g.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary-fixed/20 shadow-sm text-on-surface ring-1 ring-primary'
                      : 'border-surface-border hover:border-primary/40 bg-surface-card text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="material-symbols-outlined text-[20px] text-primary">{g.imageIcon}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    )}
                  </div>
                  <span className="font-label-sm text-label-sm mt-1.5 font-semibold text-on-surface leading-snug">
                    {g.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Técnica */}
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">2</span>
            <span>Selecciona la técnica de estampado:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TECHNIQUE_OPTIONS.map((t) => {
              const isSelected = selectedTechnique === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTechnique(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-tertiary bg-secondary-fixed/30 shadow-sm ring-1 ring-tertiary text-on-surface'
                      : 'border-surface-border hover:border-tertiary/40 bg-surface-card text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold text-on-surface">{t.name}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                    )}
                  </div>
                  <p className="text-xs text-secondary mt-1">Recomendado para: {t.recommendedGarment}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Cantidad */}
        <div className="space-y-2 bg-surface-container-low p-4 rounded-xl border border-surface-border">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center font-bold">3</span>
              <span>Cantidad de unidades:</span>
            </label>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {quantity} <span className="text-sm font-normal text-secondary">uds</span>
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="range"
              min={technique.id === 'serigrafia' ? 12 : 1}
              max={250}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer h-2 bg-surface-container-highest rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-secondary pt-1 flex-wrap gap-1">
            <span>Mínimo: {technique.id === 'serigrafia' ? '12 uds' : '1 ud'}</span>
            {discountPercentage > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-whatsapp-green/20 text-whatsapp-dark font-bold">
                🎉 Descuento aplicado: {(discountPercentage * 100).toFixed(0)}% por volumen
              </span>
            ) : (
              <span className="text-secondary/70">A partir de 12 uds obtienes descuento progresivo</span>
            )}
          </div>
        </div>

        {/* Optional Add-ons */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-label-md text-on-surface">
            <input
              type="checkbox"
              checked={includeVectorAdvice}
              onChange={(e) => setIncludeVectorAdvice(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
            />
            <span>Deseo asesoría para optimizar/vectorizar mi diseño sin costo</span>
          </label>

          <input
            type="text"
            placeholder="Comentarios adicionales (color de camiseta, tallas, etc.)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg bg-surface-container border border-surface-border text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        {/* Total & Action Box */}
        <div className="p-4 rounded-xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-border">
          <div>
            <span className="text-xs text-secondary block">Presupuesto Estimado</span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                {formatCOP(estimatedTotal)}
              </span>
              <span className="text-xs text-secondary">
                ({formatCOP(discountedUnitPrice)} / ud)
              </span>
            </div>
            <span className="text-[11px] text-secondary/80 block mt-0.5">
              *Los valores finales pueden variar según número de estampados por prenda y tamaño del arte.
            </span>
          </div>

          <button
            type="button"
            onClick={handleSendToWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-whatsapp-green hover:bg-whatsapp-dark text-on-primary font-label-md text-label-md shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Confirmar en WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
