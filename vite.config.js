import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Prompt user for reload to apply update (used by PWABanner)
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'maskable-icon.png', 'apple-touch-icon.png', 'offline.html'],
      manifest: {
        name: 'fella7com',
        short_name: 'fella7com',
        description: 'Agricultural E-Commerce and Listing Portal',
        theme_color: '#2d6a4f',
        background_color: '#fdfdfb',
        display: 'fullscreen',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Setup offline page fallback
        navigateFallback: '/offline.html',
        // Make sure login / register and other routes are cached correctly
        runtimeCaching: [
          {
            // Cache static assets (fonts, images, scripts) with Cache First
            urlPattern: ({ request }) => 
              request.destination === 'style' ||
              request.destination === 'script' ||
              request.destination === 'image' ||
              request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            // API requests or third party CDN requests - Network First
            urlPattern: ({ url }) => url.pathname.startsWith('/api/') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 Hours
              },
            },
          }
        ]
      }
    })
  ],
})

