import { createRouter, createWebHashHistory } from "vue-router";
import DeterminantCalculator from "@/views/DeterminantCalculator.vue";
import MatrixSolver from "@/views/MatrixSolver.vue";
import MatrixMultiplier from "@/views/MatrixMultiplier.vue";
import MatrixInverse from "@/views/MatrixInverse.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", redirect: '/determinant' },
        { path: "/determinant", component: DeterminantCalculator },
        { path: "/solver", component: MatrixSolver },
        { path: "/multiplier", component: MatrixMultiplier },
        { path: "/inverse", component: MatrixInverse },
    ],
});

export default router;
