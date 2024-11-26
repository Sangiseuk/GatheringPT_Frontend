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
      path: "/sign-up",
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
          component: () => import("@/components/game/GamePinView.vue"),
        },
        {
          path: "nickname",
          name: "nickname",
          component: () => import("@/components/game/NicknameView.vue"),
        },
      ],
    },
    {
      path: "/create-game",
      name: "createGame",
      component: () => import("@/views/CreateGameView.vue"),
      children: [
        {
          path: 'define-scope',
          name: 'DefineScope',
          component: () => import('@/components/template/DefineScope.vue'),
        },
        
      ],
    },
    
  ],
});

export default router;
