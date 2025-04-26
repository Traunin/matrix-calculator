<template>
  <nav
    :class="{ menuShown: menuShown }"
    @mouseleave="menuShown = false"
    @click="toggleMenu"
    @mouseenter="handleHover"
  >
    <navbar-element
      v-for="route in routes"
      :key="route.path"
      :route="route"
    />
  </nav>
</template>

<script setup lang="ts">
import NavbarElement from "@/components/navbar-element.vue";
import { routes } from "@/router.ts"
import { ref } from "vue"

const menuShown = ref(false)

function toggleMenu() {
  menuShown.value = !menuShown.value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleHover(e: any)  {
  if (!e.sourceCapabilities?.firesTouchEvents) {
    menuShown.value = true;
  }
}
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  justify-content: flex-end;
  top: 0;
  left: 0;
}
</style>
