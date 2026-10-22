-- Texto y enlaces que el dueño cambió (la página original es el valor por defecto).
CREATE TABLE IF NOT EXISTS contenido (
  clave TEXT PRIMARY KEY,
  valor TEXT NOT NULL,
  actualizado_en TEXT NOT NULL
);

-- Fotos subidas por el dueño (ya comprimidas en el navegador, máx. 500 KB en el servidor).
CREATE TABLE IF NOT EXISTS imagenes (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  datos BLOB NOT NULL,
  actualizado_en TEXT NOT NULL
);

-- Intentos fallidos de login por IP (máx. 5 cada 15 minutos).
CREATE TABLE IF NOT EXISTS intentos_login (
  ip TEXT,
  creado_en TEXT
);
CREATE INDEX IF NOT EXISTS idx_intentos_login_ip ON intentos_login (ip, creado_en);

-- Sesiones del panel: se guarda el hash SHA-256 del token, nunca el token.
CREATE TABLE IF NOT EXISTS sesiones (
  token_hash TEXT PRIMARY KEY,
  creado_en TEXT NOT NULL,
  expira_en TEXT NOT NULL
);

-- Ajustes internos. Aquí queda el hash de la clave cuando el dueño la cambia desde el panel.
CREATE TABLE IF NOT EXISTS config (
  clave TEXT PRIMARY KEY,
  valor TEXT NOT NULL,
  actualizado_en TEXT NOT NULL
);
