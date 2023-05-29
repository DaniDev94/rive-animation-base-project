import { defineConfig } from 'vite';
import { resolve } from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim')
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    root,
    base: './',
    publicDir: resolve(__dirname, 'public'),
    server: {
        port: '4000',
    },
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                basic: resolve(root, 'pages/basic_concepts', 'index.html'),
                states: resolve(root, 'pages/state_machines', 'index.html'),
            },
        },
    },
})