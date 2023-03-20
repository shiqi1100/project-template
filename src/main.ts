import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia 可持久化地址：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import initRouter from './router'
import BdsaasUi from 'bdsaas-ui'
import 'bdsaas-ui/es/style/index.css'
import './assets/main.less'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(initRouter())
app.use(ElementPlus)
app.use(BdsaasUi)

app.mount('#app')
app.config.globalProperties.$router = initRouter() as any
