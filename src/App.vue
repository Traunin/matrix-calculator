<template>
    <h1>Для определителя - квадратная и не расширенная</h1>
    <div class="matrix1">
        <matrix
            :is-square="true"
            :cols="10"
            :rows="5"
        ></matrix>
    </div>

    <h1>Для уравнений - квадратная и расширенная</h1>
    <div class="matrix2">
        <matrix
            :is-square="true"
            :cols="5"
            :rows="5"
            :is-augmented="true"
        ></matrix>
    </div>

    <h1>Для умножения - не кваратная и имеет транспонированную</h1>
    <div class="matrix3">
        <matrix
            :cols="5"
            :rows="5"
            :has-transponded="true"
        ></matrix>
    </div>
</template>

<script>
import Matrix from "./components/Matrix.vue";

export default {
    components: {
        Matrix,
    },
};
</script>

<style scoped>
.matrix1,
.matrix2 {
    margin-left: 50px;
    margin-top: 50px;
}
</style>
