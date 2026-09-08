// sw.js - Service Worker for AI Memory Bot

const CACHE_VERSION = 'v1';
const CACHE_NAME = `memory-bot-${CACHE_VERSION}`;

// Files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
    'https://cdn.jsdelivr.net/npm/puter.js'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                console.log('Service Worker: Skip waiting');
                return self.skipWaiting();
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    // Skip non-GET and cross-origin requests (except CDN)
    if (event.request.method !== 'GET') return;
    
    // Only handle same-origin or CDN requests
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin && 
        !url.origin.includes('cdn-icons-png.flaticon.com') &&
        !url.origin.includes('cdn.jsdelivr.net')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return offline fallback for HTML
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/');
                        }
                    });
            })
    );
});

// Push notification
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'open',
                title: 'Open App',
                icon: 'https://cdn-icons-png.flaticon.com/512/3767/3767084.png'
            },
            {
                action: 'close',
                title: 'Dismiss'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('AI Memory Bot', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                for (let client of windowClients) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});