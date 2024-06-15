import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        }
    },
    // 配置开发服务器
    server: {
        port: 8001,
        open: true,
        proxy: {
            '/api': {
                target: 'http://121.89.213.194:5001/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
})