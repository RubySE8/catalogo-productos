import { defineConfig } from 'vite'

export default defineConfig({
  base: '/catalogo-productos/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})