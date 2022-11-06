<script setup>
import { ref } from "vue";
import MemoList from "./MemoList.vue";
import MemoDetail from "./MemoDetail.vue";

let id = 0;

const memos = ref([
  { id: id++, title: "memo1", body: "memo1 body" },
  { id: id++, title: "memo2", body: "memo2 body" },
  { id: id++, title: "memo3", body: "memo3 body" },
]);
const choice = ref(memos.value[0]);

let editingId = ref(choice.value.id);
let editingTitle = ref(choice.value.title);
let editingBody = ref(choice.value.body);

function updateMemo() {
  memos.value = memos.value.map((memo) => {
    if (memo.id === editingId.value) {
      return {
        id: editingId.value,
        title: editingTitle.value,
        body: editingBody.value,
      };
    } else {
      return memo;
    }
  });
  choice.value = {};
}

function deleteMemo(id) {
  memos.value = memos.value.filter((memo) => {
    return memo.id !== id;
  });
  choice.value = memos.value[0];
}

function addMemo() {
  const newMemo = {
    id: id++,
    title: "New Memo",
    body: "",
  };
  memos.value.push(newMemo);
  choice.value = newMemo;
}

function setSampleData() {
  id = 0;
  memos.value = [
    { id: id++, title: "memo1", body: "memo1 body" },
    { id: id++, title: "memo2", body: "memo2 body" },
    { id: id++, title: "memo3", body: "memo3 body" },
  ];
  choice.value = memos.value[0];
}
</script>

<template>
  <MemoList :memos="memos" /><br />
  <button @click="addMemo">Add</button>
  <MemoDetail
    v-model:title="editingTitle"
    v-model:body="editingBody"
    :id="editingId"
    @save="updateMemo()"
    @delete="(id) => deleteMemo(id)"
  />
  <div>
    <p>memoData choice: {{ choice }}</p>
    <button @click="setSampleData">Set Sample Data</button>
  </div>
</template>

<style scoped>
div {
  padding-left: 10px;
}
@media (min-width: 1024px) {
}
</style>
