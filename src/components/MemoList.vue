<script setup>
const props = defineProps({
  memos: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["choose"]);

function chooseTheMemo(memo) {
  emit("choose", memo);
}
</script>

<template>
  <div>
    <h2>Memos</h2>
    <ul v-for="memo in props.memos" :key="memo.id">
      <li @click="chooseTheMemo(memo)">{{ memo.title }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
