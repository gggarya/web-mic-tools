
const CACHE_NAME = 'mic2fft-v0.103';

const FILES = [
  './',
  './mic2fft.html'
];

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

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
