import { createRouter, createWebHistory } from "vue-router";
import Vue2 from "../views/Vue2.vue";

const routes = [
  {
    path: "/",
    name: "Vue2",
    component: Vue2,
  },
  {
    path: "/v3",
    name: "Vue3",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Vue3.vue"),
  },
  {
    path: "/page",
    name: "page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/pages/page.vue"),
      redirect:'/home',
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/pages/Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/pages/About.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
