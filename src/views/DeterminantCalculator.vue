<template>
    <div class="calculator">
        <div class="determinant">
            <button @click.prevent="calculateDeterminant">
                Найти определитель
            </button>
            <div
                class="result"
                v-if="determinantCalculated"
            >
                Δ = {{ determinant }}
            </div>
        </div>

        <matrix-editor :matrix="matrix"></matrix-editor>
    </div>
</template>

<script setup>
import MatrixEditor from "@/components/MatrixEditor.vue";
import Matrix from "@/utils/matrix";
import { ref, reactive, watch } from "vue";

let matrix = reactive(new Matrix(4, 4, true, false));
let determinantCalculated = ref(false);
let determinant = ref(0);

watch(matrix, () => (determinantCalculated.value = false));

function calculateDeterminant() {
    determinantCalculated.value = true;
    determinant.value = matrix.calculateDetetrminantRecursively();
}
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    margin: 10px 20px;
    padding: 5px;
    font-size: 1em;
    display: inline-block;
    background-color: #4bbf44;
    color: black;
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
