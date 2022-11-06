<script setup>
import { ref } from "vue";

const props = defineProps({
  choice: {
    type: Object,
    required: true,
  },
});

const id = ref(props.choice.id);
const title = ref(props.choice.title);
const body = ref(props.choice.body);

const emit = defineEmits(["save", "delete"]);

function saveMemo(id, title, body) {
  const updatedMemo = { id: id, title: title, body: body };
  console.log(updatedMemo);
  emit("save", updatedMemo);
}
function deleteMemo(id) {
  console.log(id);
  emit("delete", id);
}
</script>

<template>
  <h2>Memo Detail</h2>
  {{ props }}
  <div>
    <label for="title">Title</label><br />
    <input id="title" v-model="title" /><br />
    <label for="body">Body</label><br />
    <textarea id="body" v-model="body" /><br />
    <button @click="saveMemo(id, title, body)">Save</button><br />
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
