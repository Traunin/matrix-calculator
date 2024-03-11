<template>
    <div class="calculator">
        <div class="multiply">
            <button @click="$bus.$emit('multiplicationNeeded')">
                Умножить матрицы
            </button>
        </div>
        <div class="horizontalMatrices">
            <matrix
                :cols="2"
                :rows="4"
                :uid="matrix1Uid"
                :linked-row-uid="matrix2Uid"
            ></matrix>

            <div class="verticalMatrices">
                <matrix
                    :cols="3"
                    :rows="2"
                    :uid="matrix2Uid"
                    :linked-col-uid="matrix1Uid"
                ></matrix>

                <matrix
                    :cols="3"
                    :rows="4"
                    :uid="matrix3Uid"
                    :linked-row-uid="matrix1Uid"
                    :linked-col-uid="matrix2Uid"
                    :user-resizable="false"
                ></matrix>
            </div>
        </div>
    </div>
</template>

<script>
import Matrix from "./Matrix.vue";
import uidGenerator from "./uidGenerator";

export default {
    components: {
        Matrix,
    },

    mixins: [uidGenerator],

    data() {
        return {
            matrix1Uid: this.uidGet(),
            matrix2Uid: this.uidGet(),
            matrix3Uid: this.uidGet()
        }
    }
};
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.verticalMatrices {
    display: flex;
    flex-direction: column;
}

.horizontalMatrices {
    display: flex;
    align-items: flex-end;
}

button {
    margin: 10px 20px;
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
</style>

<style>
    .matrix {
        margin: 10px;   
    }
</style>