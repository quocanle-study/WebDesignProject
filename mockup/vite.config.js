import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp'],
    rollupOptions: {
      input: {
        main: 'index.html',
        shop: 'shop.html',
        product: 'product.html',
        about: 'about.html',
      },
    },
  },
});