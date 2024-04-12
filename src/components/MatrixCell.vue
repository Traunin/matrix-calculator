<template>
    <td>
        <input
            type="text"
            ref="input"
            inputmode="numeric"
            v-model="displayedValue"
            :id="`cell-${matrixId}-${colIndex}-${rowIndex}`"
            @focus="selectAllText"
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
            if (this.displayedValue !== "") {
                this.displayedValue = this.value;
            }
            //updates value in cell when matrix is externally updated
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
    border: 2px solid var(--text-color);
}

@media screen and (min-width: 1000px) {
    td input {
        width: 55px;
        font-size: 1.05em;
    }
}

input {
    width: 27px;
    font-size: 0.95em;
    height: 27px;
    outline: none;
    text-align: center;
    font-family: "Robot", sans-serif;
    border: none;
    padding: 0;
    color: var(--text-color);
    background: var(--input-background);
}
</style>
