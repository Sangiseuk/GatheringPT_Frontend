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
        {
          path: "waiting",
          name: "waiting",
          component: () => import("@/components/game/GameWaitingView.vue"),
        },
      ],
    },
    {
      path: "/create-game",
      name: "createGame",
      component: () => import("@/views/CreateGameView.vue"),
    },
    {
      path: "/create-marker",
      name: "createMarker",
      component: () => import("@/views/CreateMarkerView.vue"),
    },
    {
      path: "/create-setting",
      name: "createSetting",
      component: () => import("@/views/CreateSettingView.vue"),
    },
    {
      path: "/game-template-list",
      name: "gametemplatelist",
      component: () => import("@/views/GameTemplateListView.vue"),
    },
    {
      path: "/game-detail",
      name: "gamedetail",
      component: () => import("@/views/GameDetailView.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/GameView.vue"),
    },
    {
      path: "/result",
      name: "result",
      component: () => import("@/views/ResultView.vue"),
    },
    {
      path: "/operator",
      name: "operator",
      component: () => import("@/views/OperatorView.vue"),
    },
    {
      path: "/end-game",
      name: "end-game",
      component: () => import("@/views/EndGameListView.vue"),
    },
    {
      path: "/end-game-result",
      name: "end-game-result",
      component: () => import("@/views/EndGameResultView.vue"),
    },
  ],
});

export default router;
