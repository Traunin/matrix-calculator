import { createRouter, createWebHashHistory } from "vue-router";
import DeterminantCalculator from "@/views/DeterminantCalculator.vue";
import MatrixSolver from "@/views/MatrixSolver.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: DeterminantCalculator },
        { path: "/determinant", component: DeterminantCalculator },
        { path: "/solver", component: MatrixSolver },
    ],
});

export default router;