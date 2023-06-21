import { createRouter, createWebHistory } from "vue-router";
import ProdutosView from "../views/ProdutosView.vue";

const routes = [
  {
    path: "/",
    name: "Produtos",
    component: ProdutosView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
