import { createRouter, createWebHashHistory } from "vue-router";
import DeterminantCalculator from "./components/DeterminantCalculator.vue"
import MatrixSolver from "./components/MatrixSolver.vue"
import MatrixMultiplier from "./components/MatrixMultiplier.vue"



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: DeterminantCalculator },
        { path: "/determinant", component: DeterminantCalculator },
        { path: "/roots", component: MatrixSolver },
        { path: "/multiply", component: MatrixMultiplier },
    ],
});

export default router;