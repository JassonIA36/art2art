// Worker de Art2Art: sirve la página, aplica lo que el dueño editó (D1) y expone el panel /admin.
// El contenido original vive en el código de la página; D1 solo guarda lo que el dueño cambió.

const COOKIE = '__Host-a2a_sesion';
const SESSION_SECONDS = 8 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILS = 5;
const PBKDF2_ITERATIONS = 100000;
const MAX_TEXT = 2000;
const MAX_IMAGE_BYTES = 500 * 1024;
const IMAGE_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
const KEY_RE = /^[a-z0-9_-]{1,100}$/;
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SAFE_HREF_RE = /^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/i;

export default {
  async fetch(request, env, ctx) {
    try {
      return await route(request, env, ctx);
    } catch (err) {
      console.error('Error no controlado', err && err.stack ? err.stack : err);
      return json({ error: 'Error interno del servidor' }, 500);
    }
  },
};

async function route(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path.startsWith('/img/')) {
    if (method !== 'GET' && method !== 'HEAD') return json({ error: 'Método no permitido' }, 405);
    return serveImage(path.slice(5), request, env, ctx);
  }

  if (path.startsWith('/api/')) return api(request, env, url, path, method);

  // En admin.<dominio> el panel vive en la raíz; en el dominio principal sigue disponible en /admin.
  const adminHost = url.hostname.startsWith('admin.');
  if (path === '/admin' || path === '/admin/' || (adminHost && path === '/')) {
    if (method !== 'GET' && method !== 'HEAD') return json({ error: 'Método no permitido' }, 405);
    const session = await getSession(request, env);
    if (!session) return loginPage();
    return servePage(request, env, true);
  }

  if (method !== 'GET' && method !== 'HEAD') return json({ error: 'Método no permitido' }, 405);
  return servePage(request, env, false);
}

/* ------------------------------------------------------------------ */
/* Página pública / modo edición                                       */
/* ------------------------------------------------------------------ */

async function loadContent(env) {
  try {
    const { results } = await env.DB.prepare('SELECT clave, valor FROM contenido').all();
    const out = {};
    for (const row of results) out[row.clave] = row.valor;
    return out;
  } catch (err) {
    // Si la base falla, la página se ve igual que el original.
    console.error('No se pudo leer D1', err && err.message ? err.message : err);
    return {};
  }
}

// Evita que un valor con "</script>" cierre la etiqueta donde viaja el JSON.
function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

async function servePage(request, env, admin) {
  const assetRes = await env.ASSETS.fetch(new Request(new URL('/', request.url), { method: 'GET' }));
  const type = assetRes.headers.get('content-type') || '';
  if (!type.includes('text/html')) return assetRes;

  const content = await loadContent(env);
  const boot = admin ? { c: content, admin: true } : { c: content };

  // Cuando el HTML ya trae los elementos marcados, se reemplazan aquí mismo (HTMLRewriter).
  // En la app de React los elementos aparecen después; ahí los aplica src/editor/content.ts
  // con los mismos datos, inyectados abajo en window.__A2A__.
  const rewriter = new HTMLRewriter()
    .on('head', {
      element(el) {
        el.append(`<script>window.__A2A__=${safeJson(boot)};</script>`, { html: true });
        if (admin) el.append('<meta name="robots" content="noindex, nofollow">', { html: true });
      },
    })
    .on('[data-edit]', {
      element(el) {
        const key = el.getAttribute('data-edit');
        if (Object.prototype.hasOwnProperty.call(content, key)) el.setInnerContent(String(content[key]));
      },
    })
    .on('[data-edit-img]', {
      element(el) {
        const key = el.getAttribute('data-edit-img');
        const id = content[key];
        if (typeof id === 'string' && ID_RE.test(id)) {
          el.setAttribute('src', `/img/${id}`);
          el.removeAttribute('srcset');
        }
      },
    })
    .on('[data-edit-href]', {
      element(el) {
        const key = el.getAttribute('data-edit-href');
        const href = content[key];
        if (typeof href === 'string' && SAFE_HREF_RE.test(href.trim())) el.setAttribute('href', href.trim());
      },
    });

  const headers = new Headers(assetRes.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  if (admin) headers.set('X-Frame-Options', 'DENY');
  headers.delete('ETag');
  return rewriter.transform(new Response(assetRes.body, { status: 200, headers }));
}

async function serveImage(id, request, env, ctx) {
  if (!ID_RE.test(id)) return new Response('No encontrada', { status: 404 });

  const cache = caches.default;
  const cacheKey = new Request(new URL(`/img/${id}`, request.url).toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const row = await env.DB.prepare('SELECT tipo, datos FROM imagenes WHERE id = ?').bind(id).first();
  if (!row) return new Response('No encontrada', { status: 404 });

  const bytes = toBytes(row.datos);
  const res = new Response(bytes, {
    headers: {
      'Content-Type': IMAGE_TYPES.includes(row.tipo) ? row.tipo : 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

function toBytes(data) {
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  return Uint8Array.from(data); // D1 puede devolver el BLOB como arreglo de números
}

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

async function api(request, env, url, path, method) {
  const isWrite = method !== 'GET' && method !== 'HEAD';

  // Toda petición que cambia algo debe venir de esta misma página.
  if (isWrite && request.headers.get('Origin') !== url.origin) {
    return json({ error: 'Origen no permitido' }, 403);
  }

  if (path === '/api/login' && method === 'POST') return login(request, env);

  // Desde aquí todo exige sesión válida.
  const session = await getSession(request, env);
  if (!session) return json({ error: 'Sesión requerida' }, 401);

  if (path === '/api/logout' && method === 'POST') return logout(session, env);
  if (path === '/api/contenido' && method === 'GET') return json({ contenido: await loadContent(env) });
  if (path === '/api/contenido' && method === 'POST') return saveContent(request, env);
  if (path === '/api/imagen' && method === 'POST') return saveImage(request, env);
  if (path === '/api/restaurar' && method === 'POST') return restore(request, env);
  if (path === '/api/clave' && method === 'POST') return changePassword(request, env, session);

  return json({ error: 'No encontrado' }, 404);
}

async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : null;
  } catch {
    return null;
  }
}

async function saveContent(request, env) {
  const body = await readJson(request);
  if (!body) return json({ error: 'Cuerpo inválido' }, 400);
  const { clave, valor, tipo } = body;
  if (typeof clave !== 'string' || !KEY_RE.test(clave)) return json({ error: 'Clave inválida' }, 400);
  if (typeof valor !== 'string') return json({ error: 'Valor inválido' }, 400);

  const value = tipo === 'enlace' ? valor.trim() : valor;
  if (value.length === 0) return json({ error: 'El valor no puede quedar vacío' }, 400);
  if (value.length > MAX_TEXT) return json({ error: `Máximo ${MAX_TEXT} caracteres` }, 413);
  if (tipo === 'enlace' && !SAFE_HREF_RE.test(value)) {
    return json({ error: 'El enlace debe empezar con https://, http://, mailto:, tel: o #' }, 400);
  }

  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO contenido (clave, valor, actualizado_en) VALUES (?, ?, ?)
     ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, actualizado_en = excluded.actualizado_en`
  ).bind(clave, value, now).run();
  return json({ ok: true });
}

function detectImageType(bytes) {
  if (bytes.length >= 12 &&
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return 'image/webp';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  return null;
}

async function saveImage(request, env) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_IMAGE_BYTES + 64 * 1024) return json({ error: 'La imagen supera 500 KB' }, 413);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Formulario inválido' }, 400);
  }
  const clave = form.get('clave');
  const file = form.get('archivo');
  if (typeof clave !== 'string' || !KEY_RE.test(clave)) return json({ error: 'Clave inválida' }, 400);
  if (!file || typeof file === 'string') return json({ error: 'Falta la imagen' }, 400);
  if (!IMAGE_TYPES.includes(file.type)) return json({ error: 'Solo se aceptan WebP, JPEG o PNG' }, 415);
  if (file.size > MAX_IMAGE_BYTES) return json({ error: 'La imagen supera 500 KB' }, 413);

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.length > MAX_IMAGE_BYTES) return json({ error: 'La imagen supera 500 KB' }, 413);
  const realType = detectImageType(bytes);
  if (!realType || realType !== file.type) return json({ error: 'El archivo no es una imagen válida' }, 415);

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const previous = await env.DB.prepare('SELECT valor FROM contenido WHERE clave = ?').bind(clave).first();

  const statements = [
    env.DB.prepare('INSERT INTO imagenes (id, tipo, datos, actualizado_en) VALUES (?, ?, ?, ?)').bind(id, realType, bytes.buffer, now),
    env.DB.prepare(
      `INSERT INTO contenido (clave, valor, actualizado_en) VALUES (?, ?, ?)
       ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, actualizado_en = excluded.actualizado_en`
    ).bind(clave, id, now),
  ];
  if (previous && ID_RE.test(previous.valor)) {
    statements.push(env.DB.prepare('DELETE FROM imagenes WHERE id = ?').bind(previous.valor));
  }
  await env.DB.batch(statements);
  return json({ ok: true, id });
}

async function restore(request, env) {
  const body = await readJson(request);
  if (!body || typeof body.clave !== 'string' || !KEY_RE.test(body.clave)) return json({ error: 'Clave inválida' }, 400);
  const previous = await env.DB.prepare('SELECT valor FROM contenido WHERE clave = ?').bind(body.clave).first();
  const statements = [env.DB.prepare('DELETE FROM contenido WHERE clave = ?').bind(body.clave)];
  if (previous && ID_RE.test(previous.valor)) {
    statements.push(env.DB.prepare('DELETE FROM imagenes WHERE id = ?').bind(previous.valor));
  }
  await env.DB.batch(statements);
  return json({ ok: true });
}

/* ------------------------------------------------------------------ */
/* Login, sesiones y clave                                             */
/* ------------------------------------------------------------------ */

function b64encode(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}
function b64decode(text) {
  const s = atob(text);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}
function hex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function sha256Hex(text) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))));
}

async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// Formato guardado: pbkdf2-sha256$<iteraciones>$<sal en base64>$<hash en base64>
async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${b64encode(salt)}$${b64encode(hash)}`;
}

async function verifyPassword(password, stored) {
  const parts = typeof stored === 'string' ? stored.split('$') : [];
  if (parts.length !== 4 || parts[0] !== 'pbkdf2-sha256') return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > PBKDF2_ITERATIONS) return false;
  const expected = b64decode(parts[3]);
  const actual = await derive(password, b64decode(parts[2]), iterations);
  return timingSafeEqual(actual, expected);
}

async function currentHash(env) {
  try {
    const row = await env.DB.prepare("SELECT valor FROM config WHERE clave = 'admin_hash'").first();
    if (row && row.valor) return row.valor;
  } catch (err) {
    console.error('No se pudo leer config', err && err.message ? err.message : err);
  }
  return env.ADMIN_HASH || null;
}

function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 'local';
}

async function recentFails(env, ip) {
  const since = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM intentos_login WHERE ip = ? AND creado_en > ?').bind(ip, since).first();
  return row ? row.n : 0;
}

async function registerFail(env, ip) {
  await env.DB.prepare('INSERT INTO intentos_login (ip, creado_en) VALUES (?, ?)').bind(ip, new Date().toISOString()).run();
}

function tooManyAttempts() {
  return json({ error: 'Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.' }, 429, { 'Retry-After': '900' });
}

async function login(request, env) {
  const stored = await currentHash(env);
  if (!stored) return json({ error: 'El panel aún no está configurado' }, 503);

  const ip = clientIp(request);
  const cutoff = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM intentos_login WHERE creado_en < ?').bind(cutoff),
    env.DB.prepare('DELETE FROM sesiones WHERE expira_en < ?').bind(new Date().toISOString()),
  ]);
  if ((await recentFails(env, ip)) >= LOGIN_MAX_FAILS) return tooManyAttempts();

  const body = await readJson(request);
  const usuario = body && typeof body.usuario === 'string' ? body.usuario.slice(0, 100) : '';
  const clave = body && typeof body.clave === 'string' ? body.clave.slice(0, 200) : '';

  // Se calcula el hash siempre, aunque el usuario sea incorrecto, para no dar pistas por el tiempo.
  const passwordOk = await verifyPassword(clave, stored);
  const userOk = usuario === 'admin';
  if (!passwordOk || !userOk) {
    await registerFail(env, ip);
    return json({ error: 'Usuario o clave incorrectos' }, 401);
  }

  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const now = new Date();
  await env.DB.batch([
    env.DB.prepare('INSERT INTO sesiones (token_hash, creado_en, expira_en) VALUES (?, ?, ?)').bind(
      await sha256Hex(token),
      now.toISOString(),
      new Date(now.getTime() + SESSION_SECONDS * 1000).toISOString()
    ),
    env.DB.prepare('DELETE FROM intentos_login WHERE ip = ?').bind(ip),
  ]);
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(token, SESSION_SECONDS) });
}

function sessionCookie(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

function readCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return rest.join('=');
  }
  return null;
}

async function getSession(request, env) {
  const token = readCookie(request, COOKIE);
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return null;
  try {
    const tokenHash = await sha256Hex(token);
    const row = await env.DB.prepare('SELECT token_hash FROM sesiones WHERE token_hash = ? AND expira_en > ?')
      .bind(tokenHash, new Date().toISOString()).first();
    return row ? { tokenHash } : null;
  } catch (err) {
    console.error('No se pudo validar la sesión', err && err.message ? err.message : err);
    return null;
  }
}

async function logout(session, env) {
  await env.DB.prepare('DELETE FROM sesiones WHERE token_hash = ?').bind(session.tokenHash).run();
  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie('', 0) });
}

async function changePassword(request, env, session) {
  const body = await readJson(request);
  const actual = body && typeof body.actual === 'string' ? body.actual.slice(0, 200) : '';
  const nueva = body && typeof body.nueva === 'string' ? body.nueva : '';
  if (nueva.length < 10 || nueva.length > 100) return json({ error: 'La nueva clave debe tener entre 10 y 100 caracteres' }, 400);

  const ip = clientIp(request);
  if ((await recentFails(env, ip)) >= LOGIN_MAX_FAILS) return tooManyAttempts();

  const stored = await currentHash(env);
  if (!stored || !(await verifyPassword(actual, stored))) {
    await registerFail(env, ip);
    return json({ error: 'La clave actual no es correcta' }, 403);
  }

  const hash = await hashPassword(nueva);
  const now = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO config (clave, valor, actualizado_en) VALUES ('admin_hash', ?, ?)
       ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, actualizado_en = excluded.actualizado_en`
    ).bind(hash, now),
    // Cierra las demás sesiones abiertas; esta se conserva.
    env.DB.prepare('DELETE FROM sesiones WHERE token_hash != ?').bind(session.tokenHash),
  ]);
  return json({ ok: true });
}

/* ------------------------------------------------------------------ */
/* Respuestas y página de login                                        */
/* ------------------------------------------------------------------ */

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

function loginPage() {
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Entrar al panel — Art2Art</title>
<link rel="icon" type="image/png" href="/logo.png">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#fff;color:#000;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  main{width:100%;max-width:380px}
  img{display:block;width:72px;height:72px;margin:0 auto 16px;object-fit:contain}
  h1{margin:0 0 4px;text-align:center;font-size:26px;letter-spacing:-.04em}
  p.sub{margin:0 0 24px;text-align:center;font-size:14px;color:rgba(0,0,0,.55)}
  form{display:flex;flex-direction:column;gap:14px;padding:24px;border:1px solid rgba(0,0,0,.1);border-radius:20px;background:#fafafa}
  label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600}
  input{height:44px;padding:0 14px;border:1px solid rgba(0,0,0,.15);border-radius:12px;font-size:16px;background:#fff;color:#000}
  input:focus{outline:2px solid #000;outline-offset:1px}
  button{height:46px;border:0;border-radius:999px;background:#000;color:#fff;font-size:15px;font-weight:600;cursor:pointer}
  button:disabled{opacity:.6;cursor:wait}
  .err{min-height:20px;margin:0;font-size:13px;color:#b91c1c;text-align:center}
  a.back{display:block;margin-top:18px;text-align:center;font-size:13px;color:rgba(0,0,0,.5);text-decoration:none}
</style>
</head>
<body>
<main>
  <img src="/logo.png" alt="Art2Art">
  <h1>Panel de Art2Art</h1>
  <p class="sub">Entra para editar los textos, fotos y enlaces de la página.</p>
  <form id="f" autocomplete="on">
    <label>Usuario<input name="usuario" value="admin" autocomplete="username" autocapitalize="none" required></label>
    <label>Clave<input name="clave" type="password" autocomplete="current-password" required autofocus></label>
    <p class="err" id="err" role="alert"></p>
    <button type="submit" id="b">Entrar</button>
  </form>
  <a class="back" href="/">← Volver a la página</a>
</main>
<script>
  const f = document.getElementById('f'), err = document.getElementById('err'), b = document.getElementById('b');
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.textContent = '';
    b.disabled = true;
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: f.usuario.value, clave: f.clave.value }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { location.replace('/admin'); return; }
      err.textContent = d.error || 'No se pudo entrar, intenta de nuevo';
    } catch (_) {
      err.textContent = 'No hay conexión. Intenta de nuevo.';
    }
    b.disabled = false;
    f.clave.select();
  });
</script>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
