<template>
    <h1>Рассчет определителя</h1>
    <matrix
        :cols="3"
        :rows="3"
        :is-square="true"
    ></matrix>
</template>

<script>
import Matrix from "./Matrix.vue";

export default {
    components: {
        Matrix,
    },
};
</script>
