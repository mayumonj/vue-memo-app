<script setup>
defineProps({
  memos: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <h2>Memos</h2>
  <ul v-for="memo in memos" :key="memo.id">
    <li>{{ memo.title }}</li>
  </ul>
</template>

<style scoped>
h2 {
  padding: 10px;
}

@media (min-width: 1024px) {
}
</style>
