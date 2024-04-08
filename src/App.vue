<template>
    <div class="container" :class = "theme">
        <header>
            <div class="logo">Калькулятор матриц</div>
            <navbar> </navbar>
            <theme-switcher @theme-switch="setTheme"> </theme-switcher>
        </header>

        <router-view></router-view>
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { ref, computed } from "vue";

let theme = ref("light");

function setTheme(themeToSet) {
    theme.value = themeToSet;
    console.log(theme.value)
}

// export default {
//     components: {
//         Navbar,
//         ThemeSwitcher
//     },
// };
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
    font-family: "Roboto", sans-serif;
}
</style>
