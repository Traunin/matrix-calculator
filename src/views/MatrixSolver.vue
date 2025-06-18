<template>
  <div class="calculator">
    <MatrixEditor
      :matrix="matrix"
      @update="solutionsFound = false"
    />

    <button @click.prevent="getSolutions()">
      Find roots
    </button>
    <div
      v-if="solutionsFound"
      class="result"
    >
      <div
        v-if="determinant === 0"
        class="error"
      >
        Error! Determinant is 0
      </div>
      <div
        v-if="determinant !== 0"
        class="solutions"
      >
        <div
          v-for="(solution, index) in solutions"
          :key="index"
          class="solution"
        >
          x<sub>
            {{ index + 1 }}
          </sub> = {{ solution }};&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import MatrixEditor from '@/components/matrix-editor.vue'
import Matrix from '@/utils/matrix'

const matrix = reactive(new Matrix(4, 4, true, true))
const solutionsFound = ref(false)
const solutions = ref<number[]>([])
const determinant = ref(0)

function getSolutions() {
  const result = matrix.calculateSolutionsWithCramer()
  solutions.value = result.solutions
  determinant.value = result.determinant
  solutionsFound.value = true
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
  color: red;
}

.result,
.solutions {
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
