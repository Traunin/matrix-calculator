import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import DeterminantCalculator from "@/views/DeterminantCalculator.vue";
import MatrixSolver from "@/views/MatrixSolver.vue";
import MatrixMultiplier from "@/views/MatrixMultiplier.vue";
import MatrixInverse from "@/views/MatrixInverse.vue";
import MatrixInverseSolver from "@/views/MatrixInverseSolver.vue";
import MatrixGaussSolver from "@/views/MatrixGaussSolver.vue";
import EigenvectorFinder from "@/views/EigenvectorFinder.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: "/determinant",
    name: "Determinant calculator",
    component: DeterminantCalculator
  },
  {
    path: "/solver",
    name: "Matrix solver",
    component: MatrixSolver
  },
  {
    path: "/multiplier",
    name: "Matrix multiplier",
    component: MatrixMultiplier
  },
  {
    path: "/inverse",
    name: "Inverse matrix",
    component: MatrixInverse
  },
  {
    path: "/inverse-solver",
    name: "Inverse matrix solver",
    component: MatrixInverseSolver
  },
  {
    path: "/gauss-solver",
    name: "Gauss solver",
    component: MatrixGaussSolver
  },
  {
    path: "/eigenvector",
    name: "Matrix eigenvectors",
    component: EigenvectorFinder
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;