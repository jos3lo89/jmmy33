import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/homePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFound from "../pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        isAuthenticated: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        isAuthenticated: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      meta: {
        isAuthenticated: false,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: {
        isAuthenticated: false,
      },
    },
  ],
});

// guard

router.beforeEach((to) => {
  const isAuth = to.meta.isAuthenticated;
  const cookie = $cookies.get("token");
  if (isAuth && !cookie) {
    return { name: "login" };
  }
});

export default router;
