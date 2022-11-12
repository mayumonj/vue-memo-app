import { render, fireEvent } from "@testing-library/vue";
import { describe, it, expect, beforeEach } from "vitest";
import AppContents from "../components/AppContents.vue";

describe("App Components", function () {
  beforeEach(async () => {
    setSampleData();
  });

  it("displays the list of memo titles", async () => {
    setSampleData();

    const { getByRole, queryAllByRole, queryAllByText } = render(AppContents);
    expect(getByRole("heading", { level: 2, name: "Memos" })).toBeTruthy();
    expect(queryAllByRole("listitem").length).toBe(3);
    expect(queryAllByText("title1").length).toBe(1);
    expect(queryAllByText("body1").length).toBe(0);
  });

  it("displays a new memo on the memo list when the add button is clicked.", async () => {
    localStorage.clear();
    const { getByRole, queryAllByRole, queryAllByText } = render(AppContents);
    expect(queryAllByRole("listitem").length).toBe(3);
    const addButton = getByRole("button", { name: "Add a new memo" });
    await fireEvent.click(addButton);
    expect(queryAllByRole("listitem").length).toBe(4);
    expect(queryAllByText("New Memo").length).toBe(1);
  });

  it("displays the memo detail when a memo is selected from the list.", async () => {
    const { getByText, queryAllByRole, getByDisplayValue } =
      render(AppContents);
    expect(
      queryAllByRole("heading", { level: 2, name: "Memo Detail" }).length
    ).toBe(0);
    await fireEvent.click(getByText("title2"));
    expect(
      queryAllByRole("heading", { level: 2, name: "Memo Detail" }).length
    ).toBe(1);
    expect(getByDisplayValue("title2")).toBeTruthy();
    expect(getByDisplayValue("body2")).toBeTruthy();
  });

  it("updates the memo and hide the detail area when the selected memo is edited and 'Save' button is clicked.", async () => {
    const { getByRole, queryAllByRole, queryAllByText, getByText } =
      render(AppContents);
    await fireEvent.click(getByText("title2"));
    const titleInput = getByRole("textbox", { name: "Title" });
    const bodyInput = getByRole("textbox", { name: "Body" });
    await fireEvent.update(titleInput, "title2-edited");
    await fireEvent.update(bodyInput, "body2-edited");
    await fireEvent.click(getByRole("button", { name: "Save" }));
    expect(queryAllByRole("listitem").length).toBe(3);
    expect(queryAllByText("title2-edited").length).toBe(1);
    expect(queryAllByText("title2").length).toBe(0);
    expect(
      queryAllByRole("heading", { level: 2, name: "Memo Detail" }).length
    ).toBe(0);
  });

  it("removes the selected memo from the list and hide the detail area when 'Delete this item' button is clicked.", async () => {
    const { getByRole, queryAllByRole, queryAllByText, getByText } =
      render(AppContents);
    await fireEvent.click(getByText("title2"));
    await fireEvent.click(getByRole("button", { name: "Delete this item" }));
    expect(queryAllByRole("listitem").length).toBe(2);
    expect(queryAllByText("title2").length).toBe(0);
    expect(
      queryAllByRole("heading", { level: 2, name: "Memo Detail" }).length
    ).toBe(0);
  });
});

function setSampleData() {
  const DATA = [
    { id: 1, title: "title1", body: "body1" },
    { id: 2, title: "title2", body: "body2" },
    { id: 3, title: "title3", body: "body3" },
  ];
  localStorage.memos = JSON.stringify(DATA);
}
