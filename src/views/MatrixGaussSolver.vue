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
        v-for="(solution, index) in solutions" 
        :key="index" 
        class="solution"
      >
        x
        <sub>
          {{ index + 1 }}
        </sub>
        {{ solution.k == "R" ? " ∊ R" : " = " + solution.k }}
        <span 
          v-for="(subtraction, subIndex) in (solution as RationalRoot).rationalSubtraction" 
          :key="subIndex"
          class="rational-subtraction"
        >
          {{ subtraction }}x
          <sub>
            {{ subIndex }}
          </sub></span>
        ;<br>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import MatrixEditor from "@/components/matrix-editor.vue";
import Matrix from "@/utils/matrix";
import type { RationalRoot, Root } from "@/types/types"

const matrix = reactive(new Matrix(3, 3, false, true));
const solutionsFound = ref(false);
const solutions = ref<Root[]>([]);

function getSolutions() {
  solutions.value = matrix.solveWithGaussElimination();
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

.result {
  margin: 0 0 10px 0;
  display: inline-flex;
  flex-direction: column;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
}

sub {
  vertical-align: sub !important;
  font-size: smaller !important;
}
</style>
