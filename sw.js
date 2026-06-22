
const CACHE_NAME = 'mic2fft-v0.102';

const FILES = [
  './',
  './mic2fft.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/web-mic-tools/mic2fft.html'
      ])
    )
  );

  self.skipWaiting();
});