export class MemoData {
  static maxId = localStorage.maxId || 1;

  constructor({ id, title, body }) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  static getAllMemos() {
    if (localStorage.memos) {
      return JSON.parse(localStorage.memos);
    } else {
      return [];
    }
  }

  static create(title, body) {
    const memos = this.getAllMemos();
    const newMemo = new this({ id: this.maxId++, title: title, body: body });
    memos.push(newMemo);
    const updatedMemos = this.#save(memos);
    localStorage.maxId = this.maxId;
    return [newMemo, updatedMemos];
  }

  static find_by_id(id) {
    const memos = this.getAllMemos();
    return new this(memos.find((memo) => memo.id === id));
  }

  update(title, body) {
    const memos = MemoData.getAllMemos();
    const targetIndex = memos.findIndex((memo) => memo.id === this.id);
    memos[targetIndex].title = title;
    memos[targetIndex].body = body;
    return MemoData.#save(memos);
  }

  delete() {
    const memos = MemoData.getAllMemos();
    const updatedMemos = memos.filter((memo) => memo.id !== this.id);
    return MemoData.#save(updatedMemos);
  }

  static #save(memos) {
    localStorage.memos = JSON.stringify(memos);
    return memos;
  }
}
