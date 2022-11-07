<script setup>
import { ref, computed } from "vue";
import MemoList from "./MemoList.vue";
import MemoDetail from "./MemoDetail.vue";

const memos = ref([]);

if (localStorage.memos) {
  memos.value = JSON.parse(localStorage.memos);
}

const maxId = computed(() => {
  return memos.value.reduce((max, memo) => {
    return memo.id > max ? memo.id : max;
  }, 0);
});

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
  saveData();
  choice.value = {};
}

function deleteMemo(id) {
  memos.value = memos.value.filter((memo) => {
    return memo.id !== id;
  });
  saveData();
  choice.value = {};
}

function addMemo() {
  const newMemo = {
    id: maxId.value + 1,
    title: "New Memo",
    body: "",
  };
  memos.value.push(newMemo);
  choice.value = { id: newMemo.id, title: newMemo.title, body: newMemo.body };
}

function setSampleData() {
  localStorage.clear();
  memos.value = [
    { id: 1, title: "memo1", body: "memo1 body" },
    { id: 2, title: "memo2", body: "memo2 body" },
    { id: 3, title: "memo3", body: "memo3 body" },
  ];
  choice.value = {};
}

function saveData() {
  localStorage.memos = JSON.stringify(memos.value);
}

function clearData() {
  localStorage.clear();
  memos.value = [];
}
</script>

<template>
  <MemoList :memos="memos" @choose="(memo) => chooseTheMemo(memo)" /><br />
  <button @click="addMemo">Add</button>
  <div v-show="choice.id">
    <MemoDetail
      v-model:title="choice.title"
      v-model:body="choice.body"
      :id="choice.id"
      @save="updateMemo()"
      @delete="(id) => deleteMemo(id)"
    />
  </div>
  <div>
    <p>memoData choice: {{ choice }}</p>
    <p>maxId {{ maxId }}</p>
    <p>v-show {{ !!choice.id }}</p>
    <button @click="setSampleData">Set Sample Data</button><br />
    <button @click="clearData">Clear All Data</button>
  </div>
</template>

<style scoped>
div {
  padding-left: 10px;
}
@media (min-width: 1024px) {
}
</style>
