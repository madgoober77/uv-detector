// Service worker — cache app shell for offline use
var CACHE = 'uv-detector-v1';
var FILES = ['/', '/index.html', '/manifest.json', '/icon.svg'];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
});

self.addEventListener('fetch', function(e) {
  // Only cache app shell — never cache Pico API calls
  if (e.request.url.indexOf('/data') > -1 ||
      e.request.url.indexOf('/log') > -1 ||
      e.request.url.indexOf('/ping') > -1 ||
      e.request.url.indexOf('/clear') > -1) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});
