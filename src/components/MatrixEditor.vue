<template>
    <div class="matrix">
        <div
            class="size-controller"
            v-if="userResizable"
        >
            <div
                class="row-controller"
                v-if="!matrix.isSquare"
            >
                <div class="row-count-caption">Строки</div>
                <button @click.prevent="removeRow">-</button>
                <input
                    v-model="inputRowCount"
                    @blur="updateDisplayedRowCount"
                />
                <button @click.prevent="addRow">+</button>
            </div>

            <div class="col-controller">
                <div class="col-count-caption">
                    {{ matrix.isSquare ? "Порядок" : "Столбцы" }}
                </div>
                <button @click.prevent="removeCol">-</button>
                <input
                    v-model="inputColCount"
                    @blur="updateDisplayedColCount"
                />
                <button @click.prevent="addCol">+</button>
            </div>
        </div>

        <table>
            <tr>
                <th>{{ displayedRowCount }} x {{ displayedColCount }}</th>
                <th v-for="colIndex in displayedColCount">
                    {{ colIndex }}
                </th>

                <th v-if="matrix.isAugmented">Доп.</th>
            </tr>
            <tr v-for="(row, rowIndex) in matrix.matrix">
                <td>{{ rowIndex + 1 }}</td>
                <matrix-cell
                    v-for="(value, colIndex) in row"
                    :col-index="colIndex"
                    :row-index="rowIndex"
                    :matrix-id="id"
                    :value="value == 0 ? 0 : value"
                    @input="(e) => updateCellValue(rowIndex, colIndex, e)"
                ></matrix-cell>

                <matrix-cell
                    v-if="matrix.isAugmented"
                    :col-index="matrix.colCount + 1"
                    :row-index="rowIndex"
                    :matrix-id="id"
                    :value="matrix.kVector[rowIndex]"
                    @input="(e) => updateKVectorValue(rowIndex, e)"
                ></matrix-cell>
            </tr>
        </table>
    </div>
</template>

<script setup>
import Matrix from "@/utils/matrix";
import MatrixCell from "@/components/MatrixCell.vue";
import { uidGet } from "@/utils/uidGenerator.js";
import { computed, defineProps, reactive, watch, ref } from "vue";

const id = uidGet();

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

watch(inputRowCount, (val) => {
    matrix.setRowCount(val);
});

watch(inputColCount, (val) => {
    matrix.setColCount(val);
});

watch(matrix, () => {
    updateDisplayedRowCount();
    updateDisplayedColCount();
});
</script>

<style scoped>
.matrix {
    font-family: "Roboto", sans-serif;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
}

table {
    margin: auto;
}

td {
    text-align: center;
}

td:first-child {
    padding: 0 0px;
}

th {
    height: 25px;
    line-height: 25px;
    text-wrap: nowrap;
}

button {
    font-size: 15px;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: none;
    background-color: #4bbf44;
    text-align: center;
    cursor: pointer;
}

button:hover {
    border: 2px solid #dedcff;
}

.size-controller {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.size-controller input {
    width: 50px;
    text-align: center;
}

.row-count-caption,
.col-count-caption {
    text-align: center;
    margin-bottom: 5px;
}

.size-controller input {
    height: 25px;
    padding: 0;
    padding-block: 0;
    padding-inline: 0;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 0 10px;
}

.col-controller,
.row-controller {
    margin: 0 5px;
}
</style>
