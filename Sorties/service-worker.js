const CACHE_NAME = "chimio-stock-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./logo.svg",
  "./icon-192.png",
  "./icon-512.png",
  "https://cdn.tailwindcss.com",
  "https://kit.fontawesome.com/a076d05399.js"
];

// Installation – met les fichiers en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation – nettoyage du cache obsolète
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Récupération des ressources
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
