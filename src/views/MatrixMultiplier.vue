<template>
    <div class="calculator">
        <div class="col">
            <div class="matrix-container">
                <matrix-editor :matrix="matrix2"></matrix-editor>
            </div>
        </div>

        <div class="col">
            <div class="matrix-container">
                <matrix-editor :matrix="matrix1"></matrix-editor>
            </div>

            <div class="matrix-container">
                <matrix-editor
                    :matrix="matrix3"
                    :user-resizable="false"
                ></matrix-editor>
            </div>
        </div>
    </div>
</template>

<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";

import { watch, reactive } from "vue";

let matrix1 = reactive(new Matrix(3, 2));
let matrix2 = reactive(new Matrix(4, 3));
let matrix3 = reactive(new Matrix(4, 2));

function multiplyMatrices() {
    matrix3.setMatrix(Matrix.multiplyMatrices(matrix1.matrix, matrix2.matrix));
}

watch(matrix2, () => {
    matrix1.setRowCount(matrix2.colCount);
    multiplyMatrices();
});

watch(matrix1, () => {
    matrix2.setColCount(matrix1.rowCount);
    multiplyMatrices();
});
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
}

.col {
    display: inline-flex;
    flex-direction: column;
}

.matrix-container {
    margin: 10px;
    display: inline-flex;
    justify-content: center;
}
</style>
