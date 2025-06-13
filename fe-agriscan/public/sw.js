const CACHE_NAME = "agriscan-v1";
const urlsToCache = [
  "/",
  "/login",
  "/register",
  "/manifest.json",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
];

// Static assets to cache
const staticAssetRegex =
  /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf)$/;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Check if this is a request for a static asset or HTML page
  const isStaticAsset = staticAssetRegex.test(event.request.url);
  const isHTMLPage = event.request.mode === "navigate";
  const isAPIRequest =
    event.request.url.includes("/api/") ||
    event.request.url.includes("predict") ||
    !event.request.url.startsWith(self.location.origin);

  // Skip caching for API requests
  if (isAPIRequest) {
    return;
  }

  // Only cache static assets and HTML pages
  if (!isStaticAsset && !isHTMLPage) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
