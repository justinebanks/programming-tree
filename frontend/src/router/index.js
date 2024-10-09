import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tree from "../views/Tree.vue";
import NodePage from "../views/NodePage.vue";
import LoginView from "../views/LoginView.vue";

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
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            props: { createAccount: false }
        },
        {
            path: "/signup",
            name: "signup",
            component: LoginView,
            props: { createAccount: true }
        }
    ]
})

export default router;