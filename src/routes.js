import { createRouter, createWebHashHistory } from "vue-router";
import DeterminantCalculator from "@/views/DeterminantCalculator.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: DeterminantCalculator },
        { path: "/determinant", component: DeterminantCalculator },
    ],
});

export default router;