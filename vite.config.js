import {defineConfig} from 'vite';
import {resolve} from 'path';
import dns from 'dns';
import copy from 'rollup-plugin-copy';

dns.setDefaultResultOrder('verbatim')
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    root: root,
    base: '/rive-animation-base-project/',
    publicDir: resolve(__dirname, 'public'),
    server: {
        port: '4000',
    },
    plugins: [
        copy({
            targets: [
                {
                    src: 'src/assets/animations/**/*',
                    dest: 'dist/assets/animations'
                },
                {
                    src: 'src/assets/sounds/**/*',
                    dest: 'dist/assets/sounds'
                },
                {
                    src: 'src/assets/locales/**/*',
                    dest: 'dist/assets/locales'
                },
            ],
            hook: 'writeBundle'
        })
    ],
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                basic: resolve(root, 'pages/basic_concepts', 'index.html'),
                states: resolve(root, 'pages/state_machines', 'index.html'),
                texts: resolve(root, 'pages/texts_animated', 'index.html'),
                binding: resolve(root, 'pages/data_binding', 'index.html'),
            },
        },
    },
})