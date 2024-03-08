<template>
    <matrix
        :cols="4"
        :rows="3"
        :has-compatible="true"
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
