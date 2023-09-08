import { defineConfig } from 'vite'
import { resolve } from 'path'

const initPath = 'spotify-music-guess'
export default defineConfig({
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        login: resolve(__dirname, 'login.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          return `${initPath}/assets/[name]-[hash][extname]`;
        },
        chunkFileNames: (chunkInfo) => {
          return `${initPath}/assets/[name]-[hash].js`;
        },
        entryFileNames: (chunkInfo) => {
          return `${initPath}/assets/[name]-[hash].js`;
        }
      }
    }
  },
  server: {
    port: '3000'
  }
})