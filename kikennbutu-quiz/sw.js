const CACHE_NAME = "quiz-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("fetch",function(event) {
    event.respondWith(
        fetch(event.request)
        .then(function (response) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, copy);
            });
            return response;
        })
        .catch(function () {
            return caches.match(event.request);
        })
    );
});