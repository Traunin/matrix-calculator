<template>
  <div>
    <div class="caption">
      {{ name }}
    </div>
    <button @click.prevent="offsetSize(-1)">
      —
    </button>
    <input
      v-model="internalSize"
      :name="name"
      :aria-label="`Set matrix ${name}`"
      @blur="blur"
      @keypress="isNumber($event)"
    >
    <button @click.prevent="offsetSize(1)">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  name: string
  size: number
}>()

const emit = defineEmits<{
  update: [size: number]
}>()

const debounceDelay = 200 // prop?
let emitTimeout: number | null = null
const internalSize = ref(props.size)

watch(() => props.size, (val) => {
  if (emitTimeout != null) {
    clearTimeout(emitTimeout)
  }
  internalSize.value = val
})

function isNumber(evt: KeyboardEvent) {
  const isNumber = /^\d$/.test(evt.key)
  if (!isNumber) {
    evt.preventDefault()
  }
}

function debounceInput() {
  if (emitTimeout != null) {
    clearTimeout(emitTimeout)
  }
  emitTimeout = setTimeout(emitUpdate, debounceDelay)
}

function offsetSize(offset: number) {
  const result = Number(internalSize.value) + offset
  if (result > 0 && result < 20) {
    internalSize.value += offset
    debounceInput()
  }
}

function blur() {
  emitUpdate()
  internalSize.value = props.size
}

function emitUpdate() {
  emit('update', Number(internalSize.value))
}
</script>

<style scoped>
.caption {
  text-align: center;
  margin-bottom: 5px;
  color: var(--text-color);
}

button {
  font-weight: 700;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: var(--primary-color);
  text-align: center;
  cursor: pointer;
  color: var(--text-color);
}

button:hover {
  border: 2px solid #dedcff;
}

input {
  width: 50px;
  text-align: center;
  font-family: "Roboto Monospace", monospace;
}

input {
  height: 25px;
  padding: 0;
  padding-block: 0;
  padding-inline: 0;
  border: 2px solid var(--text-color);
  box-sizing: border-box;
  margin: 0 10px;
  color: var(--text-color);
  background: var(--input-background);
}
</style>
