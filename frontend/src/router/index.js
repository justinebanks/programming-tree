import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Tree from "../views/Tree.vue";
import NodePage from "../views/NodePage.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";

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
            
        },
        {
            path: "/signup",
            name: "signup",
            component: RegisterView,
            
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
        }
    ]
})

export default router;