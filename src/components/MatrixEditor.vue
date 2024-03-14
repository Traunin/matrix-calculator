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
                <th>{{ matrix.rowCount }} x {{ matrix.colCount }}</th>
                <th v-for="colIndex in matrix.colCount">
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
                    :value="value"
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

<script>
import MatrixCell from "@/components/MatrixCell.vue";
import Matrix from "@/utils/matrix";
import uidGenerator from "@/utils/uidGenerator";

export default {
    components: {
        MatrixCell,
    },

    mixins: [uidGenerator],

    props: {
        userResizable: {
            type: Boolean,
            default: true,
        },

        matrix: {
            type: Matrix,
            required: true,
        },
    },

    data() {
        return {
            inputRowCount: parseInt(this.matrix.rowCount),
            inputColCount: parseInt(this.matrix.colCount),
            id: this.uidGet(),
        };
    },

    watch: {
        inputRowCount(val) {
            if (this.matrix.setRowCount(val)) {
                this.$emit("update");
            }
        },

        inputColCount(val) {
            if (this.matrix.setColCount(val)) {
                this.$emit("update");
            }
        },
    },

    methods: {
        updateDisplayedRowCount() {
            this.inputRowCount = this.matrix.rowCount;
        },

        updateDisplayedColCount() {
            this.inputColCount = this.matrix.colCount;
        },

        addRow() {
            this.matrix.addRow();
            this.inputRowCount = this.matrix.rowCount;
            this.$emit("update");
        },

        removeRow() {
            this.matrix.removeRow();
            this.inputRowCount = this.matrix.rowCount;
            this.$emit("update");
        },

        addCol() {
            this.matrix.addCol();
            this.inputColCount = this.matrix.colCount;
            this.$emit("update");
        },

        removeCol() {
            this.matrix.removeCol();
            this.inputColCount = this.matrix.colCount;
            this.$emit("update");
        },

        updateCellValue(rowIndex, colIndex, e) {
            this.matrix.updateCellValue(rowIndex, colIndex, e);
            this.$emit("update");
        },

        updateKVectorValue(rowIndex, e) {
            this.matrix.updateKVectorValue(rowIndex, e);
            this.$emit("update");
        },
    },
};
</script>

<style scoped>
.matrix {
    font-family: "Roboto", sans-serif;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
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
../utils/uidGenerator
