<template>
    <div class="calculator">
        <matrix-editor
            @update="solutionsFound = false"
            :matrix="matrix"
        ></matrix-editor>

        <button @click.prevent="getSolutions()">Найти корни системы</button>
        <div
            class="result"
            v-if="solutionsFound"
        >
            <div
                class="solution"
                v-for="(solution, index) in solutions"
            >
                x<sub>{{ index + 1 }}</sub
                >{{ solution.k == "R" ? " ∊ R" : " = " + solution.k
                }}<span
                    class="rational-subtraction"
                    v-for="(subtraction, index) in solution.rationalSubtraction"
                >
                    {{ subtraction }}x<sub>{{ index }}</sub></span
                >;<br>
            </div>
        </div>
    </div>
</template>
<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive, watch } from "vue";

let matrix = reactive(new Matrix(3, 3, false, true));
let solutionsFound = ref(false);
let solutions = ref([]);

function getSolutions() {
    solutions.value = matrix.solveWithGaussElimination();
    solutionsFound.value = true;
}

watch(matrix, () => {
    solutionsFound.value = false;
});
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin: auto;
}

button {
    margin: 20px;
    padding: 5px;
    font-size: 1em;
    display: inline-block;
    background-color: #4bbf44;
    color: var(--text-color);
    border-radius: 5px;
    border: 3px solid #4bbf44;
    transition: all 0.1s;
    cursor: pointer;
}

button:hover {
    border-color: #94dada;
}

.result {
    margin: 0 0 10px 0;
    display: inline-flex;
    flex-direction: column;
    font-size: 1em;
    font-family: "Roboto", sans-serif;
}

sub {
    vertical-align: sub !important;
    font-size: smaller !important;
}
</style>
