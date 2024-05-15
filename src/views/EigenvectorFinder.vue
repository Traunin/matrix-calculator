<template>
    <div class="calculator">
        <matrix-editor
            @update="solutionsFound = false; console.log(123)"
            :matrix="matrix"
        ></matrix-editor>

        <div class="eigenVectors" v-if="solutionsFound">
            <matrix-editor
                v-for = "vector in result"
                @update="solutionsFound = false"
                :user-resizable="false"
                :matrix="new Matrix(matrix.rowCount, 1, false, false, vector)"
            ></matrix-editor>
        </div>
        <button @click.prevent="getEigenvector()">Найти собственный вектор/значение</button>
    </div>
</template>

<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive, watch } from "vue";

let matrix = reactive(new Matrix(3, 3, true, false));
let solutionsFound = ref(false);
let result = ref([]);

function getEigenvector() {
    result.value = [...matrix.getEigenvector()];
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

.error {
    color: red;
}

.result, .solutions {
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
