self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open("v1").then(function(cache) {
            return cache.addAll([
                "sampler.html",
                "sampler.css",
                "sampler.js"
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
            //return caches.match("img/skull.gif");
        })
    );
});
