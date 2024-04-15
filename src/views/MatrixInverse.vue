<template>
    <div class="calculator">
        <div class="matrix-display">
            <matrix-editor :matrix="matrix"></matrix-editor>
            <div
                class="inverse-matrix"
                v-show="inverseMatrixCalculated"
            >
                <matrix-editor
                    :matrix="inverseMatrix"
                    :user-resizable="false"
                ></matrix-editor>
            </div>
        </div>
        <button @click.prevent="findInverseMatrix">
            Найти обратную матрицу
        </button>

        <div
            class="error"
            v-if="error"
        >
            Ошибка! Определитель равен нулю.
        </div>
    </div>
</template>

<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive, watch } from "vue";

let matrix = reactive(new Matrix(4, 4, true));
let inverseMatrix = reactive(new Matrix(4, 4, true));

let inverseMatrixCalculated = ref(false);
let error = ref(false);

watch(matrix, () => {
    inverseMatrixCalculated.value = false;
    error.value = false;
});

function findInverseMatrix() {
    let result = matrix.findInverseMatrix();
    let determinant = result.determinant;
    if (determinant == 0) {
        error.value = true;
    } else {
        inverseMatrix.setMatrix(result.inverseMatrix);
        inverseMatrixCalculated.value = true;
    }
}
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
    margin: 0 0 10px 0;
    display: inline-flex;
    flex-direction: row;
    font-size: 1em;
    font-family: "Roboto", sans-serif;
    color: red;
}

.matrix-display {
    display: flex;
    align-items: flex-end;
}

.inverse-matrix {
    margin: 0 20px;
}
</style>
