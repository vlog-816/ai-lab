import { expect, test, type Page } from "@playwright/test";

const appUrl = "https://todomvc.com/examples/react/dist/";

function todoItem(page: Page, title: string) {
  return page.getByRole("main").getByRole("listitem").filter({ hasText: title });
}

async function addTodo(page: Page, title: string) {
  const input = page.getByRole("textbox", { name: "New Todo Input" });
  await input.fill(title);
  await input.press("Enter");
  await expect(todoItem(page, title)).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
});

test("TC-01: Add a todo", async ({ page }) => {
  const title = "Manual QA - add";

  await addTodo(page, title);

  await expect(page.getByRole("textbox", { name: "New Todo Input" })).toBeEmpty();
  await expect(todoItem(page, title)).toBeVisible();
  await expect(todoItem(page, title).getByRole("checkbox")).not.toBeChecked();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-02: Submit an empty todo", async ({ page }) => {
  const input = page.getByRole("textbox", { name: "New Todo Input" });
  const existingTitle = "TC-02 existing todo";

  await addTodo(page, existingTitle);
  const rows = page.getByRole("main").getByRole("listitem");
  await input.press("Enter");

  await expect(input).toBeEmpty();
  await expect(rows).toHaveCount(1);
  await expect(todoItem(page, existingTitle)).toBeVisible();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-03: Edit a todo", async ({ page }) => {
  const originalTitle = "Manual QA - edit original";
  const editedTitle = "Manual QA - edited";

  await addTodo(page, originalTitle);
  await page.getByText(originalTitle, { exact: true }).dblclick();

  const editInput = page.getByRole("textbox", { name: "Edit todo" });
  await editInput.fill(editedTitle);
  await editInput.press("Enter");

  await expect(todoItem(page, editedTitle)).toBeVisible();
  await expect(todoItem(page, editedTitle).getByRole("checkbox")).not.toBeChecked();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-04: Complete and reactivate a todo", async ({ page }) => {
  const title = "Manual QA - toggle one";

  await addTodo(page, title);
  const checkbox = todoItem(page, title).getByRole("checkbox");

  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await expect(page.getByText("0 items left!", { exact: true })).toBeVisible();

  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-05: Filter active todos", async ({ page }) => {
  const activeTitle = "Manual QA - filter active";
  const completedTitle = "Manual QA - filter completed";

  await addTodo(page, activeTitle);
  await addTodo(page, completedTitle);
  await todoItem(page, completedTitle).getByRole("checkbox").check();

  await page.getByRole("link", { name: "Active", exact: true }).click();

  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByText(activeTitle, { exact: true })).toBeVisible();
  await expect(page.getByText(completedTitle, { exact: true })).toBeHidden();
  await expect(todoItem(page, activeTitle).getByRole("checkbox")).not.toBeChecked();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-06: Filter completed todos", async ({ page }) => {
  const activeTitle = "Manual QA - filter active";
  const completedTitle = "Manual QA - filter completed";

  await addTodo(page, activeTitle);
  await addTodo(page, completedTitle);
  await todoItem(page, completedTitle).getByRole("checkbox").check();

  await page.getByRole("link", { name: "Completed", exact: true }).click();

  await expect(page).toHaveURL(/#\/completed$/);
  await expect(page.getByText(completedTitle, { exact: true })).toBeVisible();
  await expect(page.getByText(activeTitle, { exact: true })).toBeHidden();
  await expect(todoItem(page, completedTitle).getByRole("checkbox")).toBeChecked();
});

test("TC-07: Show all todos", async ({ page }) => {
  const activeTitle = "Manual QA - show all active";
  const completedTitle = "Manual QA - show all completed";

  await addTodo(page, activeTitle);
  await addTodo(page, completedTitle);
  await todoItem(page, completedTitle).getByRole("checkbox").check();
  await page.getByRole("link", { name: "All", exact: true }).click();

  await expect(page).toHaveURL(/#\/$/);
  await expect(page.getByText(activeTitle, { exact: true })).toBeVisible();
  await expect(page.getByText(completedTitle, { exact: true })).toBeVisible();
  await expect(todoItem(page, activeTitle).getByRole("checkbox")).not.toBeChecked();
  await expect(todoItem(page, completedTitle).getByRole("checkbox")).toBeChecked();
  await expect(page.getByText("1 item left!", { exact: true })).toBeVisible();
});

test("TC-08: Toggle all todos", async ({ page }) => {
  const firstTitle = "Manual QA - toggle all one";
  const secondTitle = "Manual QA - toggle all two";

  await addTodo(page, firstTitle);
  await addTodo(page, secondTitle);

  const toggleAll = page.getByRole("checkbox", {
    name: "❯ Toggle All Input",
  });
  const firstCheckbox = todoItem(page, firstTitle).getByRole("checkbox");
  const secondCheckbox = todoItem(page, secondTitle).getByRole("checkbox");

  await toggleAll.check();
  await expect(toggleAll).toBeChecked();
  await expect(firstCheckbox).toBeChecked();
  await expect(secondCheckbox).toBeChecked();
  await expect(page.getByText("0 items left!", { exact: true })).toBeVisible();

  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();
  await expect(firstCheckbox).not.toBeChecked();
  await expect(secondCheckbox).not.toBeChecked();
  await expect(page.getByText("2 items left!", { exact: true })).toBeVisible();
});

test("TC-09: Delete one test todo", async ({ page }) => {
  const firstTitle = "TC-09 todo to keep 1";
  const secondTitle = "TC-09 todo to keep 2";
  const deleteTitle = "Manual QA - delete test";

  await addTodo(page, firstTitle);
  await addTodo(page, secondTitle);
  await addTodo(page, deleteTitle);

  const deleteItem = todoItem(page, deleteTitle);
  await deleteItem.hover();
  await deleteItem.getByRole("button", { name: "Delete todo" }).click();

  await expect(deleteItem).toHaveCount(0);
  await expect(todoItem(page, firstTitle)).toBeVisible();
  await expect(todoItem(page, secondTitle)).toBeVisible();
  await expect(page.getByText("2 items left!", { exact: true })).toBeVisible();
});
