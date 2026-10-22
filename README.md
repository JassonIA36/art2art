# Art2Art – página editable

Página de Vite + React servida por un Cloudflare Worker con base de datos D1. El dueño edita textos, fotos y enlaces desde la misma página; el contenido original está en el código y la base solo guarda lo que se cambió (si la base falla, la página se ve igual que siempre).

## Entrar al panel

1. Abre `https://art2art.j1045683385.workers.dev/admin` (o `/admin` en el dominio propio cuando se conecte).
2. Usuario: `admin`. La clave inicial se mostró una sola vez en la terminal al crearla.
3. Verás la página con una barra negra arriba: **Guardar**, **Cancelar**, **Enlaces**, **Cambiar clave**, **Cerrar sesión**.
   - Texto: haz clic sobre cualquier texto con borde punteado y escribe.
   - Fotos: botón **Cambiar foto** sobre cada imagen. Se reduce sola (máx. 1200 px, WebP, menos de 200 KB) y muestra vista previa.
   - Enlaces y botones (WhatsApp, redes, mapa): botón **Enlaces** de la barra.
   - **Restaurar original** vuelve un texto, foto o enlace al valor que tiene el código.
   - Nada se publica hasta pulsar **Guardar**.

## Cambiar la clave

En el panel: **Cambiar clave** → clave actual, clave nueva (mínimo 10 caracteres) y repetirla. Al cambiarla se cierran las demás sesiones abiertas.

Si se olvida la clave: `node scripts/crear-clave.mjs` genera una nueva, pero la clave guardada desde el panel tiene prioridad sobre el secreto. Para volver al secreto hay que borrarla:

```
npx wrangler d1 execute DB --remote --command "DELETE FROM config WHERE clave = 'admin_hash'"
node scripts/crear-clave.mjs
```

## Comandos (en este orden)

```bash
npm install                                    # instala wrangler y el resto
npx wrangler login                             # inicia sesión en Cloudflare
npx wrangler d1 create art2art-db              # crea la base; copia database_id a wrangler.toml
npm run db:remote                              # aplica las migraciones en la base real
npm run worker:deploy                          # compila (vite build) y despliega el Worker
node scripts/crear-clave.mjs                   # genera la clave, sube solo su hash y la muestra UNA vez
```

El secreto se sube después del primer despliegue porque `wrangler secret put` necesita que el Worker exista.

## Desarrollo local

```bash
npm run db:local                               # migraciones en la base local
node scripts/crear-clave.mjs --local           # crea .dev.vars (ignorado por git)
npm run worker:dev                             # http://localhost:8787 y /admin
```

`npm run dev` (Vite solo) sigue funcionando para trabajar el diseño; ahí no hay panel.

## Cómo funciona

- `src/index.js`: Worker. `/` y `/admin` sirven la app con los datos guardados inyectados en `window.__A2A__` (y con HTMLRewriter reemplazan los `data-edit*` que ya vengan en el HTML). `/img/:id`, `/api/*`.
- `src/editor/content.ts`: aplica los datos guardados sobre la app de React cuando esta dibuja la página.
- `src/editor/editMode.ts`: modo edición; solo se descarga en `/admin` con sesión.
- Marcas en los componentes: `data-edit="clave"` (texto), `data-edit-img="clave"` (foto), `data-edit-href="clave"` (enlace). Para volver editable otro elemento, basta agregarle el atributo con una clave nueva (solo `a-z`, `0-9`, `_`, `-`).
- Seguridad: clave con PBKDF2-SHA256 (sal, 100000 iteraciones); sesión de 8 h en cookie `HttpOnly; Secure; SameSite=Strict`; máximo 5 intentos fallidos por IP cada 15 minutos; las rutas de guardado exigen sesión y mismo origen; imágenes máx. 500 KB (WebP, JPEG o PNG verificados por contenido).
