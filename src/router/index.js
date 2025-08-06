import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../views/ProductList.vue";
import ProductEditor from "../views/ProductEditor.vue";

const routes = [
  { path: "/", component: ProductList },
  { path: "/product/:id", component: ProductEditor },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
