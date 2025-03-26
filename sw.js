self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('imagens-cache').then((cache) => {
            return cache.addAll([]); // Adicione URLs de imagens no primeiro carregamento
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    return caches.open('imagens-cache').then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});
