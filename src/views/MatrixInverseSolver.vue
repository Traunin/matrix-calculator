<template>
  <div class="calculator">
    <matrix-editor 
      :matrix="matrix"
      @update="solutionsFound = false"
    />

    <button @click.prevent="getSolutions()">
      Найти корни системы
    </button>
    <div
      v-if="solutionsFound"
      class="result"
    >
      <div
        v-if="determinant == 0"
        class="error"
      >
        Ошибка! Определитель равен нулю!
      </div>

      <div
        v-if="determinant != 0"
        class="solutions"
      >
        <div
          v-for="(solution, index) in solutions"
          :key="index"
          class="solution"
        >
          x
          <sub>
            {{ index + 1 }}
          </sub> = {{ solution }};&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MatrixEditor from "@/components/matrix-editor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive } from "vue";

const matrix = reactive(new Matrix(4, 4, true, true));
const solutions = ref<number[]>([]);
const solutionsFound = ref(false);
const determinant = ref(0);

function getSolutions() {
  const { determinant: det, solutions: sols } = matrix.findSolutionsWithInverseMatrix();

  determinant.value = det;
  if (det != 0) {
    solutions.value = sols!;
  }
  solutionsFound.value = true;
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
