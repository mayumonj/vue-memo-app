<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  padding: 10px;
}
div {
  background-color: darkcyan;
}

@media (min-width: 1024px) {
}
</style>
