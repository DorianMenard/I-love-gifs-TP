// Your Service Worker. You can use its instance with the keyword `self`
// Example: self.addEventListener(...)

const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
    '/index.html',
    '/saved.html',
    '/search.html',
    '/assets/css/desktop.css',
    '/assets/css/fonts.css',
    '/assets/css/mobile.css',
    '/assets/css/normalize.css',
    '/assets/css/shell.css',
    '/assets/js/dexie.min.js',
    '/assets/js/fontawesome-pro-5.13.0.min.js',
    '/assets/js/lazysizes.min.js',
    '/assets/js/saved.js',
    '/assets/js/search.js',
    '/assets/js/trending.js',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-700italic.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-700italic.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-italic.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-italic.woff2',
    '/assets/fonts/balsamiq-sans-v1-latin-regular.woff',
    '/assets/fonts/balsamiq-sans-v1-latin-regular.woff2'
];

const appCaches = [
    appShellCacheName,
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(appShellCacheName).then(function (cache) {
            return cache.addAll(appShellFilesToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return false;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(appShellCacheName).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
