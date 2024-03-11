<template>
    <div class="matrix">
        <div
            class="size-controller"
            v-if="userResizable"
        >
            <div
                class="row-controller"
                v-if="!isSquare"
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
                <th
                    style="text-wrap: nowrap"
                    width="55"
                >
                    {{ rowCount }} x {{ colCount }}
                </th>
                <th
                    v-for="colIndex in nanAdustedColCount"
                    width="55"
                >
                    {{ colIndex }}
                </th>

                <th v-if="isAugmented">Доп.</th>
            </tr>
            <tr v-for="rowIndex in nanAdustedRowCount">
                <td width="45">{{ rowIndex }}</td>
                <matrix-cell
                    v-for="colIndex in nanAdustedColCount"
                    :col-index="colIndex"
                    :row-index="rowIndex"
                    :matrix-id="id"
                    @update:model-value="
                        (val) =>
                            (values[rowIndex - 1][colIndex - 1] =
                                parseFloat(val))
                    "
                ></matrix-cell>

                <matrix-cell
                    v-if="isAugmented"
                    :col-index="colCount + 1"
                    :row-index="rowIndex"
                    :cell-id="`cell-${id}-${colCount + 1}-${rowIndex}`"
                    @update:model-value="
                        (val) => (kVector[rowIndex - 1] = parseFloat(val))
                    "
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

        uid: {
            type: Number,
            default: -1,
        },

        userResizable: {
            type: Boolean,
            default: true,
        },

        linkedRowUid: {
            type: Number,
            default: -1,
        },

        linkedColUid: {
            type: Number,
            default: -1,
        },
    },

    data() {
        return {
            rowCount: this.isSquare ? this.cols : this.rows,
            colCount: this.cols,
            inputRowCount: this.isSquare ? this.cols : this.rows,
            inputColCount: this.cols,
            id: this.uid == -1 ? this.uidGet() : this.uid, //Get()
            values: [[]],
            kVector: [],
        };
    },


    mounted() {
        while (this.values.length < this.rowCount) {
            this.values.push([]);
        }

        while (this.kVector.length < this.rowCount) {
            this.kVector.push(0);
        }

        this.$bus.$on("determinantNeeded", this.calculateDetetrminant);
        this.$bus.$on("solutionNeeded", this.findSolution);

        // needed only for matrix multiplication and compatible matrices
        if (this.linkedColUid != -1 && this.linkedRowUid != -1) {
            this.$bus.$on("colsChanged" + this.linkedColUid, (newColCount) => {
                this.colCount = newColCount;
            });
            this.$bus.$on("rowsChanged" + this.linkedRowUid, (newColCount) => {
                this.rowCount = newColCount;
            });
            this.$bus.$on("matricesMultiplied", (product) => {
                this.$bus.$emit("writeValues" + this.id, product);
            });
        } else if (this.linkedColUid != -1) {
            this.$bus.$on("colsChanged" + this.linkedColUid, (newColCount) => {
                this.rowCount = newColCount;
            });

            this.$bus.$on("secondPayloadNeeded", (payload) => {
                
                let trimmedArray = [];
                for (let i = 0; i < this.rowCount; i++) {
                    trimmedArray[i] = [];
                    for (let j = 0; j < this.colCount; j++) {
                        let tempVal
                        if (i < this.values.length) {
                            tempVal = this.values[i][j];
                        }
                         
                        trimmedArray[i][j] = tempVal == null ? 0 : tempVal;
                    }
                }

                let product = this.multiplyMatrices(trimmedArray, payload);
                this.$bus.$emit("matricesMultiplied", product);
            });
        } else if (this.linkedRowUid != -1) {
            this.$bus.$on("rowsChanged" + this.linkedRowUid, (newColCount) => {
                this.colCount = newColCount;
            });

            this.$bus.$on("multiplicationNeeded", () => {
                let trimmedArray = [];
                for (let i = 0; i < this.rowCount; i++) {
                    trimmedArray[i] = [];
                    for (let j = 0; j < this.colCount; j++) {
                        let tempVal
                        if (i < this.values.length) {
                            tempVal = this.values[i][j];
                        }
                         
                        trimmedArray[i][j] = tempVal == null ? 0 : tempVal;
                    }
                }
                
                this.$bus.$emit("secondPayloadNeeded", trimmedArray);
            });
        }
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
            this.$bus.$emit("colsChanged" + this.id, val);
        },

        rowCount(val, oldVal) {
            while (this.values.length < this.rowCount) {
                this.values.push([]);
            }
            this.inputRowCount = val;
            this.$bus.$emit("rowsChanged" + this.id, val);
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

        findSolution() {
            let trimmedArray = [];
            let trimmedKVector = [];
            for (let i = 0; i < this.rowCount; i++) {
                trimmedArray[i] = [];
                trimmedKVector[i] = this.kVector[i];
                for (let j = 0; j < this.colCount; j++) {
                    let tempVal = this.values[i][j];
                    trimmedArray[i][j] = tempVal == null ? 0 : tempVal;
                }
            }

            let solutions = this.calculateSolutionsWithKrammer(
                trimmedArray,
                trimmedKVector
            );
            this.$bus.$emit("solutionsFound", solutions);
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
