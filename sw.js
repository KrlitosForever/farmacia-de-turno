const VERSION = 'v1.1.0';
const SHELL_CACHE = `farmacia-shell-${VERSION}`;
const RUNTIME_CACHE = `farmacia-runtime-${VERSION}`;
const API_CACHE = `farmacia-api-${VERSION}`;

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

const API_HOST = 'midas.minsal.cl';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [SHELL_CACHE, RUNTIME_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => !currentCaches.includes(key)).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: sirve caché al instante y actualiza en segundo plano.
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => undefined);

  return cached || networkFetch || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Datos de farmacias del Minsal: siempre intenta refrescar, con respaldo en caché.
  if (url.hostname === API_HOST) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
    return;
  }

  // Navegación (recarga de la app): red primero, con respaldo offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  // Resto de assets (CDN de Bootstrap/Leaflet, iconos propios, etc.)
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});
