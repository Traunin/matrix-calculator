<script setup lang="ts">
import { type RouteRecordRaw } from "vue-router";
defineProps<{
  route: RouteRecordRaw
}>()
</script>

<template>
  <router-link
    :key="route.path"
    :to="route.path"
    class="link"
    active-class="active"
  >
    {{ route.name }}
    <span class="dropdown-icon">
      ▼
    </span>
  </router-link>
</template>

<style scoped>
.link {
  display: none;
  color: var(--text-color);
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  background: var(--secondary-color);
  padding: 10px 10px;
  font-size: 1.1em;
  width: 100vw;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
}

.menuShown .link {
  display: inline-block;
}

nav .active {
  display: inline-block !important;
  order: -1;
  border-bottom: 3px solid var(--text-color);
}

.dropdown-icon {
  display: none;
}

.active .dropdown-icon {
  display: inline-block;
  margin-left: 10px;
}

.link:hover {
  color: red;
}

@media screen and (min-width: 1000px) {
  .link {
    width: auto;
    font-size: 1.3em;
    text-align: left;
    padding: 10px 20px;
  }
}
</style>