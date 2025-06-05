<script setup lang="ts">
import { useDark } from '@vueuse/core'
import HeaderTop from '@/components/header-top.vue'
import ThemeSwitcher from '@/components/theme-switch.vue'

useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
</script>

<template>
  <HeaderTop />
  <div class="content">
    <router-view />
  </div>
  <ThemeSwitcher class="theme-switcher" />
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 50px;
  background-color: var(--background-color);
}
</style>
