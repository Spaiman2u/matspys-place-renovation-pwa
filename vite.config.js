
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Matspys Renovation Planner",
        short_name: "Renovator",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3f51b5",
        icons: []
      }
    })
  ]
});
