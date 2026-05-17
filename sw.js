const CACHE_NAME = 'taxi-merced-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/images/logo.jpg',
  '/assets/images/hero.png',
  '/assets/images/acerca-de-nosotros.jpg',
  '/assets/images/servicio-regular.jpg',
  '/assets/images/servicio-24horas.jpg',
  '/assets/images/reserva-inmediata.jpg',
  '/assets/images/conductor-experimentado.jpg',
  '/assets/images/taxi-seguro.jpg',
  '/assets/images/taxi1.jpg',
  '/assets/images/taxi2.jpg',
  '/assets/images/taxi3.jpg',
  '/assets/images/taxi4.jpg',
  '/assets/images/taxi5.jpg',
  '/assets/images/icon-72x72.png',
  '/assets/images/icon-192x192.png',
  '/assets/images/icon-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Error al cachear:', error);
      })
  );
});

// Activación y limpieza de cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Estrategia: Cache First, luego red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, lo devuelve
        if (response) {
          return response;
        }
        
        // Si no, lo busca en la red
        return fetch(event.request).then(
          response => {
            // Si la respuesta no es válida, la devuelve tal cual
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clona la respuesta para guardarla en caché
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        );
      })
  );
});