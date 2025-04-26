<template>
  <div class="calculator">
    <div class="matrix-container">
      <matrix-editor :matrix="matrix2" />
    </div>

    <div class="matrix-container">
      <matrix-editor :matrix="matrix1" />
    </div>

    <div 
      class="matrix-container"
      style="padding-top: 16px"
    >
      <matrix-editor
        :matrix="matrix3"
        :user-resizable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MatrixEditor from "@/components/matrix-editor.vue";
import Matrix from "@/utils/matrix";

import { watch, reactive } from "vue";

const matrix1 = reactive(new Matrix(3, 2));
const matrix2 = reactive(new Matrix(4, 3));
const matrix3 = reactive(new Matrix(4, 2));

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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  margin: auto;
}

.matrix-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex-grow: 1;
  padding: 10px;
}

@media screen and (min-width: 1000px) {
  .calculator {
    flex-direction: row;
  }
}
</style>
