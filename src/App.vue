<template>
    <div class="container">
        <header>
            <div class="logo">Калькулятор матриц</div>
            <navbar> </navbar>
        </header>

        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
};
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.logo {
    font-family: 'Roboto', sans-serif;
}
</style>
