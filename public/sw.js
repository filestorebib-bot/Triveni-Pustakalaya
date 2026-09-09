const CACHE_NAME = "triveni-pustakalaya-v3";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/tv.png",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const file of APP_SHELL) {
        try {
          await cache.add(file);
        } catch (error) {
          console.log("Could not cache:", file, error);
        }
      }
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only GET requests
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Only handle files from this website
  if (url.origin !== self.location.origin) {
    return;
  }

  /*
   * PAGE / NAVIGATION
   *
   * Online:
   *   Load newest page from server and save it.
   *
   * Offline:
   *   Load saved page.
   */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }

          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);

          if (cachedPage) {
            return cachedPage;
          }

          const indexPage = await caches.match("/index.html");

          if (indexPage) {
            return indexPage;
          }

          return caches.match("/offline.html");
        })
    );

    return;
  }

  /*
   * OTHER FILES
   *
   * JS
   * CSS
   * images
   * fonts
   * JSON
   * PDFs
   * etc.
   *
   * Online = download latest version and cache it.
   * Offline = use cached version.
   */
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);

        if (cached) {
          return cached;
        }

        return new Response("Offline - this resource is not downloaded yet.", {
          status: 503,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      })
  );
});
