const CACHE_NAME = 'taxi-merced-v1';
const urlsToCache = [
  '/taxipwa/',
  '/taxipwa/index.html',
  '/taxipwa/manifest.json',
  '/taxipwa/assets/images/logo.jpg',
  '/taxipwa/assets/images/hero.png',
  '/taxipwa/assets/images/acerca-de-nosotros.jpg',
  '/taxipwa/assets/images/servicio-regular.jpg',
  '/taxipwa/assets/images/servicio-24horas.jpg',
  '/taxipwa/assets/images/reserva-inmediata.jpg',
  '/taxipwa/assets/images/conductor-experimentado.jpg',
  '/taxipwa/assets/images/taxi-seguro.jpg',
  '/taxipwa/assets/images/taxi1.jpg',
  '/taxipwa/assets/images/taxi2.jpg',
  '/taxipwa/assets/images/taxi3.jpg',
  '/taxipwa/assets/images/taxi4.jpg',
  '/taxipwa/assets/images/taxi5.jpg',
  '/taxipwa/assets/images/icon-72x72.png',
  '/taxipwa/assets/images/icon-192x192.png',
  '/taxipwa/assets/images/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error('❌ Error al cachear:', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});