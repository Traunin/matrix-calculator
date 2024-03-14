<template>
    <navbar> </navbar>
    <router-view></router-view>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
};
</script>
