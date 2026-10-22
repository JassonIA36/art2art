// Modo edición del dueño (solo se carga en /admin con sesión válida).
// Toda la interfaz se arma con textContent: nada de lo que viene de la base se pone como HTML.
import { getContent, isSafeHref, setText } from './content';

type Change =
  | { tipo: 'texto'; valor: string }
  | { tipo: 'enlace'; valor: string }
  | { tipo: 'imagen'; blob: Blob; preview: string }
  | { tipo: 'restaurar' };

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// 'Ver página' vuelve a la página pública del mismo dominio.
const SITE_URL = '/';
const BAR_HEIGHT = 52;
const MAX_SIDE = 1200;
const TARGET_BYTES = 200 * 1024;
const SERVER_MAX_BYTES = 500 * 1024;
const MAX_TEXT = 2000;

const pending = new Map<string, Change>();
// Lo que hoy está guardado en D1 (clave -> valor). Si una clave no está, se ve el original.
const saved: Record<string, string> = { ...getContent() };

let barEl: HTMLElement;
let saveBtn: HTMLButtonElement;
let cancelBtn: HTMLButtonElement;
let statusEl: HTMLElement;
let busy = false;

/* ---------------------------------------------------------------- */
/* Utilidades                                                        */
/* ---------------------------------------------------------------- */

type Attrs = Record<string, string | boolean | ((ev: Event) => void)>;

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) {
    if (typeof value === 'function') el.addEventListener(name.replace(/^on/, ''), value);
    else if (value === true) el.setAttribute(name, '');
    else if (value !== false) el.setAttribute(name, value);
  }
  for (const child of children) el.append(child);
  return el;
}

const cssKey = (key: string) => CSS.escape(key);
const textEls = (key: string) => document.querySelectorAll<HTMLElement>(`[data-edit="${cssKey(key)}"]`);
const imgEls = (key: string) => document.querySelectorAll<HTMLImageElement>(`[data-edit-img="${cssKey(key)}"]`);
const hrefEls = (key: string) => document.querySelectorAll<HTMLAnchorElement>(`[data-edit-href="${cssKey(key)}"]`);

function humanize(key: string) {
  const text = key.replace(/[_-]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function originalOf(key: string): string {
  const el = document.querySelector<HTMLElement>(
    `[data-edit="${cssKey(key)}"],[data-edit-img="${cssKey(key)}"],[data-edit-href="${cssKey(key)}"]`
  );
  return el?.dataset.a2aOrig ?? '';
}

function isModified(key: string): boolean {
  const change = pending.get(key);
  if (change) return change.tipo !== 'restaurar';
  return saved[key] !== undefined;
}

function kb(bytes: number) {
  return `${Math.round(bytes / 1024)} KB`;
}

/* ---------------------------------------------------------------- */
/* Estilos                                                           */
/* ---------------------------------------------------------------- */

function injectStyles() {
  const css = `
  html.a2a-edit body{padding-top:${BAR_HEIGHT}px}
  html.a2a-edit header.sticky{top:${BAR_HEIGHT}px !important}
  /* El carrusel animado de la portada se vuelve una fila que se desliza con el dedo o el mouse, para llegar a todas las tarjetas. */
  html.a2a-edit [aria-label="Prendas hechas en Art2Art"]{overflow-x:auto !important;-webkit-mask-image:none !important;mask-image:none !important;-webkit-overflow-scrolling:touch}
  html.a2a-edit .animate-menu-marquee{animation:none !important;transform:none !important}
  html.a2a-edit .animate-menu-marquee > [aria-hidden="true"]{display:none !important}
  html.a2a-edit [data-edit]{outline:1px dashed rgba(220,12,28,.55);outline-offset:2px;cursor:text;-webkit-user-select:text;user-select:text}
  html.a2a-edit [data-edit]:focus{outline:2px solid #dc0c1c;background-color:rgba(220,12,28,.06)}
  .a2a-ui,.a2a-ui *{box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;letter-spacing:0}
  .a2a-bar{position:fixed;top:0;left:0;right:0;height:${BAR_HEIGHT}px;z-index:2147483000;display:flex;align-items:center;gap:8px;padding:0 12px;background:#0b0b0b;color:#fff;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}
  .a2a-bar .a2a-title{font-weight:700;font-size:14px;margin-right:4px}
  .a2a-bar .a2a-status{font-size:12px;opacity:.7;margin-right:auto;padding-right:8px}
  .a2a-btn{flex:none;height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;font-size:13px;font-weight:600;cursor:pointer}
  .a2a-btn:hover:not(:disabled){background:rgba(255,255,255,.12)}
  .a2a-btn:disabled{opacity:.35;cursor:default}
  .a2a-btn.primary{background:#fff;color:#000;border-color:#fff}
  .a2a-btn.primary:hover:not(:disabled){background:#e5e5e5}
  .a2a-layer{position:fixed;inset:0;z-index:2147482000;pointer-events:none}
  .a2a-imgctl{position:fixed;display:none;gap:6px;pointer-events:auto}
  .a2a-chip{height:36px;padding:0 12px;border-radius:999px;border:0;background:#000;color:#fff;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.35)}
  .a2a-chip.light{background:#fff;color:#000}
  .a2a-pill{position:fixed;display:none;z-index:2147482500;height:30px;padding:0 12px;border-radius:999px;border:0;background:#dc0c1c;color:#fff;font-size:12px;font-weight:600;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.35)}
  .a2a-overlay{position:fixed;inset:0;z-index:2147483500;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:16px}
  .a2a-modal{width:100%;max-width:440px;max-height:90vh;overflow:auto;background:#fff;color:#000;border-radius:20px;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.35)}
  .a2a-modal h2{margin:0 0 12px;font-size:18px;font-weight:700}
  .a2a-modal p{margin:0 0 12px;font-size:14px;line-height:1.45;color:rgba(0,0,0,.7)}
  .a2a-modal label{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;font-size:13px;font-weight:600}
  .a2a-modal input,.a2a-side input{height:42px;padding:0 12px;border:1px solid rgba(0,0,0,.2);border-radius:12px;font-size:16px;color:#000;background:#fff;width:100%}
  .a2a-modal img.preview{display:block;width:100%;max-height:50vh;object-fit:contain;border-radius:12px;background:#f3f3f3;margin-bottom:10px}
  .a2a-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:6px;flex-wrap:wrap}
  .a2a-actions .a2a-btn{border-color:rgba(0,0,0,.2);color:#000}
  .a2a-actions .a2a-btn:hover:not(:disabled){background:rgba(0,0,0,.06)}
  .a2a-actions .a2a-btn.primary{background:#000;color:#fff;border-color:#000}
  .a2a-actions .a2a-btn.primary:hover:not(:disabled){background:#262626}
  .a2a-err{min-height:18px;margin:0 0 8px;font-size:13px;color:#b91c1c}
  .a2a-side{position:fixed;top:${BAR_HEIGHT}px;right:0;bottom:0;width:min(420px,100vw);z-index:2147483200;background:#fff;color:#000;border-left:1px solid rgba(0,0,0,.12);box-shadow:-8px 0 30px rgba(0,0,0,.15);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .2s}
  .a2a-side.open{transform:none}
  .a2a-side header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(0,0,0,.1);font-weight:700}
  .a2a-side header button{height:32px;width:32px;border:0;border-radius:50%;background:rgba(0,0,0,.06);font-size:18px;cursor:pointer}
  .a2a-side .a2a-list{flex:1;overflow:auto;padding:12px 16px 24px;display:flex;flex-direction:column;gap:14px}
  .a2a-row{display:flex;flex-direction:column;gap:6px}
  .a2a-row .a2a-name{font-size:13px;font-weight:700}
  .a2a-row .a2a-hint{font-size:12px;color:rgba(0,0,0,.5)}
  .a2a-row .a2a-rowerr{font-size:12px;color:#b91c1c;min-height:0}
  .a2a-row button{align-self:flex-start;height:28px;padding:0 10px;border-radius:999px;border:1px solid rgba(0,0,0,.2);background:#fff;font-size:12px;font-weight:600;cursor:pointer}
  .a2a-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483600;max-width:calc(100vw - 32px);padding:12px 18px;border-radius:999px;background:#0b0b0b;color:#fff;font-size:14px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  .a2a-toast.error{background:#b91c1c}
  .a2a-toast.ok{background:#15803d}
  @media (max-width:640px){
    .a2a-bar .a2a-title{display:none}
    .a2a-btn{padding:0 11px}
  }`;
  document.head.append(h('style', { 'data-a2a': '' }, css));
}

/* ---------------------------------------------------------------- */
/* Mensajes y modales propios (sin alert/confirm/prompt)              */
/* ---------------------------------------------------------------- */

let toastTimer = 0;
function toast(message: string, kind: 'ok' | 'error' | 'info' = 'info') {
  document.querySelector('.a2a-toast')?.remove();
  const el = h('div', { class: `a2a-ui a2a-toast ${kind}`, role: 'status' }, message);
  document.body.append(el);
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.remove(), kind === 'error' ? 5000 : 2800);
}

interface ModalAction {
  label: string;
  primary?: boolean;
  keepOpen?: boolean;
  onClick: () => void | Promise<void>;
}

function modal(title: string, body: (Node | string)[], actions: ModalAction[]) {
  const overlay = h('div', { class: 'a2a-ui a2a-overlay' });
  const close = () => overlay.remove();
  const box = h('div', { class: 'a2a-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title }, h('h2', {}, title), ...body);
  const buttons = actions.map((a) =>
    h(
      'button',
      {
        type: 'button',
        class: `a2a-btn${a.primary ? ' primary' : ''}`,
        onclick: async () => {
          await a.onClick();
          if (!a.keepOpen) close();
        },
      },
      a.label
    )
  );
  box.append(h('div', { class: 'a2a-actions' }, ...buttons));
  overlay.append(box);
  overlay.addEventListener('mousedown', (ev) => {
    if (ev.target === overlay) close();
  });
  document.body.append(overlay);
  return { close, overlay };
}

function confirmModal(title: string, text: string, okLabel: string): Promise<boolean> {
  return new Promise((resolve) => {
    let answered = false;
    const answer = (value: boolean) => {
      if (!answered) {
        answered = true;
        resolve(value);
      }
    };
    const { overlay } = modal(title, [h('p', {}, text)], [
      { label: 'Volver', onClick: () => answer(false) },
      { label: okLabel, primary: true, onClick: () => answer(true) },
    ]);
    new MutationObserver(() => {
      if (!overlay.isConnected) answer(false);
    }).observe(document.body, { childList: true });
  });
}

/* ---------------------------------------------------------------- */
/* API                                                               */
/* ---------------------------------------------------------------- */

async function api(path: string, init: RequestInit): Promise<Record<string, unknown>> {
  let res: Response;
  try {
    res = await fetch(path, { credentials: 'same-origin', ...init });
  } catch {
    throw new ApiError('Sin conexión', 0);
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) throw new ApiError(typeof data.error === 'string' ? data.error : 'Error', res.status);
  return data;
}

const postJson = (path: string, body: unknown) =>
  api(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

function sessionExpired() {
  toast('Tu sesión venció. Entra de nuevo para guardar.', 'error');
  window.setTimeout(() => location.replace('/admin'), 1800);
}

/* ---------------------------------------------------------------- */
/* Cambios pendientes                                                */
/* ---------------------------------------------------------------- */

function refreshBar() {
  const n = pending.size;
  saveBtn.disabled = busy || n === 0;
  cancelBtn.disabled = busy || n === 0;
  statusEl.textContent = n === 0 ? 'Sin cambios' : `${n} cambio${n === 1 ? '' : 's'} sin guardar`;
}

function setPending(key: string, change: Change | null) {
  const old = pending.get(key);
  if (old && old.tipo === 'imagen') URL.revokeObjectURL(old.preview);
  if (change) pending.set(key, change);
  else pending.delete(key);
  refreshBar();
}

/** Texto editado a mano en la página. */
function onTextInput(el: HTMLElement) {
  const key = el.dataset.edit;
  if (!key) return;
  const value = el.textContent ?? '';
  // Los elementos que comparten clave (por ejemplo la dirección) se mantienen iguales.
  textEls(key).forEach((other) => {
    if (other !== el) setText(other, value);
  });
  const current = saved[key] ?? originalOf(key);
  if (value === current) setPending(key, null);
  else setPending(key, { tipo: 'texto', valor: value });
  positionPill();
}

function restoreKey(key: string) {
  const original = originalOf(key);
  textEls(key).forEach((el) => setText(el, original));
  imgEls(key).forEach((img) => {
    img.removeAttribute('srcset');
    img.setAttribute('src', original);
  });
  hrefEls(key).forEach((a) => a.setAttribute('href', original));
  if (saved[key] !== undefined) setPending(key, { tipo: 'restaurar' });
  else setPending(key, null);
  positionPill();
  if (sideOpen) renderLinks();
}

/* ---------------------------------------------------------------- */
/* Texto: edición en la página + botón "Restaurar original"          */
/* ---------------------------------------------------------------- */

let pill: HTMLButtonElement;
let pillTarget: HTMLElement | null = null;

function positionPill() {
  const el = pillTarget;
  const key = el?.dataset.edit;
  if (!el || !key || !el.isConnected || !isModified(key)) {
    pill.style.display = 'none';
    return;
  }
  const rect = el.getBoundingClientRect();
  if (rect.bottom < BAR_HEIGHT || rect.top > window.innerHeight) {
    pill.style.display = 'none';
    return;
  }
  pill.style.display = 'block';
  const top = Math.max(BAR_HEIGHT + 4, rect.top - 34);
  pill.style.top = `${top}px`;
  pill.style.left = `${Math.min(Math.max(8, rect.left), window.innerWidth - 150)}px`;
}

function setupTextEditing() {
  const prepare = (root: ParentNode) => {
    root.querySelectorAll<HTMLElement>('[data-edit]').forEach((el) => {
      if (el.getAttribute('contenteditable') !== 'true') {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
        el.setAttribute('role', 'textbox');
      }
    });
  };
  prepare(document);
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType === Node.ELEMENT_NODE) {
          const node = n as HTMLElement;
          if (node.matches('[data-edit]')) prepare(node.parentNode ?? document);
          prepare(node);
        }
      });
    }
  }).observe(document.body, { childList: true, subtree: true });

  const editable = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('[data-edit]') : null);

  document.addEventListener('input', (ev) => {
    const el = editable(ev.target);
    if (el) onTextInput(el);
  });

  // Pegar siempre como texto plano y en una sola línea.
  document.addEventListener('paste', (ev) => {
    const el = editable(ev.target);
    if (!el) return;
    ev.preventDefault();
    const text = (ev.clipboardData?.getData('text/plain') ?? '').replace(/\s*\n\s*/g, ' ');
    document.execCommand('insertText', false, text);
  });

  document.addEventListener('keydown', (ev) => {
    const el = editable(ev.target);
    if (!el) return;
    if (ev.key === 'Enter') {
      ev.preventDefault();
      el.blur();
    }
    ev.stopPropagation(); // la barra espaciadora no debe activar el botón que contiene el texto
  }, true);
  document.addEventListener('keyup', (ev) => {
    if (editable(ev.target)) ev.stopPropagation();
  }, true);

  document.addEventListener('beforeinput', (ev) => {
    const el = editable(ev.target);
    if (!el) return;
    if (ev.inputType === 'insertParagraph' || ev.inputType === 'insertLineBreak') ev.preventDefault();
  });

  const track = (ev: Event) => {
    const el = editable(ev.target);
    if (el) {
      pillTarget = el;
      positionPill();
    }
  };
  document.addEventListener('focusin', track);
  document.addEventListener('mouseover', track);
  document.addEventListener('focusout', (ev) => {
    const el = editable(ev.target);
    if (!el) return;
    const value = (el.textContent ?? '').trim();
    if (value === '') {
      // Un texto no puede quedar vacío: se vuelve al valor anterior.
      const key = el.dataset.edit as string;
      const fallback = saved[key] ?? originalOf(key);
      textEls(key).forEach((e) => setText(e, fallback));
      setPending(key, null);
      toast('El texto no puede quedar vacío', 'error');
    } else if (value.length > MAX_TEXT) {
      toast(`Máximo ${MAX_TEXT} caracteres por texto`, 'error');
    }
  });
  window.addEventListener('scroll', positionPill, { passive: true });
  window.addEventListener('resize', positionPill);

  // En modo edición los enlaces y botones no se activan al hacer clic sobre su texto editable.
  document.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!(target instanceof Element) || target.closest('.a2a-ui')) return;
    const link = target.closest('a');
    if (editable(target)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else if (link && !(link.getAttribute('href') ?? '').startsWith('#')) {
      ev.preventDefault();
      ev.stopPropagation();
      toast('Los enlaces se cambian desde el botón "Enlaces"', 'info');
    }
  }, true);
}

/* ---------------------------------------------------------------- */
/* Fotos                                                             */
/* ---------------------------------------------------------------- */

interface ImgControl {
  img: HTMLImageElement;
  box: HTMLElement;
  restore: HTMLButtonElement;
}
const imgControls = new Map<HTMLImageElement, ImgControl>();
let fileInput: HTMLInputElement;
let fileKey = '';

async function loadBitmap(file: File): Promise<{ source: CanvasImageSource; width: number; height: number }> {
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(file);
      return { source: bmp, width: bmp.width, height: bmp.height };
    } catch {
      /* se intenta con <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('No se pudo leer la imagen'));
      i.src = url;
    });
    return { source: img, width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    URL.revokeObjectURL(url);
  }
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

/** Reduce a 1200 px de lado largo y convierte a WebP (calidad 0.8, bajando hasta quedar < 200 KB). */
async function compressImage(file: File): Promise<Blob> {
  const { source, width, height } = await loadBitmap(file);
  if (!width || !height) throw new Error('Imagen vacía');
  let scale = Math.min(1, MAX_SIDE / Math.max(width, height));
  let best: Blob | null = null;

  for (let attempt = 0; attempt < 6; attempt++) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('El navegador no pudo procesar la imagen');
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

    for (let quality = 0.8; quality >= 0.29; quality -= 0.1) {
      // Si el navegador no sabe crear WebP devuelve PNG: en ese caso se usa JPEG.
      let blob = await toBlob(canvas, 'image/webp', quality);
      if (blob && blob.type !== 'image/webp') blob = await toBlob(canvas, 'image/jpeg', quality);
      if (!blob) continue;
      best = blob;
      if (blob.size <= TARGET_BYTES) return blob;
    }
    scale *= 0.8;
  }
  if (best && best.size <= SERVER_MAX_BYTES) return best;
  throw new Error('No se pudo reducir la foto lo suficiente. Prueba con otra imagen.');
}

async function onFileChosen() {
  const file = fileInput.files?.[0];
  const key = fileKey;
  fileInput.value = '';
  if (!file || !key) return;
  if (!file.type.startsWith('image/')) {
    toast('Elige un archivo de imagen', 'error');
    return;
  }
  toast('Preparando la foto...', 'info');
  let blob: Blob;
  try {
    blob = await compressImage(file);
  } catch (err) {
    toast(err instanceof Error ? err.message : 'No se pudo preparar la foto', 'error');
    return;
  }
  document.querySelector('.a2a-toast')?.remove();

  const preview = URL.createObjectURL(blob);
  let used = false;
  const { overlay } = modal(
    'Vista previa de la foto',
    [
      h('img', { class: 'preview', src: preview, alt: 'Vista previa' }),
      h('p', {}, `Tamaño final: ${kb(blob.size)}. Así se verá en la página (recortada según el espacio).`),
    ],
    [
      { label: 'Cancelar', onClick: () => undefined },
      {
        label: 'Usar esta foto',
        primary: true,
        onClick: () => {
          used = true;
          imgEls(key).forEach((img) => {
            img.removeAttribute('srcset');
            img.setAttribute('src', preview);
          });
          setPending(key, { tipo: 'imagen', blob, preview });
        },
      },
    ]
  );
  new MutationObserver((_m, obs) => {
    if (!overlay.isConnected) {
      if (!used) URL.revokeObjectURL(preview);
      obs.disconnect();
    }
  }).observe(document.body, { childList: true });
}

function syncImageControls() {
  const present = new Set<HTMLImageElement>();
  document.querySelectorAll<HTMLImageElement>('[data-edit-img]').forEach((img) => {
    present.add(img);
    if (imgControls.has(img)) return;
    const key = img.dataset.editImg as string;
    const change = h('button', {
      type: 'button',
      class: 'a2a-chip',
      onclick: () => {
        fileKey = key;
        fileInput.click();
      },
    }, 'Cambiar foto');
    const restore = h('button', { type: 'button', class: 'a2a-chip light', onclick: () => restoreKey(key) }, 'Restaurar original');
    const box = h('div', { class: 'a2a-imgctl' }, change, restore);
    layer.append(box);
    imgControls.set(img, { img, box, restore });
  });
  for (const [img, ctl] of imgControls) {
    if (!present.has(img) || !img.isConnected) {
      ctl.box.remove();
      imgControls.delete(img);
    }
  }
}

function positionImageControls() {
  for (const { img, box, restore } of imgControls.values()) {
    const rect = img.getBoundingClientRect();
    const visible = rect.width > 60 && rect.height > 40 && rect.bottom > BAR_HEIGHT + 40 && rect.top < window.innerHeight - 20 && rect.right > 40 && rect.left < window.innerWidth - 40;
    let show = visible;
    if (visible) {
      // Solo se muestra si la foto realmente se ve en pantalla (no tapada por el menú ni recortada).
      const x = Math.min(Math.max(rect.left + rect.width / 2, 1), window.innerWidth - 1);
      const y = Math.min(Math.max(rect.top + rect.height / 2, BAR_HEIGHT + 1), window.innerHeight - 1);
      const top = document.elementFromPoint(x, y);
      show = !!top && (top === img || top.contains(img) || img.contains(top) || top.closest('a,div') === img.closest('a,div'));
    }
    if (!show) {
      box.style.display = 'none';
      continue;
    }
    const key = img.dataset.editImg as string;
    restore.style.display = isModified(key) ? 'inline-block' : 'none';
    box.style.display = 'flex';
    box.style.top = `${Math.max(BAR_HEIGHT + 8, rect.top + 8)}px`;
    box.style.left = `${Math.max(8, Math.min(rect.left + 8, window.innerWidth - 8 - box.offsetWidth))}px`;
  }
}

let layer: HTMLElement;
function startImageControls() {
  layer = h('div', { class: 'a2a-ui a2a-layer' });
  document.body.append(layer);
  fileInput = h('input', { type: 'file', accept: 'image/*', hidden: true, 'aria-hidden': 'true', onchange: () => void onFileChosen() });
  document.body.append(fileInput);

  let last = 0;
  const loop = (now: number) => {
    if (!document.hidden) {
      if (now - last > 600) {
        syncImageControls();
        last = now;
      }
      positionImageControls();
    }
    requestAnimationFrame(loop);
  };
  syncImageControls();
  requestAnimationFrame(loop);
}

/* ---------------------------------------------------------------- */
/* Panel lateral de enlaces                                          */
/* ---------------------------------------------------------------- */

let sideEl: HTMLElement;
let sideList: HTMLElement;
let sideOpen = false;

function currentHref(key: string): string {
  const change = pending.get(key);
  if (change && change.tipo === 'enlace') return change.valor;
  const el = hrefEls(key)[0];
  return el?.getAttribute('href') ?? '';
}

function renderLinks() {
  sideList.replaceChildren();
  const keys = [...new Set([...document.querySelectorAll<HTMLElement>('[data-edit-href]')].map((el) => el.dataset.editHref as string))];
  for (const key of keys) {
    const sample = hrefEls(key)[0];
    const hint = (sample?.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60);
    const input = h('input', { type: 'url', value: currentHref(key), inputmode: 'url', autocomplete: 'off', 'aria-label': humanize(key) });
    const err = h('div', { class: 'a2a-rowerr' });
    input.addEventListener('input', () => {
      const value = input.value.trim();
      if (value.length > MAX_TEXT || !isSafeHref(value)) {
        err.textContent = 'Debe empezar con https://, mailto:, tel: o #';
        return;
      }
      err.textContent = '';
      hrefEls(key).forEach((a) => a.setAttribute('href', value));
      const base = saved[key] ?? originalOf(key);
      if (value === base) setPending(key, null);
      else setPending(key, { tipo: 'enlace', valor: value });
    });
    const row = h('div', { class: 'a2a-row' }, h('div', { class: 'a2a-name' }, humanize(key)));
    if (hint) row.append(h('div', { class: 'a2a-hint' }, `Botón o enlace: "${hint}"`));
    row.append(input, err);
    if (isModified(key)) row.append(h('button', { type: 'button', onclick: () => restoreKey(key) }, 'Restaurar original'));
    sideList.append(row);
  }
}

function buildSidePanel() {
  sideList = h('div', { class: 'a2a-list' });
  sideEl = h(
    'aside',
    { class: 'a2a-ui a2a-side', 'aria-label': 'Enlaces de la página' },
    h('header', {}, h('span', {}, 'Enlaces y botones'), h('button', { type: 'button', 'aria-label': 'Cerrar', onclick: () => toggleSide(false) }, 'x')),
    sideList
  );
  document.body.append(sideEl);
}

function toggleSide(open = !sideOpen) {
  sideOpen = open;
  if (open) renderLinks();
  sideEl.classList.toggle('open', open);
}

/* ---------------------------------------------------------------- */
/* Guardar, cancelar, clave y sesión                                  */
/* ---------------------------------------------------------------- */

async function sendChange(key: string, change: Change) {
  if (change.tipo === 'texto' || change.tipo === 'enlace') {
    await postJson('/api/contenido', { clave: key, valor: change.valor, tipo: change.tipo });
    saved[key] = change.valor;
  } else if (change.tipo === 'imagen') {
    const form = new FormData();
    form.append('clave', key);
    form.append('archivo', new File([change.blob], 'foto.webp', { type: change.blob.type }));
    const data = await api('/api/imagen', { method: 'POST', body: form });
    saved[key] = String(data.id);
    imgEls(key).forEach((img) => {
      img.setAttribute('src', `/img/${saved[key]}`);
    });
  } else {
    await postJson('/api/restaurar', { clave: key });
    delete saved[key];
  }
}

async function saveAll() {
  if (busy || pending.size === 0) return;
  busy = true;
  refreshBar();
  let failed = 0;
  let expired = false;
  for (const [key, change] of [...pending]) {
    try {
      await sendChange(key, change);
      setPending(key, null);
    } catch (err) {
      failed++;
      if (err instanceof ApiError && err.status === 401) {
        expired = true;
        break;
      }
    }
  }
  busy = false;
  refreshBar();
  positionPill();
  if (sideOpen) renderLinks();
  if (expired) sessionExpired();
  else if (failed) toast('Error al guardar, intenta de nuevo', 'error');
  else toast('Guardado', 'ok');
}

async function cancelAll() {
  if (pending.size === 0) return;
  const ok = await confirmModal('Descartar cambios', 'Se perderán los cambios que no has guardado.', 'Descartar');
  if (!ok) return;
  pending.clear();
  location.reload();
}

function openPasswordModal() {
  const current = h('input', { type: 'password', autocomplete: 'current-password' });
  const next = h('input', { type: 'password', autocomplete: 'new-password' });
  const repeat = h('input', { type: 'password', autocomplete: 'new-password' });
  const err = h('p', { class: 'a2a-err', role: 'alert' });
  modal(
    'Cambiar clave',
    [
      h('label', {}, 'Clave actual', current),
      h('label', {}, 'Clave nueva (mínimo 10 caracteres)', next),
      h('label', {}, 'Repite la clave nueva', repeat),
      err,
    ],
    [
      { label: 'Cancelar', onClick: () => undefined },
      {
        label: 'Cambiar clave',
        primary: true,
        keepOpen: true,
        onClick: async function () {
          err.textContent = '';
          if (next.value.length < 10) return void (err.textContent = 'La clave nueva debe tener al menos 10 caracteres');
          if (next.value !== repeat.value) return void (err.textContent = 'Las claves nuevas no coinciden');
          try {
            await postJson('/api/clave', { actual: current.value, nueva: next.value });
            document.querySelector('.a2a-overlay')?.remove();
            toast('Clave cambiada', 'ok');
          } catch (e) {
            if (e instanceof ApiError && e.status === 401) return sessionExpired();
            err.textContent = e instanceof ApiError ? e.message : 'No se pudo cambiar la clave';
          }
        },
      },
    ]
  );
  current.focus();
}

/** Vuelve a la página pública (sin cerrar la sesión). */
async function viewSite() {
  if (pending.size > 0) {
    const ok = await confirmModal('Volver a la página', 'Tienes cambios sin guardar. Si sales ahora se perderán.', 'Salir sin guardar');
    if (!ok) return;
  }
  pending.clear();
  location.href = SITE_URL;
}

async function logout() {
  if (pending.size > 0) {
    const ok = await confirmModal('Cerrar sesión', 'Tienes cambios sin guardar. Si sales ahora se perderán.', 'Salir sin guardar');
    if (!ok) return;
  }
  pending.clear();
  try {
    await postJson('/api/logout', {});
  } catch {
    /* si falla, la sesión vence sola a las 8 horas */
  }
  location.replace('/admin');
}

/* ---------------------------------------------------------------- */
/* Arranque                                                          */
/* ---------------------------------------------------------------- */

function buildBar() {
  saveBtn = h('button', { type: 'button', class: 'a2a-btn primary', onclick: () => void saveAll() }, 'Guardar');
  cancelBtn = h('button', { type: 'button', class: 'a2a-btn', onclick: () => void cancelAll() }, 'Cancelar');
  statusEl = h('span', { class: 'a2a-status' });
  barEl = h(
    'div',
    { class: 'a2a-ui a2a-bar', role: 'toolbar', 'aria-label': 'Barra de edición' },
    h('button', { type: 'button', class: 'a2a-btn', onclick: () => void viewSite() }, '← Ver página'),
    saveBtn,
    cancelBtn,
    statusEl,
    h('button', { type: 'button', class: 'a2a-btn', onclick: () => toggleSide() }, 'Enlaces'),
    h('button', { type: 'button', class: 'a2a-btn', onclick: openPasswordModal }, 'Cambiar clave'),
    h('button', { type: 'button', class: 'a2a-btn', onclick: () => void logout() }, 'Cerrar sesión')
  );
  document.body.append(barEl);
  refreshBar();
}

export function startEditMode() {
  document.documentElement.classList.add('a2a-edit');
  injectStyles();
  buildBar();
  buildSidePanel();
  pill = h('button', { type: 'button', class: 'a2a-ui a2a-pill', onclick: () => pillTarget?.dataset.edit && restoreKey(pillTarget.dataset.edit) }, 'Restaurar original');
  // mousedown evita que el texto pierda el foco antes de restaurar
  pill.addEventListener('mousedown', (ev) => ev.preventDefault());
  document.body.append(pill);
  setupTextEditing();
  startImageControls();

  window.addEventListener('beforeunload', (ev) => {
    if (pending.size > 0) {
      ev.preventDefault();
      ev.returnValue = '';
    }
  });
}
