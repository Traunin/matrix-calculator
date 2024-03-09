<template>
    <div class="calculator">
        <div class="determinant">
            <button @click="$bus.$emit('determinantNeeded')">
                Найти корни системы уравнений
            </button>
            <div class="result">Определитель: {{ determinant }}</div>
        </div>

        <matrix
            :cols="5"
            :rows="3"
            :is-square="true"
            :is-augmented="true"
        ></matrix>
    </div>
</template>

<script>
import Matrix from "./Matrix.vue";

export default {
    components: {
        Matrix,
    },

    mounted() {
        this.$bus.$on("determinantCalculated", (determinant) =>
            this.outputDetetrminant(determinant)
        );
    },

    data() {
        return {
            determinant: 0,
        };
    },

    methods: {
        outputDetetrminant(determinant) {
            this.determinant = determinant;
        },
    },
};
</script>

<style scoped>
button {
    margin: 10px 30px;
    padding: 5px;
    font-size: 1em;
    display: inline-block;
    background-color: #4bbf44;
    color: black;
    border-radius: 5px;
    border: 3px solid #4bbf44;
    transition: all 0.1s;
    cursor: pointer;
}

button:hover {
    border-color: #94dada;
}

.result {
    display: inline-block;
    font-size: 1em;
    font-family: "Roboto", sans-serif;
}

.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
