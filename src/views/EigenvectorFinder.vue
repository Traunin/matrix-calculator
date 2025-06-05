<template>
  <div class="calculator">
    <MatrixEditor
      :matrix="matrix"
      @update="solutionsFound = false"
    />

    <div
      v-if="solutionsFound"
      class="eigenpairs"
    >
      <div
        v-for="(eigenPair, index) in result"
        :key="index"
        class="eigenpair"
      >
        <div class="eigenvalue">
          𝜆 = {{ eigenPair.eigenvalue }}
        </div>
        <div class="eigenvector">
          <div
            v-for="coefficient in eigenPair.eigenvector"
            :key="coefficient.toString()"
            class="coefficient"
            v-html="wrapIndex(coefficient)"
          />
        </div>
      </div>
    </div>
    <button @click.prevent="getEigenvector()">
      Найти собственный вектор/значение
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import MatrixEditor from '@/components/matrix-editor.vue'
import Matrix from '@/utils/matrix'

const matrix = reactive(new Matrix(3, 3, true, false))
const solutionsFound = ref(false)
const result = ref<{ eigenvalue: string, eigenvector: string[][] }[]>([])

function getEigenvector() {
  result.value = [...matrix.getEigenvector()]
  solutionsFound.value = true
}

function wrapIndex(str: string[]) {
  return str.toString().replace(/x(\d+)/g, 'x<sub>$1</sub>')
}

watch(matrix, () => {
  solutionsFound.value = false
})
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

.result,
.solutions {
  margin: 0 0 10px 0;
  display: inline-flex;
  flex-direction: row;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
}

.eigenpairs {
  display: flex;
  flex-direction: row;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  gap: 20px;
  margin-top: 20px;
}

.eigenpair,
.eigenvector {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
}

.eigenpair {
  gap: 5px;
}

.coefficient {
  border-right: 3px solid var(--text-color);
  border-left: 3px solid var(--text-color);
  padding: 5px;
}

.coefficient:first-child {
  border-radius: 10px 10px 0 0;
}

.coefficient:last-child {
  border-radius: 0 0 10px 10px;
}
</style>
