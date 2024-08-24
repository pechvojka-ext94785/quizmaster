import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
    plugins: [solid()],
    build: {
        outDir: '../backend/src/main/resources/static',
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
})
