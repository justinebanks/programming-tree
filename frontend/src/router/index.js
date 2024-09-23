import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tree from "../views/Tree.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/tree",
            name: "tree",
            component: Tree
        }
    ]
})

export default router;