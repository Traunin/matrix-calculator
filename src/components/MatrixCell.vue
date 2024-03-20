<template>
    <td>
        <input
            type="number"
            ref="input"
            v-model="displayedValue"
            :id="`cell-${matrixId}-${colIndex}-${rowIndex}`"
            @click="selectAllText"
            @blur="unsetNaN"
        />
    </td>
</template>

<script>
export default {
    props: {
        rowIndex: {
            type: Number,
        },

        colIndex: {
            type: Number,
        },

        matrixId: {
            type: Number,
        },

        value: {
            default: 0,
        },
    },

    data() {
        return {
            displayedValue: this.value,
        };
    },

    methods: {
        selectAllText() {
            this.$refs.input.select();
        },

        unsetNaN() {
            this.displayedValue = this.value; // puts a zero when the cell is empty
        },
    },

    watch: {
        value() {
            this.displayedValue = this.value; //updates value in cell when matrix is externally updated
        },
    },
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
}

td {
    border: 1px solid #000;
}

input {
    width: 55px;
    height: 27px;
    outline: none;
    text-align: center;
    font-family: "Robot", sans-serif;
    font-size: 1.05em;
    border: none;
    padding: 0;
}
</style>
