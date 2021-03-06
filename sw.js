self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("v1").then(function(cache) {
            return cache.addAll([
                "index.html",
                "sampler.css",
                "sampler.js",
                "sample_sets.js",
				"img/android-chrome-192x192.png",
				"img/android-chrome-512x512.png",
				"img/restart.svg",
				"img/loop.svg"
            ]);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                var responseClone = response.clone();
                caches.open("v1").then(function(cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }).catch(function() {
            return caches.match("img/favicon.ico");
        })
    );
});
