// Service Worker for Edgeview Finance
// Provides offline functionality with cache-first and network-first strategies

const CACHE_NAME = 'edgeview-finance-v1';
const STATIC_CACHE_NAME = 'edgeview-static-v1';
const DYNAMIC_CACHE_NAME = 'edgeview-dynamic-v1';

// Critical pages for offline access
const CRITICAL_PAGES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/offline.html'
];

// Static assets to cache
const STATIC_ASSETS = [
  // CSS and JS files will be auto-detected
  '/favicon.ico',
  // Images will be cached on-demand
];

// Network timeout for fetch requests
const NETWORK_TIMEOUT = 3000;

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    Promise.all([
      // Cache critical pages
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] Caching critical pages...');
        return cache.addAll(CRITICAL_PAGES);
      }),

      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    }).catch(error => {
      console.error('[SW] Installation failed:', error);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== CACHE_NAME &&
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external URLs
  if (request.method !== 'GET' || !url.origin.includes('edgeviewfinance.com')) {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API routes: Network first, no cache for dynamic data
    event.respondWith(handleApiRequest(request));
  } else if (isStaticAsset(url.pathname)) {
    // Static assets: Cache first
    event.respondWith(handleStaticAsset(request));
  } else {
    // HTML pages: Network first with offline fallback
    event.respondWith(handlePageRequest(request));
  }
});

// Handle API requests - network first, no cache
async function handleApiRequest(request) {
  try {
    console.log('[SW] API request:', request.url);
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.log('[SW] API request failed:', error);
    return new Response(JSON.stringify({
      error: 'Network unavailable. Please try again when online.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle static assets - cache first
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }

    // Network fallback
    console.log('[SW] Fetching static asset:', request.url);
    const response = await fetch(request);

    // Cache successful responses
    if (response.status === 200) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Static asset failed:', error);
    // Return a placeholder or cached version if available
    return caches.match(request) || new Response('Asset unavailable offline', { status: 503 });
  }
}

// Handle page requests - network first with cache fallback
async function handlePageRequest(request) {
  try {
    console.log('[SW] Page request:', request.url);

    // Try network first with timeout
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), NETWORK_TIMEOUT)
      )
    ]);

    // Cache successful HTML responses
    if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }

    // Offline fallback for navigation requests
    if (request.mode === 'navigate') {
      console.log('[SW] Serving offline page');
      return caches.match('/offline.html') || new Response('Offline - Please check your connection', {
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Content unavailable offline', { status: 503 });
  }
}

// Helper function to identify static assets
function isStaticAsset(pathname) {
  return pathname.startsWith('/_astro/') ||
         pathname.startsWith('/assets/') ||
         pathname.match(/\.(css|js|jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$/i) ||
         pathname === '/favicon.ico';
}

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Future: Handle offline form submissions
  console.log('[SW] Background sync completed');
}

// Handle push notifications (future enhancement)
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Edgeview Finance';
  const options = {
    body: data.body || 'You have a new message',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'edgeview-notification'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});