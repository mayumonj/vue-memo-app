<script setup>
import { ref } from "vue";
import MemoList from "./MemoList.vue";
import MemoDetail from "./MemoDetail.vue";
import { Memo } from "../lib/memo";

const memos = ref(Memo.getAllMemos());
const choice = ref({});

function chooseTheMemo(memo) {
  choice.value = memo;
}

function updateMemo() {
  const targetMemo = Memo.find_by_id(choice.value.id);
  memos.value = targetMemo.update(choice.value.title, choice.value.body);
  choice.value = {};
}

function deleteMemo(id) {
  const targetMemo = Memo.find_by_id(id);
  memos.value = targetMemo.delete();
  choice.value = {};
}

function addMemo() {
  [choice.value, memos.value] = Memo.create("New Memo", "");
}

function setSampleData() {
  localStorage.clear();
  Memo.create("Memo 1", "Memo 1 body");
  Memo.create("Memo 2", "Memo 2 body");
  Memo.create("Memo 3", "Memo 3 body");
  choice.value = {};
}

function clearData() {
  localStorage.clear();
  memos.value = [];
  choice.value = {};
}
</script>

<template>
  <div class="list">
    <MemoList :memos="memos" @choose="(memo) => chooseTheMemo(memo)" />
    <button class="add-button" @click="addMemo">Add a new memo</button>
    <div class="dev">
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
