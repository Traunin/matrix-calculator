<template>
    <h1>Рассчет определителя</h1>
    <matrix
        :cols="5"
        :rows="3"
        :is-square="true"
    ></matrix>

    <button
        @click = "$emit('')"
    ></button>
</template>

<script>
import Matrix from "./Matrix.vue";

export default {
    components: {
        Matrix,
    },
};
</script>
