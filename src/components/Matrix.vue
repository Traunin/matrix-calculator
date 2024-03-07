<template>
    <div class="matrix">
        <div
            class="row-controller"
            v-if="!isSquare"
        >
            <button @click.prevent="removeRow">-</button>
            <div class="row-count">
                {{ rowCount }}
            </div>
            <button @click.prevent="addRow">+</button>
        </div>

        <div class="col-controller">
            <button @click.prevent="removeCol">-</button>
            <div class="col-count">
                {{ colCount }}
            </div>
            <button @click.prevent="addCol">+</button>
        </div>

        <table>
            <tr>
                <th v-for="colIndex in colCount">
                    {{ colIndex }}
                </th>

                <th v-if="isAugmented">Доп.</th>
            </tr>
            <tr v-for="rowIndex in rowCount">
                <matrix-cell
                    v-for="colIndex in colCount"
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

        <div
            class="compatible"
            v-if="hasCompatible"
        >
            <table>
                <tr>
                    <th v-for="colIndex in rowCount">{{ colIndex }}</th>
                </tr>
                <tr v-for="rowIndex in colCount">
                    <matrix-cell
                        v-for="colIndex in rowCount"
                        :col-index="colIndex"
                        :row-index="rowIndex"
                        :cell-id="`cell-${id}-compatible-${colIndex}-${rowIndex}`"
                    ></matrix-cell>
                </tr>
            </table>
        </div>
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

    mixins: [uidGenerator],

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
            id: this.uidGet(),
            values: [],
            kVector: [],
        };
    },

    mounted() {
        while (this.values.length < this.rowCount) {
            this.values.push([]);
        }
    },

    computed: {
        colCountAdjustedForSquareness() {
            return this.isSquare ? this.colCount : this.colCount;
        },

        colCountAdjustedForSquareness() {
            return this.isSquare ? this.colCount : this.rowCount;
        },
    },

    methods: {
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
                    trimmedArray[i][j] = values[i][j];
                }
            }
            this.calculateDetetrminantRecursively(trimmedArray);
        },
    },
};
</script>

<style scoped>
.matrix {
    margin-top: 30px;
    margin-left: 30px;
    position: relative;
    font-family: "Roboto", sans-serif;
}

.col-controller {
    display: flex;
    align-items: center;
    position: absolute;
    top: -30px;
}

.col-controller .col-count {
    margin: 0 5px;
}

.is-augmented-checkbox {
    position: absolute;
    top: -30px;
    font-size: 14px;
    left: 100px;
    display: flex;
    align-items: center;
}

.is-augmented-checkbox input {
    width: 25px;
    height: 25px;
    margin: 0;
    margin-right: 5px;
}

.is-augmented-checkbox label {
    width: 25px;
    font-size: 12.5px;
}

button {
    font-size: 15px;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: none;
    background-color: #2f27ce;
    color: #fff;
    text-align: center;
    cursor: pointer;
}

button:hover {
    border: 2px solid #dedcff;
}

.row-controller {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25px;
    position: absolute;
    top: 0px;
    left: -30px;
}

table {
    border: 1px solid #000;
}

th {
    height: 25px;
    line-height: 25px;
}
</style>
