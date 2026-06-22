
const CACHE_NAME = 'mic2fft-v0.103';

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
//      .then(response => response || fetch(event.request))//キャッシュ優先
      .catch(() => caches.match(event.request))//ネット有線
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