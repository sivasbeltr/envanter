import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from "tailwindcss";
import { UserConfigExport, PluginOption } from 'vite';
import { ManifestOptions } from 'vite-plugin-pwa';

interface RollupOutputOptions {
  entryFileNames: string;
  chunkFileNames: string;
  assetFileNames: (assetInfo: { name: string }) => string;
}

interface ViteBuildOptions {
  outDir: string;
  emptyOutDir: boolean;
  rollupOptions: {
    output: RollupOutputOptions;
  };
}

interface VitePWAOptions {
  registerType: 'autoUpdate';
  includeAssets: string[];
  manifest: ManifestOptions;
}

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: <ViteBuildOptions>{
    outDir: '../wwwroot',
    emptyOutDir: true,
    rollupOptions: {
      output: <RollupOutputOptions>{
        entryFileNames: 'js/app.js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/app.css';
          }
          return 'assets/[name][extname]';
        },
      }
    }
  },
  plugins: <PluginOption[]>[
    react(),
    VitePWA(<VitePWAOptions>{
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: <ManifestOptions>{
        name: 'Stok Yönetim Sistemi',
        short_name: 'Stok Yönetim',
        description: 'Stok ve ürün yönetimi uygulaması',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
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
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
} as UserConfigExport);