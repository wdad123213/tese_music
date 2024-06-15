import { defineConfig } from 'vite'
import path from 'path'


export default defineConfig({
    // 其他公用选项
    // 静态资源文件夹
    publicDir: 'public',
    // 环境变量
    define: {
        __APP_VERSION__: JSON.stringify('v1.0.0'),
    },

    resolve: {
        // 配置别名
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    // 网址前面要拼的东西
    base: 'test_app',
    // 打包相关配置
    build: {
        // 出口目录
        outDir: 'build',
        // 资源文件夹
        assetsDir: 'assets',
        // 小于 10kb 自动转成 base64
        assetsInlineLimit: 10 * 1024,
        // 代码映射
        sourcemap: true,
        // 把之前打包的清空
        emptyOutDir: true,
        // 传给 rollup 的配置
        rollupOptions: {
            input: {
                main: path.join(__dirname, 'index.html'),
            },
            // 输出
            output: {
                chunkFileNames: 'js/[name]-[hash:8].js',
                entryFileNames: 'js/[name]-[hash:8].js',
                assetFileNames: chunkInfo => {
                    const imageReg = /(png|gif|jpeg|svg|webp)$/
                    const [, ext] = path.basename(chunkInfo.name).split('.')
                    if (ext === 'css') {
                        return `css/[name]-[hash:8].${ext}`
                    } else if (imageReg.test(ext)) {
                        return `images/[name]-[hash:8].${ext}`
                    }
                    return 'assets/[name]-[hash:8].[ext]'
                }
            }
        }
    },
    // 配置开发服务器
    // server: {
    //     port: 8001,
    //     open: true,
    //     proxy: {
    //         '/api': {
    //             target: 'http://121.89.213.194:5001/',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //         },
    //     }
    // }
})