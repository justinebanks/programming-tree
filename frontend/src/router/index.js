import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tree from "../views/Tree.vue";
import NodePage from "../views/NodePage.vue";

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
        },
        {
            path: "/node/:id",
            name: "node",
            component: NodePage,
        }
    ]
})

export default router;