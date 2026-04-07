const CACHE_NAME = 'empathia-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/feed.html',
  '/chat.html',
  '/forum.html',
  '/map.html',
  '/discover.html',
  '/profile.html',
  '/create.html',
  '/signup.html',
  '/theme.js'
];

// Install — cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', event => {
  // Skip non-GET and Supabase/API requests
  if (
    event.request.method !== 'GET' ||
    event.request.url.includes('supabase') ||
    event.request.url.includes('netlify/functions') ||
    event.request.url.includes('livekit')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
