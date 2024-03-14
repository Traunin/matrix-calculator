<template>
    <td>
        <input
            type="number"
            ref="input"
            :value="value"
            :id="`cell-${matrixId}-${colIndex}-${rowIndex}`"
            @click="selectAllText"
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

    methods: {
        selectAllText() {
            this.$refs.input.select();
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
