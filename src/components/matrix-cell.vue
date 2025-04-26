<template>
  <td>
    <input
      :id="`cell-${matrixId}-${colIndex}-${rowIndex}`"
      ref="input"
      v-model="displayedValue"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      @focus="selectAllText"
      @blur="unsetNaN"
    >
  </td>
</template>

<script setup lang="ts">
import { ref, watch, useTemplateRef } from "vue"

const props = defineProps<{
  rowIndex: number,
  colIndex: number,
  matrixId: number,
  value: number
}>();

const input = useTemplateRef<HTMLInputElement>("input")
const displayedValue = ref<number | string>(props.value)

function selectAllText() {
  input.value?.select()
}

function unsetNaN() {
  const num = parseFloat(String(displayedValue.value))
  displayedValue.value = isNaN(num) ? 0 : num; // put a zero when the cell is empty
}

watch(() => props.value, (newVal) => {
  //updates value in cell when matrix is externally updated
  if (displayedValue.value != "") {
    displayedValue.value = newVal
  }
})
</script>

<style scoped>
td {
  width: 35px;
  border: 2px solid var(--text-color);
}

@media screen and (min-width: 1000px) {
  input {
    width: 60px !important;
    font-size: 1em !important;
  }

  td {
    width: 60px !important;
  }
}

input {
  width: 35px;
  font-size: 0.8em;
  height: 27px;
  outline: none;
  text-align: center;
  font-family: "Roboto Mono", monospace;
  border: none;
  padding: 0;
  color: var(--text-color);
  background: var(--input-background);
}
</style>
