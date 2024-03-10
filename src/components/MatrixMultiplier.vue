<template>
    <div class="calculator">
        <matrix
            :cols="4"
            :rows="3"
            :has-compatible="true"
        ></matrix>

        <matrix
            :cols="4"
            :rows="3"
            :has-compatible="true"
        ></matrix>
    </div>
</template>

<script>
import Matrix from "./Matrix.vue";

export default {
    components: {
        Matrix,
    },
};
</script>

<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
