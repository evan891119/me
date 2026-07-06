import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('@dimforge') || id.includes('@react-three/rapier')) {
            return 'vendor-physics';
          }

          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei') ||
            id.includes('three') ||
            id.includes('three-stdlib')
          ) {
            return 'vendor-three';
          }

          return 'vendor-react';
        },
      },
    },
  },
  plugins: [react()],
});
