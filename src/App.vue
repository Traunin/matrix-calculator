<template>
    <div
        class="container"
        :class="theme"
    >
        <header>
            <div class="logo">Калькулятор матриц</div>

            <div class="navbar">
                <navbar> </navbar>
            </div>

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
import { ref } from "vue";

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
    --primary-color: #4bbf44;
    --secondary-color: #94dada;
    --accent-color: #69b5cb;
    --text-color: #081708;
    --background-color: #f5fcf6;
    --input-background: #ffffff;
    color: var(--text-color);
    background-color: var(--background-color);
}

.matrix-ui {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    overflow: auto;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 50px;
}

.dark {
    --text-color: #f5fcf6;
    --background-color: rgb(41, 41, 41);
    --input-background: #000;
    --secondary-color: #69b5cb;
    --accent-color: #94dada;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-color);
    color: var(--text-color);
    border-bottom: 3px solid var(--text-color);
    flex-wrap: wrap;
}

.logo {
    font-family: "Roboto", sans-serif;
    color: var(--text-color);
    background-color: var(--background-color);
    font-size: 1.1em;
    text-align: center;
    flex-grow: 2;
    margin: 10px 0 10px 67.4px;
}

.navbar {
    position: relative;
    flex-grow: 1;
    align-self: flex-start;
    width: 505px;
    width: 100vw;
    order: 100;
}

@media screen and (min-width: 1000px) {
    header .navbar {
        order: 0;
        width: auto;
    }

    .logo {
        flex-grow: 0;
        font-size: 1.3em;
        margin: 10px 50px;
    }

    .matrix-ui {
        padding-top: 10px;
    }
}
</style>
