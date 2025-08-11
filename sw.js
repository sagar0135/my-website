/**
 * MANVUE - Service Worker
 * PWA functionality with caching and offline support
 * Market-ready progressive web app features
 */

const CACHE_NAME = 'manvue-v1.0.0';
const STATIC_CACHE = 'manvue-static-v1.0.0';
const DYNAMIC_CACHE = 'manvue-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './product-interactions.js',
  './search.js',
  './t-shirts.html',
  './shirts.html',
  './jeans.html',
  './jackets.html',
  './hoodies.html',
  './footwear.html',
  './accessories.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(handleStaticRequest(request));
  } else if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  } else {
    event.respondWith(handleApiRequest(request));
  }
});

// Handle image requests
async function handleImageRequest(request) {
  try {
    // Try network first for images
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the image
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Service Worker: Network failed for image, trying cache');
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return a placeholder image if nothing is cached
  return new Response(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#999">Image not available</text></svg>',
    {
      headers: { 'Content-Type': 'image/svg+xml' }
    }
  );
}

// Handle static file requests (CSS, JS)
async function handleStaticRequest(request) {
  try {
    // Try cache first for static files
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (error) {
    console.log('Service Worker: Cache miss for static file');
  }

  try {
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Service Worker: Network failed for static file');
  }

  // Return a basic response if both cache and network fail
  return new Response('', { status: 404 });
}

// Handle document requests (HTML pages)
async function handleDocumentRequest(request) {
  try {
    // Try network first for documents
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Service Worker: Network failed for document, trying cache');
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return offline page
  return caches.match('./offline.html') || new Response(
    '<html><body><h1>Offline</h1><p>Please check your internet connection and try again.</p></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Service Worker: Network failed for API');
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return generic response
  return new Response('', { status: 503 });
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle background sync
async function doBackgroundSync() {
  try {
    // Get pending actions from IndexedDB
    const pendingActions = await getPendingActions();
    
    for (const action of pendingActions) {
      try {
        await processPendingAction(action);
        await removePendingAction(action.id);
      } catch (error) {
        console.error('Service Worker: Failed to process pending action', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Get pending actions from IndexedDB
async function getPendingActions() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

// Process pending action
async function processPendingAction(action) {
  switch (action.type) {
    case 'add-to-cart':
      // Process cart addition
      break;
    case 'add-to-wishlist':
      // Process wishlist addition
      break;
    case 'submit-review':
      // Process review submission
      break;
    default:
      console.log('Service Worker: Unknown action type', action.type);
  }
}

// Remove pending action
async function removePendingAction(actionId) {
  // This would typically use IndexedDB
  console.log('Service Worker: Removed pending action', actionId);
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from MANVUE',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MANVUE', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker: Error', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled rejection', event.reason);
});

// Cache management utilities
async function clearOldCaches() {
  const cacheNames = await caches.keys();
  const cachesToDelete = cacheNames.filter(cacheName => 
    cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
  );
  
  return Promise.all(
    cachesToDelete.map(cacheName => caches.delete(cacheName))
  );
}

async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Performance monitoring
self.addEventListener('fetch', event => {
  const startTime = performance.now();
  
  event.respondWith(
    handleRequest(event.request)
      .then(response => {
        const endTime = performance.now();
        console.log(`Service Worker: Request took ${endTime - startTime}ms`);
        return response;
      })
      .catch(error => {
        const endTime = performance.now();
        console.error(`Service Worker: Request failed after ${endTime - startTime}ms`, error);
        throw error;
      })
  );
});

// Generic request handler
async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return fetch(request);
  }
  
  // Handle different request types
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    return handleDocumentRequest(request);
  } else if (url.pathname.match(/\.(css|js)$/)) {
    return handleStaticRequest(request);
  } else if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    return handleImageRequest(request);
  } else {
    return handleApiRequest(request);
  }
}

// Cache warming for critical resources
async function warmCache() {
  const criticalResources = [
    './',
    './index.html',
    './style.css',
    './script.js'
  ];
  
  const cache = await caches.open(STATIC_CACHE);
  
  for (const resource of criticalResources) {
    try {
      await cache.add(resource);
    } catch (error) {
      console.error('Service Worker: Failed to warm cache for', resource, error);
    }
  }
}

// Initialize cache warming
self.addEventListener('activate', event => {
  event.waitUntil(warmCache());
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CACHE_NAME,
    STATIC_CACHE,
    DYNAMIC_CACHE,
    STATIC_FILES
  };
} 