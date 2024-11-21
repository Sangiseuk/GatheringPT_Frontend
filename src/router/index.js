import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/login.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("@/components/SignUp.vue"),
    },
    {
      path: "/joinGame",
      name: "joinGame",
      component: () => import("@/views/JoinGameView.vue"),
      children: [
        {
          path: "",
          name: "gamePin",
          component:() => import("@/components/game/GamePinView.vue")

        }
      ]
    },
  ],
});

export default router;
