// Aplica sobre la página lo que el dueño guardó en D1 (el Worker lo inyecta en window.__A2A__).
// El texto, las fotos y los enlaces originales siguen escritos en los componentes: si no hay
// datos guardados (o la base falla), no se toca nada y la página se ve igual que siempre.

export interface A2AData {
  c: Record<string, string>;
  admin?: boolean;
  /** Páginas editables (las agrega el Worker en modo admin): para el selector "Páginas" de la barra. */
  pages?: { slug: string; label: string }[];
}

declare global {
  interface Window {
    __A2A__?: A2AData;
  }
}

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/i;
const IMAGE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SELECTOR = '[data-edit],[data-edit-img],[data-edit-href]';

export const isSafeHref = (value: string) => SAFE_HREF.test(value.trim());
export const getContent = (): Record<string, string> => window.__A2A__?.c ?? {};

// Si el elemento solo tiene un texto, se cambia ese nodo para no estorbar a React.
export function setText(el: Element, value: string) {
  const first = el.firstChild;
  if (el.childNodes.length === 1 && first && first.nodeType === Node.TEXT_NODE) {
    first.nodeValue = value;
  } else {
    el.textContent = value;
  }
}

function applyElement(el: HTMLElement, content: Record<string, string>) {
  if (el.dataset.a2aDone) return;
  el.dataset.a2aDone = '1';

  const textKey = el.getAttribute('data-edit');
  if (textKey) {
    el.dataset.a2aOrig = el.textContent ?? '';
    const value = content[textKey];
    if (typeof value === 'string') setText(el, value);
  }

  const imgKey = el.getAttribute('data-edit-img');
  if (imgKey && el instanceof HTMLImageElement) {
    el.dataset.a2aOrig = el.getAttribute('src') ?? '';
    const id = content[imgKey];
    if (typeof id === 'string' && IMAGE_ID.test(id)) {
      el.removeAttribute('srcset');
      el.setAttribute('src', `/img/${id}`);
    }
  }

  const hrefKey = el.getAttribute('data-edit-href');
  if (hrefKey) {
    el.dataset.a2aOrig = el.getAttribute('href') ?? '';
    const href = content[hrefKey];
    if (typeof href === 'string' && isSafeHref(href)) el.setAttribute('href', href.trim());
  }
}

function applyTree(root: ParentNode, content: Record<string, string>) {
  if (root instanceof HTMLElement && root.matches(SELECTOR)) applyElement(root, content);
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => applyElement(el, content));
}

export function startContent() {
  const content = getContent();
  applyTree(document, content);

  // React dibuja secciones después (respuestas del FAQ, menú móvil...): se aplican al aparecer.
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) applyTree(node as HTMLElement, content);
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}
