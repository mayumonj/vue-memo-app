export class Memo {
  static maxId = localStorage.maxId || 1;

  constructor({ id, title, body }) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  static all() {
    if (localStorage.memos) {
      return JSON.parse(localStorage.memos);
    } else {
      return [];
    }
  }

  static create(title, body) {
    const memos = this.all();
    const newMemo = new this({ id: this.maxId++, title: title, body: body });
    memos.push(newMemo);
    const updatedMemos = this.#save(memos);
    localStorage.maxId = this.maxId;
    return [newMemo, updatedMemos];
  }

  static find(id) {
    const memos = this.all();
    return new this(memos.find((memo) => memo.id === id));
  }

  update(title, body) {
    const memos = Memo.all();
    const targetIndex = memos.findIndex((memo) => memo.id === this.id);
    memos[targetIndex].title = title;
    memos[targetIndex].body = body;
    return Memo.#save(memos);
  }

  delete() {
    const memos = Memo.all();
    const updatedMemos = memos.filter((memo) => memo.id !== this.id);
    return Memo.#save(updatedMemos);
  }

  static #save(memos) {
    localStorage.memos = JSON.stringify(memos);
    return memos;
  }
}
