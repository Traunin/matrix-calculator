<template>
    <div class="calculator">
        <button @click.prevent="getSolutions()">Найти корни системы</button>
        <div
            class="result"
            v-if="solutionsFound"
        >
            <div
                v-if="determinant == 0"
                class="error"
            >
                Ошибка!
            </div>
            <div
                v-if="determinant != 0"
                class="solution"
                v-for="(solution, index) in solutions"
            >
                x<sub>{{ index + 1 }}</sub> = {{ solution }};&nbsp;
            </div>
        </div>

        <matrix-editor
            @update="solutionsFound = false"
            :matrix="matrix"
        ></matrix-editor>
    </div>
</template>

<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive } from "vue";

let matrix = reactive(new Matrix(4, 4, true, true));
let solutionsFound = ref(false);
let solutions = ref([]);
let determinant = ref(0);

function getSolutions() {
    let result = matrix.calculateSolutionsWithCramer();
    solutions.value = result.solutions;
    determinant.value = result.determinant;
    solutionsFound.value = true;
}
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    margin: 10px 20px;
    padding: 5px;
    font-size: 1em;
    display: inline-block;
    background-color: #4bbf44;
    color: black;
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
    flex-direction: row;
    font-size: 1em;
    font-family: "Roboto", sans-serif;
}

sub {
    vertical-align: sub;
    font-size: smaller;
}
</style>
