<template>
    <td>
        <input 
            type="number" 
            ref = "input"
            @click = "selectAllText"
            value = "0"
            :id = "cellId"
        >
    </td>
</template>

<script>
    export default {
        props:  ['rowIndex', 'colIndex', 'cellId'],
        
        methods: {
            selectAllText() {
                this.$refs.input.select();
            }
        }
    }
</script>

<style scoped>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
        appearance: none;
    }

    td {
        border: 1px solid #000;
    }

    input {
        width: 45px;
        height: 27px;
        outline: none;
        text-align: center;
        font-family: 'Robot', sans-serif;
        font-size: 1.05em;
        border: none;
        padding: 0
    }
</style>