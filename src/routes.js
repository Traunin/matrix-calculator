import { createRouter, createWebHashHistory } from "vue-router";
import DeterminantCalculator from "@/views/DeterminantCalculator.vue";
import MatrixSolver from "@/views/MatrixSolver.vue";
import MatrixMultiplier from "@/views/MatrixMultiplier.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", redirect: '/determinant' },
        { path: "/determinant", component: DeterminantCalculator },
        { path: "/solver", component: MatrixSolver },
        { path: "/multiplier", component: MatrixMultiplier },
    ],
});

export default router;
