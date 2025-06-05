<template>
  <header>
    <div class="logo">
      Matrix calculator
    </div>

    <div class="navbar">
      <NavbarDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
import NavbarDropdown from '@/components/navbar-dropdown.vue'
</script>

<style>
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
  margin: 10px 0;
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
