import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { cloudflare } from '@cloudflare/vite-plugin';

const config = defineConfig({
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    viteReact(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "styles/modules" as *;
          @use "sass:color";
        `,
        loadPaths: ['src'],
      },
    },
  },
});

export default config;
