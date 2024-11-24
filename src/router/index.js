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
		path: "/game",
		name: "game",
		component: () => import("@/components/Game.vue"),
	},
	{
		path: "/operatorConsole",
		name: "operatorConsole",
		component: () => import("@/components/OperatorConsole.vue"),
	},
	{
		path: "/participantConsole",
		name: "participantConsole",
		component: () => import("@/components/ParticipantConsole.vue"),
	},
  ],
});

export default router;
