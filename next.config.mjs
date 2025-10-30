import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
    runtimeCaching: [
        {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
                cacheName: 'html-cache',
                expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
        },
        {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
                expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
        },
        {
            urlPattern: ({ request }) => request.destination === 'image' || request.destination === 'font',
            handler: 'CacheFirst',
            options: {
                cacheName: 'assets-cache',
                expiration: { maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 },
            },
        },
    ],
});


