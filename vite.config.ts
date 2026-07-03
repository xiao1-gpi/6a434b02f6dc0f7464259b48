import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    sourcemap: false,
    target: 'es2018',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          framer: ['framer-motion'],
          lucide: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  plugins: [
    react({
      // react-dev-locator 仅在开发环境启用
      babel: command === 'serve' ? {
        plugins: ['react-dev-locator'],
      } : undefined,
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }),
    tsconfigPaths()
  ],
}))
