/*
 * ============================================================
 * OJAMBO & OJAMBO ADVOCATES
 * Progressive Web App Service Worker
 * ============================================================
 *
 * This gives the website a real PWA foundation:
 *
 * - Enables service-worker-controlled pages
 * - Provides a small offline fallback
 * - Allows the browser to recognize the site as an installable
 *   web application when the other requirements are satisfied
 * - Automatically cleans old caches when this file changes
 *
 * IMPORTANT:
 * Do not put sensitive/private client information into this cache.
 * ============================================================
 */

const CACHE_NAME = "oo-advocates-v1";

/*
 * Keep this initial cache intentionally small.
 *
 * The browser can still fetch the rest of the website normally.
 * We mainly want the core shell available if the network drops.
 */
const CORE_ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/site.webmanifest"
];

/*
 * INSTALL
 * ------------------------------------------------------------
 * Store the core application shell.
 */
self.addEventListener("install", event => {

    console.log("[O&O SW] Installing service worker...");

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});


/*
 * ACTIVATE
 * ------------------------------------------------------------
 * Remove caches belonging to older versions.
 */
self.addEventListener("activate", event => {

    console.log("[O&O SW] Activating service worker...");

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => caches.delete(cacheName))

                );

            })
            .then(() => self.clients.claim())

    );
});


/*
 * FETCH
 * ------------------------------------------------------------
 * Network first:
 *
 * 1. Try to get the newest version from the network.
 * 2. If the network fails, use the cached version.
 *
 * This is particularly useful for a professional website because
 * visitors should normally receive the latest content.
 */
self.addEventListener("fetch", event => {

    /*
     * Only handle GET requests.
     */
    if (event.request.method !== "GET") {
        return;
    }

    /*
     * Ignore browser-extension requests and similar schemes.
     */
    if (!event.request.url.startsWith("http")) {
        return;
    }

    event.respondWith(

        fetch(event.request)

            .then(response => {

                /*
                 * Store successful same-origin responses.
                 */
                if (
                    response &&
                    response.status === 200 &&
                    new URL(event.request.url).origin === location.origin
                ) {

                    const responseClone = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseClone);
                        });

                }

                return response;
            })

            .catch(() => {

                /*
                 * If the network is unavailable, attempt cache.
                 */
                return caches.match(event.request)
                    .then(cachedResponse => {

                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        /*
                         * If navigation fails completely, fall back
                         * to the cached homepage.
                         */
                        if (event.request.mode === "navigate") {
                            return caches.match("/index.html");
                        }

                        return new Response(
                            "Offline",
                            {
                                status: 503,
                                headers: {
                                    "Content-Type": "text/plain"
                                }
                            }
                        );

                    });

            })

    );
});