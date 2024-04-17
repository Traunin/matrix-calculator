<template>
    <div class="theme-switch">
        <input
            type="checkbox"
            id="theme-icon"
            v-model="isDark"
            @change="setTheme"
        /><label
            for="theme-icon"
            class="theme-icon"
        ></label>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["themeSwitch"]);

let theme = ref("light");
const isDark = defineModel("isDark");

onMounted(() => {
    theme.value = document.cookie
        .split("; ")
        .find((row) => row.startsWith("theme="))
        ?.split("=")[1];

    if (theme.value == null) {
        theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    isDark.value = theme.value == "dark";
    setTheme();
});

function setTheme() {
    theme.value = isDark.value ? "dark" : "light";
    document.cookie = `theme=${theme.value}`;

    emit("themeSwitch", theme.value);
}
</script>

<style scoped>
label.theme-icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: center url("@/assets/icons/sun.svg") white no-repeat;
    background-size: 20px 20px;
    border-radius: 50%;
    cursor: pointer;
    margin: 0;
}

.theme-switch input:checked + label {
    background: center url("@/assets/icons/moon.svg") black no-repeat;
    background-size: 20px 20px;
}

.theme-switch input {
    display: none;
}

.theme-switch {
    margin: 0 10px;
    padding: 0 10px;
    align-self: stretch;
    border-left: var(--accent-color) 3px solid;
    border-right: var(--accent-color) 3px solid;
    display: flex;
    align-items: center;
}

@media screen and (min-width: 1000px) {
    .theme-switch {
        margin: 0 70px 0 10px;
    }
}
</style>
