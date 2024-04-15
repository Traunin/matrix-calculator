<template>
    <div class="matrix">
        <div
            class="matrix-editor"
            v-show="editorOpen"
        >
            <textarea
                :id="`matrix-editor-${id}`"
                :cols="displayedColCount * 2 + 4"
                :rows="displayedRowCount + 2"
                @keypress="isNumberOrSpace($event)"
                v-model="editorText"
                ref="matrixEditor"
            ></textarea>
            <button @click.prevent="closeEditor">Закрыть</button>
        </div>

        <div class="size-controller">
            <button
                @click.prevent="openEditor"
                class="open-editor-button"
            >
                <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="15px"
                    height="15px"
                    viewBox="0 0 93.842 93.843"
                    xml:space="preserve"
                >
                    <g>
                        <path
                            d="M74.042,11.379h-9.582v-0.693c0-1.768-1.438-3.205-3.206-3.205h-6.435V3.205C54.819,1.437,53.381,0,51.614,0H42.23
		c-1.768,0-3.206,1.438-3.206,3.205V7.48H32.59c-1.768,0-3.206,1.438-3.206,3.205v0.693h-9.582c-2.393,0-4.339,1.945-4.339,4.34
		v73.785c0,2.394,1.946,4.34,4.339,4.34h54.238c2.394,0,4.339-1.946,4.339-4.34V15.719C78.38,13.324,76.434,11.379,74.042,11.379z
		 M32.617,25.336h28.61c1.709,0,3.102-1.391,3.102-3.1v-3.438h7.554l0.021,68.164l-49.939,0.021V18.801h7.554v3.436
		C29.517,23.945,30.907,25.336,32.617,25.336z"
                        />
                    </g>
                </svg>
            </button>
            <div
                class="row-controller"
                v-if="!matrix.isSquare && userResizable"
            >
                <div class="row-count-caption">Строки</div>
                <button @click.prevent="removeRow">—</button>
                <input
                    :id="`row-count-editor-${id}`"
                    v-model="inputRowCount"
                    @blur="updateDisplayedRowCount"
                />
                <button @click.prevent="addRow">+</button>
            </div>

            <div
                class="col-controller"
                v-if="userResizable"
            >
                <div class="col-count-caption">
                    {{ matrix.isSquare ? "Порядок" : "Столбцы" }}
                </div>
                <button @click.prevent="removeCol">—</button>
                <input
                    :id="`col-count-editor-${id}`"
                    v-model="inputColCount"
                    @blur="updateDisplayedColCount"
                    @keypress="isNumber($event)"
                />
                <button @click.prevent="addCol">+</button>
            </div>
        </div>
        <div class="matrix-table">
            <table>
                <tr>
                    <th class="size">
                        {{ displayedRowCount }} x {{ displayedColCount }}
                    </th>
                    <th v-for="colIndex in displayedColCount">
                        {{ colIndex }}
                    </th>

                    <th v-if="matrix.isAugmented">Доп.</th>
                </tr>
                <tr v-for="(row, rowIndex) in matrix.matrix">
                    <td class="row-index">{{ rowIndex + 1 }}</td>
                    <matrix-cell
                        v-for="(value, colIndex) in row"
                        :col-index="colIndex"
                        :row-index="rowIndex"
                        :matrix-id="id"
                        :value="value == 0 ? 0 : value"
                        @keypress="isNumber($event)"
                        @input="(e) => updateCellValue(rowIndex, colIndex, e)"
                    ></matrix-cell>

                    <matrix-cell
                        v-if="matrix.isAugmented"
                        :col-index="matrix.colCount + 1"
                        :row-index="rowIndex"
                        :matrix-id="id"
                        :value="matrix.kVector[rowIndex]"
                        @keypress="isNumber($event)"
                        @input="(e) => updateKVectorValue(rowIndex, e)"
                    ></matrix-cell>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
import Matrix from "@/utils/matrix";
import MatrixCell from "@/components/MatrixCell.vue";
import { uidGet } from "@/utils/uidGenerator.js";
import { computed, reactive, watch, ref } from "vue";

const id = uidGet();
let editorOpen = ref(false);
let editorText = ref("");
let matrixEditor = ref(null);

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

let matrix = reactive(props.matrix);

let inputRowCount = ref(parseInt(matrix.rowCount));
let inputColCount = ref(parseInt(matrix.colCount));

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

function updateCellValue(rowIndex, colIndex, e) {
    matrix.updateCellValue(rowIndex, colIndex, e);
}

function updateKVectorValue(rowIndex, e) {
    matrix.updateKVectorValue(rowIndex, e);
}

function openEditor() {
    editorText.value = matrix.getMatrixAsString();
    editorOpen.value = true;
    setTimeout(() => matrixEditor.value.select(), 0);
}

function closeEditor() {
    matrix.updateMatrixFromString(editorText.value);
    editorOpen.value = false;
}

function isNumber(evt) {
    //evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
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

function isNumberOrSpace(evt) {
    //evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
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
    background-color: #4bbf44;
    border: 2px solid #4bbf44 !important;
    text-align: center;
    cursor: pointer;
    align-self: center;
    width: 25px;
    height: 25px;
    padding: 3px;
    align-self: end;
    box-sizing: border-box;
}

svg {
    fill: var(--text-color);
}

.open-editor-button:hover {
    border-color: #dedcff !important;
}

table {
    margin: 0 80px;
    position: relative;
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
    position: absolute;
    height: 25px;
    left: -90px;
    width: 80px;
    text-align: right;
    font-family: "Roboto Monospace", monospace;
}

.row-index {
    position: absolute;
    left: -25px;
    height: 29px;
    line-height: 29px;
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
    background-color: #4bbf44;
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
