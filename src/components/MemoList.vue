<script setup>
const props = defineProps({
  memos: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["choose"]);

function chooseTheMemo(memo) {
  const choice = { id: memo.id, title: memo.title, body: memo.body };
  emit("choose", choice);
}
</script>

<template>
  <h2>Memos</h2>
  <ul v-for="memo in props.memos" :key="memo.id">
    <li @click="chooseTheMemo(memo)">{{ memo.title }}</li>
  </ul>
</template>

<style scoped>
h2 {
  padding: 10px;
}

@media (min-width: 1024px) {
}
</style>
