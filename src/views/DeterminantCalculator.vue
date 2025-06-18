<template>
  <div class="calculator">
    <MatrixEditor :matrix="matrix" />
    <div class="determinant">
      <button @click.prevent="calculateDeterminant">
        Calculate determinant
      </button>
      <div
        v-if="determinantCalculated"
        class="result"
      >
        Δ = {{ determinant }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import MatrixEditor from '@/components/matrix-editor.vue'
import Matrix from '@/utils/matrix'

const matrix = reactive(new Matrix(4, 4, true, false))
const determinantCalculated = ref(false)
const determinant = ref(0)

watch(matrix, () => (determinantCalculated.value = false))

function calculateDeterminant() {
  determinantCalculated.value = true
  determinant.value = matrix.calculateDetetrminantRecursively()
}
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: auto
}

button {
  margin: 20px;
  padding: 5px;
  font-size: 1em;
  display: inline-block;
  background-color: var(--primary-color);
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
  display: inline-block;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
}
</style>
