import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        manifest: true, // Enable manifest generation
        rollupOptions: {
            input: './vite-build-entry.html', // Entry point for build only
        },
    },
});
