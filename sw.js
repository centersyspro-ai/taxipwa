const CACHE_NAME = 'mi-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/estilos.css',
  '/assets/images/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});