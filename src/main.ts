import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia 可持久化地址：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import initRouter from './router'
import BdsaasUi from 'bdsaas-ui'
import 'bdsaas-ui/es/style/index.css'
// 引入的公共样式
import './assets/main.less'
/**
 * Passive Event Listeners：
 * 就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，
 * 以便浏览器根据这个信息更好地做出决策来优化页面性能。
 * 当属性passive的值为true的时候，
 * 代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，
 * Chrome浏览器称这类型的监听器为被动（passive）监听器。
 * 目前Chrome主要利用该特性来优化页面的滑动性能，
 * 所以Passive Event Listeners特性当前仅支持mousewheel/touch相关事件。
 */
import 'default-passive-events'

export const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(initRouter())
app.use(ElementPlus)
app.use(BdsaasUi)

app.mount('#app')
app.config.globalProperties.$router = initRouter() as any
