self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('reminder-v1').then(cache => {
      return fetch(e.request).then(response => {
        cache.put(e.request, response.clone());
        return response;
      }).catch(() => cache.match(e.request));
    })
  );
});
