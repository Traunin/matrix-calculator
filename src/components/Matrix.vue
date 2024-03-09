<template>
    <div class="matrix">
        <div class="size-controller">
            <div
                class="row-controller"
                v-if="!isSquare"
            >
                <div class="row-count-caption">Ряды</div>
                <button @click.prevent="removeRow">-</button>
                <input
                    v-model="inputRowCount"
                    @blur="updateDisplayedRowCount"
                />
                <button @click.prevent="addRow">+</button>
            </div>

            <div class="col-controller">
                <div class="col-count-caption">
                    {{ isSquare ? "Порядок" : "Столбцы" }}
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
                <th style="text-wrap: nowrap">
                    {{ colCount }} x {{ rowCount }}
                </th>
                <th v-for="colIndex in nanAdustedColCount">
                    {{ colIndex }}
                </th>

                <th v-if="isAugmented">Доп.</th>
            </tr>
            <tr v-for="rowIndex in nanAdustedRowCount">
                <td>{{ rowIndex }}</td>
                <matrix-cell
                    v-for="colIndex in nanAdustedColCount"
                    :col-index="colIndex"
                    :row-index="rowIndex"
                    :cell-id="`cell-${id}-${colIndex}-${rowIndex}`"
                    @update:model-value="
                        (val) => (values[rowIndex - 1][colIndex - 1] = val)
                    "
                ></matrix-cell>

                <matrix-cell
                    v-if="isAugmented"
                    :col-index="colCount + 1"
                    :row-index="rowIndex"
                    :cell-id="`cell-${id}-${colCount + 1}-${rowIndex}`"
                    @update:model-value="(val) => (kVector[rowIndex - 1] = val)"
                ></matrix-cell>
            </tr>
        </table>
    </div>
</template>

<script>
import MatrixCell from "./MatrixCell.vue";
import uidGenerator from "./uidGenerator";
import matrixCalculator from "./matrixCalculator";

export default {
    components: {
        MatrixCell,
    },

    mixins: [uidGenerator, matrixCalculator],

    props: {
        cols: {
            type: Number,
            default: 5,
        },

        rows: {
            type: Number,
            default: 5,
        },

        isAugmented: {
            type: Boolean,
            default: false,
        },

        isSquare: {
            type: Boolean,
            default: false,
        },

        hasCompatible: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            rowCount: this.isSquare ? this.cols : this.rows,
            colCount: this.cols,
            inputRowCount: this.isSquare ? this.cols : this.rows,
            inputColCount: this.cols,
            id: this.uidGet(),
            values: [],
            kVector: [],
        };
    },

    mounted() {
        while (this.values.length < this.rowCount) {
            this.values.push([]);
        }

        this.$bus.$on("determinantNeeded", this.calculateDetetrminant);
    },

    computed: {
        colCountAdjustedForSquareness() {
            return this.isSquare ? this.colCount : this.colCount;
        },

        colCountAdjustedForSquareness() {
            return this.isSquare ? this.colCount : this.rowCount;
        },

        nanAdustedColCount() {
            return isNaN(this.colCount) ? 1 : this.colCount;
        },

        nanAdustedRowCount() {
            return isNaN(this.rowCount) ? 1 : this.rowCount;
        },
    },

    watch: {
        inputRowCount(val, oldVal) {
            let newRowCount = Math.min(Math.max(parseInt(val), 1), 100);
            this.rowCount = isNaN(newRowCount) ? 1 : newRowCount;
        },

        inputColCount(val, oldVal) {
            let newColCount = Math.min(Math.max(parseInt(val), 1), 100);
            this.colCount = isNaN(newColCount) ? 1 : newColCount;
        },

        colCount(val, oldVal) {
            this.inputColCount = val;
        },

        rowCount(val, oldVal) {
            this.inputRowCount = val;
        },
    },

    methods: {
        updateDisplayedRowCount() {
            this.inputRowCount = this.rowCount;
        },

        updateDisplayedColCount() {
            this.inputColCount = this.colCount;
        },

        addRow() {
            this.rowCount = Math.min(this.rowCount + 1, 100);
            while (this.values.length < this.rowCount) {
                this.values.push([]);
            }
        },

        removeRow() {
            this.rowCount = Math.max(this.rowCount - 1, 1);
        },

        addCol() {
            this.colCount = Math.min(this.colCount + 1, 100);
            if (this.isSquare) {
                this.rowCount = this.colCount;
                while (this.values.length < this.rowCount) {
                    this.values.push([]);
                }
            }
        },

        removeCol() {
            this.colCount = Math.max(this.colCount - 1, 1);
            if (this.isSquare) {
                this.rowCount = this.colCount;
            }
        },

        calculateDetetrminant() {
            let trimmedArray = [];
            for (let i = 0; i < this.rowCount; i++) {
                trimmedArray[i] = [];
                for (let j = 0; j < this.colCount; j++) {
                    let tempVal = this.values[i][j];
                    trimmedArray[i][j] = tempVal == null ? 0 : tempVal;
                }
            }

            let determinant =
                this.calculateDetetrminantRecursively(trimmedArray);
            this.$bus.$emit("determinantCalculated", determinant);
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
    padding: 0 15px;
}

th {
    height: 25px;
    line-height: 25px;
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
}

.size-controller input {
    width: 50px;
    text-align: center;
}

.row-count-caption,
.col-count-caption {
    text-align: center;
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
