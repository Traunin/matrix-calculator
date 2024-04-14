<template>
    <div
        class="container"
        :class="theme"
    >
        <header>
            <div class="logo">Калькулятор матриц</div>
            <navbar> </navbar>
            <theme-switcher @theme-switch="setTheme"> </theme-switcher>
        </header>
        <div class="matrix-ui">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { ref, computed } from "vue";

let theme = ref("light");

function setTheme(themeToSet) {
    theme.value = themeToSet;
}
</script>

<style scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    --primary-color: #4BBF44;
    --secondary-color: #94DADA;
    --accent-color: #69B5CB;
    --text-color: #081708;
    --background-color: #F5FCF6;
    --input-background: #FFFFFF;
    color: var(--text-color);
    background-color: var(--background-color);
}

.matrix-ui {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-grow: 1;
}

.dark {
    --text-color: #F5FCF6;
    --background-color: rgb(41, 41, 41);
    --input-background: #000;
    --shadow-color: var(rgba(255,255,255,0.2))
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-color);
    color: var(--text-color);
    border-bottom: 3px solid var(--text-color)
}

.logo {
    font-family: "Roboto", sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    font-size: 1.3em;
    margin: 0 20px;
    text-align: center;
}
</style>
