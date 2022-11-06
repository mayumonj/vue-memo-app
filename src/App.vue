<script setup>
import MemosData from "./components/MemosData.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <header>
    <AppHeader title="My Memo App" />
  </header>

  <main>
    <MemosData />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
