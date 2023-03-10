import { fileURLToPath, URL } from 'node:url'
// 将 px 转换为 vw
import postcsspxtoviewport from 'postcss-px-to-viewport'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { cwd } from 'process'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd())
  console.log(mode);

  const { VITE_HOST } = env
  return {
    plugins: [vue(), vueJsx()],
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度，一般写 320
            // 下面的不常用，上面的常用
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false // 是否处理横屏情况
          })
        ]
      },
      // 公共样式的全局引入
      css: {
        // preprocessorOptions: {
        //   less: {
        //     javascriptEnabled: true,
        //     additionalData:
        //       '@import "./src/assets/css/common.less";@import "@/assets/css/customize-element-style.less";'
        //   }
        // }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: true,
      open: true,
      port: 7878,
      proxy: {
        // with options
        '/bdsaas/ajax': {
          target: VITE_HOST,
          changeOrigin: true,
        }
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify({
        name: 'h5-template',
        version: '0.0.1'
      }),
      'process.env': process.env
    }
  }
})
