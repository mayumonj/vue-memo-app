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
const choice = ref({});

function chooseTheMemo(memo) {
  choice.value = memo;
}

function updateMemo() {
  memos.value = memos.value.map((memo) => {
    if (memo.id === choice.value.id) {
      return choice.value;
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
  choice.value = {};
}

function addMemo() {
  const newMemo = {
    id: id++,
    title: "New Memo",
    body: "",
  };
  memos.value.push(newMemo);
  choice.value = { id: newMemo.id, title: newMemo.title, body: newMemo.body };
}

function setSampleData() {
  id = 0;
  memos.value = [
    { id: id++, title: "memo1", body: "memo1 body" },
    { id: id++, title: "memo2", body: "memo2 body" },
    { id: id++, title: "memo3", body: "memo3 body" },
  ];
  choice.value = {};
}
</script>

<template>
  <MemoList :memos="memos" @choose="(memo) => chooseTheMemo(memo)" /><br />
  <button @click="addMemo">Add</button>
  <MemoDetail
    v-model:title="choice.title"
    v-model:body="choice.body"
    :id="choice.id"
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
