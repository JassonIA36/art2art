 /**
 * Realistic apparel processor for Art2Art
 * Performs flood-fill background segmentation, realistic textile colorization,
 * and crease/shadow map extraction for real photographic mockups.
 */

export interface ProcessedGarmentResult {
  colorizedDataUrl: string;
  shadowMapDataUrl: string;
}

// In-memory cache to ensure instant switching without recomputation
const cache = new Map<string, ProcessedGarmentResult>();

/**
 * Converts hex color string (#RRGGBB) to [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Loads an image from URL into an HTMLImageElement
 */
export function loadImg(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

/**
 * Processes a studio photographic mockup:
 * 1. Isolates the garment from the pure white studio background.
 * 2. Applies realistic textile colorization preserving folds, ribbing, and highlights.
 * 3. Extracts a wrinkle/shadow map used to blend the artwork into real fabric creases.
 */
export async function processRealisticGarment(
  baseImageUrl: string,
  targetHex: string,
  isDarkGarment: boolean
): Promise<ProcessedGarmentResult> {
  const cacheKey = `${baseImageUrl}_${targetHex.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const img = await loadImg(baseImageUrl);
  const size = 640; // High resolution working canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Draw base studio photograph
  ctx.drawImage(img, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  // Step 1: Flood fill background isolation from 4 corners and borders
  const visited = new Uint8Array(size * size);
  const queue: number[] = [];

  // Seed borders
  for (let x = 0; x < size; x++) {
    queue.push(x); // top edge
    queue.push((size - 1) * size + x); // bottom edge
    visited[x] = 1;
    visited[(size - 1) * size + x] = 1;
  }
  for (let y = 1; y < size - 1; y++) {
    queue.push(y * size); // left edge
    queue.push(y * size + (size - 1)); // right edge
    visited[y * size] = 1;
    visited[y * size + (size - 1)] = 1;
  }

  // Flood fill BFS
  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const px = idx % size;
    const py = Math.floor(idx / size);
    const dataIdx = idx * 4;

    const r = data[dataIdx];
    const g = data[dataIdx + 1];
    const b = data[dataIdx + 2];

    // Check if pixel is background (pure white / studio off-white or floor soft drop shadow)
    const isBg = r > 242 && g > 242 && b > 242;

    if (isBg) {
      data[dataIdx + 3] = 0; // Transparent background

      // Check 4 neighbors
      const neighbors = [
        px > 0 ? idx - 1 : -1,
        px < size - 1 ? idx + 1 : -1,
        py > 0 ? idx - size : -1,
        py < size - 1 ? idx + size : -1,
      ];

      for (const n of neighbors) {
        if (n !== -1 && visited[n] === 0) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  // Step 2: Create Shadow Map (for artwork wrinkle blending)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = size;
  shadowCanvas.height = size;
  const shadowCtx = shadowCanvas.getContext('2d');
  const shadowData = shadowCtx?.createImageData(size, size);

  const [tRed, tGreen, tBlue] = hexToRgb(targetHex);
  const isWhite = tRed > 240 && tGreen > 240 && tBlue > 240;
  const isBlack = tRed < 35 && tGreen < 35 && tBlue < 35;

  for (let i = 0; i < size * size; i++) {
    const dIdx = i * 4;
    const alpha = data[dIdx + 3];
    if (alpha === 0) continue;

    const r = data[dIdx];
    const g = data[dIdx + 1];
    const b = data[dIdx + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const normLum = lum / 255;

    // Shadow map: darker creases are recorded
    if (shadowData) {
      const creaseStrength = Math.max(0, 255 - lum);
      shadowData.data[dIdx] = 0;
      shadowData.data[dIdx + 1] = 0;
      shadowData.data[dIdx + 2] = 0;
      shadowData.data[dIdx + 3] = Math.min(255, Math.round(creaseStrength * 0.45));
    }

    // Realistic textile colorization
    if (isWhite) {
      // Keep natural white photograph intact
      continue;
    } else if (isBlack && isDarkGarment) {
      // Natural deep black with visible fabric folds
      const foldShine = Math.pow(normLum, 1.4);
      data[dIdx] = Math.round(20 + foldShine * 60);
      data[dIdx + 1] = Math.round(20 + foldShine * 60);
      data[dIdx + 2] = Math.round(24 + foldShine * 65);
    } else {
      // Color dye model:
      // Shadows (normLum < 0.85) scale target color down
      // Specular highlights (normLum > 0.85) softly reflect studio light
      if (normLum <= 0.85) {
        const factor = normLum / 0.85;
        data[dIdx] = Math.round(tRed * factor);
        data[dIdx + 1] = Math.round(tGreen * factor);
        data[dIdx + 2] = Math.round(tBlue * factor);
      } else {
        const highlight = (normLum - 0.85) / 0.15;
        data[dIdx] = Math.min(255, Math.round(tRed + (255 - tRed) * highlight * 0.7));
        data[dIdx + 1] = Math.min(255, Math.round(tGreen + (255 - tGreen) * highlight * 0.7));
        data[dIdx + 2] = Math.min(255, Math.round(tBlue + (255 - tBlue) * highlight * 0.7));
      }
    }
  }

  // Put processed image data back
  ctx.putImageData(imgData, 0, 0);

  if (shadowCtx && shadowData) {
    shadowCtx.putImageData(shadowData, 0, 0);
  }

  const result: ProcessedGarmentResult = {
    colorizedDataUrl: canvas.toDataURL('image/png'),
    shadowMapDataUrl: shadowCanvas.toDataURL('image/png'),
  };

  cache.set(cacheKey, result);
  return result;
}
