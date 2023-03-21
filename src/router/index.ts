import { createRouter, createWebHistory } from 'vue-router'
import routes from "@/router/routes";
// @ts-ignore
import NProgress from 'nprogress'

const initRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })
  router.beforeEach((to, from, next) => {
    NProgress.start();
    const main = JSON.parse(localStorage.getItem("main") as string);
    if (!main && to.path !== "/login") next({ name: 'Login' })
    else next()
  });

  router.afterEach(() => {
    NProgress.done();
  });

  router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    next();
  });

  return router
}

export default initRouter
