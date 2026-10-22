// Genera una clave inicial aleatoria de 16 caracteres, guarda SOLO su hash PBKDF2-SHA256
// (sal + 100000 iteraciones) como secreto ADMIN_HASH y muestra la clave en texto una sola vez.
//
//   node scripts/crear-clave.mjs          -> sube el secreto a Cloudflare (wrangler secret put)
//   node scripts/crear-clave.mjs --local  -> escribe .dev.vars para `wrangler dev` (ignorado por git)
import { pbkdf2Sync, randomBytes, randomInt } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const ITERATIONS = 100000;
// Sin 0/O/1/l/I para que sea fácil de copiar y leer.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

const password = Array.from({ length: 16 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256');
const stored = `pbkdf2-sha256$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`;

if (process.argv.includes('--local')) {
  writeFileSync('.dev.vars', `ADMIN_HASH="${stored}"\n`);
  console.log('Secreto local guardado en .dev.vars (no se sube a git).');
} else {
  const run = spawnSync('npx', ['wrangler', 'secret', 'put', 'ADMIN_HASH'], {
    input: stored,
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true,
  });
  if (run.status !== 0) {
    console.error('No se pudo subir el secreto. La clave NO fue activada.');
    process.exit(1);
  }
}

console.log('\n==============================================');
console.log(' Usuario: admin');
console.log(` Clave inicial: ${password}`);
console.log(' Guárdala ahora: no se vuelve a mostrar.');
console.log(' Cámbiala desde el panel (Cambiar clave).');
console.log('==============================================\n');
