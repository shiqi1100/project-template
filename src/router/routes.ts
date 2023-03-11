import type { RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: defineAsyncComponent(
      () => import('@/views/AboutView.vue')
    )
  },
  {
    path: '/login',
    name: 'login',
    component: defineAsyncComponent(() => import('@/views/login/login.vue'))
  },
]
export default routes