import { createRouter, createWebHistory } from "vue-router";
import Root from "./views/index.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      name: "root",
      component: Root,
    },
  ],
  history: createWebHistory(),
});

export default router;
