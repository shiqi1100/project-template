import type { RouteRecordRaw } from "vue-router";
import { helloWorldChildren } from "@/router/HelloWorld";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main-page',
    component: () => import('@/views/MainPage/MainPage.vue'),
    redirect: {
      name: 'hello-world'
    },
    children: [...helloWorldChildren]

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
]
export default routes
