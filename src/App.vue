<script setup>
import AppContents from "./components/AppContents.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <header>
    <AppHeader title="My Memo App" />
  </header>

  <main>
    <AppContents />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
