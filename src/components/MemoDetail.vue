<script setup>
defineProps(["id", "title", "body"]);

const emit = defineEmits(["update:title", "update:body", "save", "delete"]);

function saveMemo() {
  emit("save");
}
function deleteMemo(id) {
  emit("delete", id);
}
</script>

<template>
  <div>
    <h2>Memo Detail</h2>
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
    <button @click="deleteMemo(id)">Delete this item</button>
  </div>
</template>

<style scoped></style>
