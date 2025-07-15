import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const vitePort = Number(process.env.VITE_PORT) || 5173;
const appEnv = process.env.APP_ENV;
const appUrl = process.env.APP_URL;

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    server: {
        host: '0.0.0.0', // Pour Docker/WSL2
        port: vitePort,
        strictPort: true,
        cors: {
            origin: appUrl,
            credentials: true,
        },
        hmr: appEnv === 'local' ? {
            host: 'localhost',
            port: vitePort,
            clientPort: vitePort,
            protocol: 'ws'
        } : false,
        watch: {
            usePolling: true, // Pour Docker/WSL2
        }
    }
});
