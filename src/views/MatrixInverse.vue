<template>
  <div class="calculator">
    <div class="matrix-display">
      <MatrixEditor :matrix="matrix" />
      <div
        v-show="inverseMatrixCalculated"
        class="inverse-matrix"
      >
        <MatrixEditor
          :matrix="inverseMatrix"
          :user-resizable="false"
        />
      </div>
    </div>
    <button @click.prevent="findInverseMatrix">
      Найти обратную матрицу
    </button>

    <div
      v-if="error"
      class="error"
    >
      Ошибка! Определитель равен нулю.
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import MatrixEditor from '@/components/matrix-editor.vue'
import Matrix from '@/utils/matrix'

const matrix = reactive(new Matrix(4, 4, true))
const inverseMatrix = reactive(new Matrix(4, 4, true))

const inverseMatrixCalculated = ref(false)
const error = ref(false)

watch(matrix, () => {
  inverseMatrixCalculated.value = false
  error.value = false
})

function findInverseMatrix() {
  const result = matrix.findInverseMatrix()
  const determinant = result.determinant
  if (determinant === 0) {
    error.value = true
  } else {
    inverseMatrix.setMatrix(result.inverseMatrix!)
    inverseMatrixCalculated.value = true
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
