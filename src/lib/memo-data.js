export class MemoData {
  static maxID = localStorage.maxID || 1;

  constructor(id, title, body) {
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
    const newMemo = new this(this.maxID++, title, body);
    memos.push(newMemo);
    const updatedMemos = this.save(memos);
    localStorage.maxID = this.maxID;
    return [newMemo, updatedMemos];
  }

  static update({ id, title, body }) {
    const memos = this.getAllMemos();
    const updatedMemos = memos.map((memo) => {
      if (memo.id === id) {
        return { id, title, body };
      } else {
        return memo;
      }
    });
    return this.save(updatedMemos);
  }

  static delete(id) {
    const memos = this.getAllMemos();
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    return this.save(updatedMemos);
  }

  static save(memos) {
    localStorage.memos = JSON.stringify(memos);
    return memos;
  }
}
