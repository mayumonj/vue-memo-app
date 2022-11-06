<script setup>
const props = defineProps(["id", "title", "body"]);

const emit = defineEmits(["update:title", "update:body", "save", "delete"]);

function saveMemo() {
  emit("save");
}
function deleteMemo(id) {
  emit("delete", id);
}
</script>

<template>
  <h2>Memo Detail</h2>
  {{ props }}
  <div>
    <label for="title">Title</label><br />
    <input
      id="title"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
    /><br />
    <label for="body">Body</label><br />
    <textarea
      id="body"
      :value="body"
      @input="$emit('update:body', $event.target.value)"
    /><br />
    <button @click="saveMemo()">Save</button><br />
    <button @click="deleteMemo(id)">Delete this memo</button>
    <p>memoDetail title: {{ title }}</p>
    <p>memoDetail body: {{ body }}</p>
  </div>
</template>

<style scoped>
h2 {
  padding: 10px 10px 0 10px;
}
div {
  padding: 5px 10px;
}

@media (min-width: 1024px) {
}
</style>
