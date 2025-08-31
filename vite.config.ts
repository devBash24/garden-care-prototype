import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        "name": "Garden Care - Plant Health Assistant",
        "short_name": "Garden Care",
        "description": "Your personal AI-powered plant care assistant for healthy gardening",
        "start_url": "/",
        "display": "standalone",
        "orientation": "portrait",
        "theme_color": "#10B981",
        "background_color": "#FFFFFF",
        "categories": ["lifestyle", "productivity", "utilities"],
        "icons": [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
          },
          {
            "src": "/icon-512.png", 
            "sizes": "512x512",
            "type": "image/png",
          },
          {
            "src": "/maskable_icon.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "screenshots": [
          {
            "src": "/screenshots/mobile.png",
            "sizes": "414x896",
            "type": "image/png",
            "form_factor": "narrow",
            "label": "Mobile app view of My Garden dashboard"
          },
          {
            "src": "/screenshots/desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Desktop view of the Garden Care app"
          }
        ],
        "shortcuts": [
          {
            "name": "My Garden",
            "short_name": "Garden",
            "description": "View your plant collection",
            "url": "/my-garden",
            "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }]
          },
          {
            "name": "Diagnose Plant",
            "short_name": "Diagnose", 
            "description": "AI plant health diagnosis",
            "url": "/diagnose",
            "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }]
          },
          {
            "name": "AI Chat",
            "short_name": "Chat",
            "description": "Get gardening advice",
            "url": "/ai-chat", 
            "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }]
          }
        ]
      }
    })
  ],
})
