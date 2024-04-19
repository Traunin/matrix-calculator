<template>
    <td>
        <input
            type="text"
            ref="input"
            inputmode="numeric"
            autocomplete="off"
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
            this.displayedValue = parseFloat(this.displayedValue)
                ? parseFloat(this.displayedValue)
                : 0; // puts a zero when the cell is empty
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
td {
    width: 35px;
    border: 2px solid var(--text-color);
}

@media screen and (min-width: 1000px) {
    input {
        width: 60px !important;
        font-size: 1em !important;
    }

    td {
        width: 60px !important;
    }
}

input {
    width: 35px;
    font-size: 0.8em;
    height: 27px;
    outline: none;
    text-align: center;
    font-family: "Roboto Mono", monospace;
    border: none;
    padding: 0;
    color: var(--text-color);
    background: var(--input-background);
}
</style>
