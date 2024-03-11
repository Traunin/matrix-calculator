<template>
    <td width="55">
        <input
            type="number"
            ref="input"
            @click="selectAllText"
            :value="value"
            :id="`cell-${matrixId}-${colIndex}-${rowIndex}`"
            @input="$emit('update:modelValue', $event.target.value)"
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
        initValue: {
            default: 0,
        },
    },

    data() {
        return {
            value: this.initValue,
        };
    },

    emits: ["update:modelValue"],

    created() {
        this.$bus.$on("writeValues" + this.matrixId, (product) => {
            if (this.rowIndex - 1 < product.length && this.colIndex - 1 < product[0].length) {
                this.value = product[this.rowIndex-1][this.colIndex-1];
            }
        });
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
