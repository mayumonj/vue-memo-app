<script setup>
import { ref } from "vue";
import MemoList from "./MemoList.vue";
import MemoDetail from "./MemoDetail.vue";
import { MemoData } from "../lib/memo-data";

const memos = ref(MemoData.getAllMemos());
const choice = ref({});

function chooseTheMemo(memo) {
  choice.value = memo;
}

function updateMemo() {
  memos.value = MemoData.update(choice.value);
  choice.value = {};
}

function deleteMemo(id) {
  memos.value = MemoData.delete(id);
  choice.value = {};
}

function addMemo() {
  [choice.value, memos.value] = MemoData.create("New Memo", "");
}

function setSampleData() {
  localStorage.clear();
  MemoData.create("Memo 1", "Memo 1 body");
  MemoData.create("Memo 2", "Memo 2 body");
  MemoData.create("Memo 3", "Memo 3 body");
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
