import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    root: 'assets/react',
    base: '/build/',
    build: {
        outDir: resolve(__dirname, 'public/build'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                landing: resolve(__dirname, 'assets/react/main.jsx'),
                login: resolve(__dirname, 'assets/react/login/main.jsx'),
                admin: resolve(__dirname, 'assets/react/admin/main.jsx'),
                designer: resolve(__dirname, 'assets/react/designer/main.jsx'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: '[name][extname]',
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
    },
});
