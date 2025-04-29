<template>
  <div class="matrix">
    <div
      v-show="editorOpen"
      class="matrix-editor"
    >
      <textarea
        :id="`matrix-editor-${id}`"
        ref="matrixEditor"
        v-model="editorText"
        :cols="displayedColCount * 2 + 4"
        :rows="displayedRowCount + 2"
        @keypress="isNumberOrSpace($event)"
      />
      <button @click.prevent="closeEditor">
        Закрыть
      </button>
    </div>

    <div class="size-controller">
      <button
        class="open-editor-button"
        @click.prevent="openEditor"
      >
        <editor-icon />
      </button>
      <div
        v-if="!matrix.isSquare && userResizable"
        class="row-controller"
      >
        <div class="row-count-caption">
          Строки
        </div>
        <button @click.prevent="removeRow">
          —
        </button>
        <input
          :id="`row-count-editor-${id}`"
          v-model="inputRowCount"
          @blur="updateDisplayedRowCount"
        >
        <button @click.prevent="addRow">
          +
        </button>
      </div>

      <div
        v-if="userResizable"
        class="col-controller"
      >
        <div class="col-count-caption">
          {{ matrix.isSquare ? "Порядок" : "Столбцы" }}
        </div>
        <button @click.prevent="removeCol">
          —
        </button>
        <input
          :id="`col-count-editor-${id}`"
          v-model="inputColCount"
          @blur="updateDisplayedColCount"
          @keypress="isNumber($event)"
        >
        <button @click.prevent="addCol">
          +
        </button>
      </div>
    </div>
    <div class="matrix-table">
      <table>
        <tbody>
          <tr>
            <th class="size">
              {{ displayedRowCount }} x {{ displayedColCount }}
            </th>
            <th 
              v-for="colIndex in displayedColCount"
              :key="colIndex"
            >
              {{ colIndex }}
            </th>

            <th v-if="matrix.isAugmented">
              Доп.
            </th>
          </tr>
          <tr 
            v-for="(row, rowIndex) in matrix.matrix"
            :key="rowIndex"
          >
            <td class="row-index">
              {{ rowIndex + 1 }}
            </td>
            <matrix-cell
              v-for="(value, colIndex) in row"
              :key="`${colIndex}_${rowIndex}`"
              :col-index="colIndex"
              :row-index="rowIndex"
              :matrix-id="id"
              :value="value == 0 ? 0 : value"
              @keypress="isNumber($event)"
              @input="(e: KeyboardEvent) => updateCellValue(rowIndex, colIndex, e)"
            />

            <matrix-cell
              v-if="matrix.isAugmented"
              :col-index="matrix.colCount + 1"
              :row-index="rowIndex"
              :matrix-id="id"
              :value="matrix.kVector[rowIndex]"
              @keypress="isNumber($event)"
              @input="(e: KeyboardEvent) => updateKVectorValue(rowIndex, e)"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Matrix from "@/utils/matrix";
import MatrixCell from "@/components/matrix-cell.vue";
import editorIcon from "@/components/editor-icon.vue";
import { uidGet } from "@/utils/uidGenerator";
import { computed, reactive, watch, ref, useTemplateRef } from "vue";

const id = uidGet();
const editorOpen = ref(false);
const editorText = ref("");
const matrixEditor = useTemplateRef("matrixEditor");

const props = defineProps({
  userResizable: {
    type: Boolean,
    default: true,
  },

  matrix: {
    type: Matrix,
    required: true,
  },
});

const matrix = reactive(props.matrix);

const inputRowCount = ref(matrix.rowCount);
const inputColCount = ref(matrix.colCount);

const displayedRowCount = computed(() => {
  return matrix.rowCount;
});

const displayedColCount = computed(() => {
  return matrix.colCount;
});

function updateDisplayedRowCount() {
  inputRowCount.value = matrix.rowCount;
}

function updateDisplayedColCount() {
  inputColCount.value = matrix.colCount;
}

function addRow() {
  matrix.addRow();
}

function removeRow() {
  matrix.removeRow();
}

function addCol() {
  matrix.addCol();
}

function removeCol() {
  matrix.removeCol();
}

function updateCellValue(rowIndex: number, colIndex: number, e: KeyboardEvent) {
  const newValue = parseFloat((e.target as HTMLInputElement).value);
  if (!isNaN(newValue)) {
    matrix.updateCellValue(rowIndex, colIndex, newValue);
  }
}

function updateKVectorValue(rowIndex: number, e: KeyboardEvent) {
  const newValue = parseFloat((e.target as HTMLInputElement).value);
  if (!isNaN(newValue)) {
    matrix.updateKVectorValue(rowIndex, newValue);
  }
}

function openEditor() {
  editorText.value = matrix.getMatrixAsString();
  editorOpen.value = true;
  setTimeout(() => matrixEditor.value?.select(), 0);
}

function closeEditor() {
  matrix.updateMatrixFromString(editorText.value);
  editorOpen.value = false;
}

function isNumber(evt: KeyboardEvent) {
  //evt = evt ? evt : window.event;
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode !== 46 &&
    charCode !== 45
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
}

function isNumberOrSpace(evt: KeyboardEvent) {
  //evt = evt ? evt : window.event;
  const charCode = evt.which ? evt.which : evt.keyCode;
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode !== 46 &&
    charCode !== 45 &&
    charCode !== 32
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
}

watch(inputRowCount, (val) => {
  matrix.setRowCount(val);
});

watch(inputColCount, (val) => {
  matrix.setColCount(val);
});

watch(matrix, () => {
  updateDisplayedRowCount();
  updateDisplayedColCount();
  editorText.value = matrix.getMatrixAsString();
});
</script>

<style scoped>
.matrix {
  font-family: "Roboto", sans-serif;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  flex: 0 0 auto;
}

.matrix-editor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.matrix-editor textarea {
  border: 2px solid var(--text-color);
  margin: 5px 0;
  padding: 5px;
  font-size: 1.05em;
  font-family: "Roboto Mono", monospace;
}

.matrix-editor button {
  font-size: 15px;
  border-radius: 5px;
  padding: 5px;
  border: none;
  background-color: #4bbf44;
  border: 2px solid #4bbf44;
  text-align: center;
  cursor: pointer;
  color: var(--text-color);
}

.matrix-editor button:hover {
  border: 2px solid #dedcff;
}

.size-controller .open-editor-button {
  font-size: 15px;
  border-radius: 5px;
  padding: 5px;
  border: none;
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color) !important;
  text-align: center;
  cursor: pointer;
  align-self: center;
  width: 25px;
  height: 25px;
  padding: 3px;
  align-self: end;
  box-sizing: border-box;
}

.open-editor-button:hover {
  border-color: #dedcff !important;
}

table {
  margin-right: 80px;
}

.matrix-table {
  margin: 0 auto;
}

td {
  text-align: center;
  color: var(--text-color);
}

td:first-child {
  padding: 0 0px;
}

th {
  height: 25px;
  line-height: 25px;
  text-wrap: nowrap;
  color: var(--text-color);
  font-family: "Roboto Monospace", monospace;
}

.size {
  height: 25px;
  padding-right: 10px;
  width: 80px;
  text-align: right;
  font-family: "Roboto Monospace", monospace;
}

.row-index {
  height: 29px;
  line-height: 29px;
  padding-right: 10px !important;
  width: 80px;
  left: -90px;
  text-align: right;
  font-family: "Roboto Monospace", monospace;
}

.size-controller button {
  font-size: 15px;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: var(--primary-color);
  text-align: center;
  cursor: pointer;
  color: var(--text-color);
}

.size-controller button:hover {
  border: 2px solid #dedcff;
}

.size-controller {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 25px;
}

.size-controller input {
  width: 50px;
  text-align: center;
  font-family: "Roboto Monospace", monospace;
}

.row-count-caption,
.col-count-caption {
  text-align: center;
  margin-bottom: 5px;
  color: var(--text-color);
}

.size-controller input {
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

.col-controller,
.row-controller {
  margin: 0 5px;
  width: 120px;
}
</style>
