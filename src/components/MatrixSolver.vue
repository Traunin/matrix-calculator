<template>
    <div class="calculator">
        <button @click="$bus.$emit('solutionNeeded')">
            Найти корни системы уравнений
        </button>
        <div
            class="result"
            v-if="determinant == 0"
        >
            Определитель равен нулю!
        </div>
        <div
            class="solutions"
            v-if="determinant != 0"
        >
            <div
                class="solution"
                v-for="(root, index) in solutions"
            >
                x<sub>{{ index + 1 }}</sub> = {{ root }}
            </div>
        </div>

        <matrix
            :cols="3"
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
        this.$bus.$on("solutionsFound", (solutions) => {
            console.log(solutions);
            this.solutions = solutions.solutions;
            this.determinant = solutions.determinant;
        });
    },

    data() {
        return {
            determinant: 0,
            solutions: [],
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
    color: red;
    margin-bottom: 10px;
}

.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.solutions {
    margin-bottom: 6px;
    font-size: 1em;
    font-family: "Roboto", sans-serif;
    display: flex;
    flex-direction: row;
}

.solution {
    margin: 0 5px;
}

sub {
    vertical-align: sub;
}
</style>
