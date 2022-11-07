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
  <div class="list">
    <MemoList :memos="memos" @choose="(memo) => chooseTheMemo(memo)" />
    <button class="add-button" @click="addMemo">Add</button>
    <div class="dev">
      <h3>for dev</h3>
      <p>memoData choice: {{ choice }}</p>
      <p>maxId {{ maxId }}</p>
      <p>v-show {{ !!choice.id }}</p>
      <button @click="setSampleData">Set Sample Data</button><br />
      <button @click="clearData">Clear All Data</button>
    </div>
  </div>
  <div v-show="choice.id">
    <div class="detail">
      <MemoDetail
        v-model:title="choice.title"
        v-model:body="choice.body"
        :id="choice.id"
        @save="updateMemo()"
        @delete="(id) => deleteMemo(id)"
      />
    </div>
  </div>
</template>

<style scoped>
.list {
  margin: 10px;
}
.add-button {
  margin-top: 20px;
}
.detail {
  margin: 30px 10px;
}
.dev {
  padding: 10px;
}
@media (min-width: 480px) {
  .list {
    width: 30%;
    float: left;
    margin: 10px;
  }
  .detail {
    width: 50%;
    float: right;
    margin: 10px;
  }
}
</style>
