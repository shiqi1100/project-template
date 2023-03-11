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
    const counter = JSON.parse(localStorage.getItem("counter") as string);
    if (!counter && to.path !== "/login") next({ name: "login" });
    next();
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
