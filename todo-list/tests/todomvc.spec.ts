import { expect, test, type Page } from '@playwright/test';

const appUrl = 'https://todomvc.com/examples/react/dist/';

function todoItem(page: Page, title: string) {
  return page.getByRole('main').getByRole('listitem').filter({ hasText: title });
}

async function addTodo(page: Page, title: string) {
  const input = page.getByRole('textbox', { name: 'New Todo Input' });
  await input.fill(title);
  await input.press('Enter');
  await expect(todoItem(page, title)).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
});

test('T01: Add a todo and reject an empty submission', async ({ page }) => {
  await addTodo(page, 'Plan add item');

  const input = page.getByRole('textbox', { name: 'New Todo Input' });
  await expect(input).toHaveValue('');
  await input.press('Enter');

  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(1);
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});

test('T02: Edit a todo title', async ({ page }) => {
  const originalTitle = 'Plan edit original';
  const revisedTitle = 'Plan edit revised';
  await addTodo(page, originalTitle);

  const row = todoItem(page, originalTitle);
  await row.getByText(originalTitle, { exact: true }).dblclick();

  const editor = page.getByRole('textbox', { name: 'Edit todo' });
  await expect(editor).toBeVisible();
  await editor.fill(revisedTitle);
  await editor.press('Enter');

  await expect(todoItem(page, revisedTitle)).toBeVisible();
  await expect(todoItem(page, originalTitle)).toHaveCount(0);
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});

test('T03: Complete one todo and toggle all todos', async ({ page }) => {
  const titles = ['Plan alpha', 'Plan beta', 'Plan gamma'];
  for (const title of titles) {
    await addTodo(page, title);
  }

  const alpha = todoItem(page, titles[0]);
  await alpha.getByRole('checkbox').check();
  await expect(alpha.getByRole('checkbox')).toBeChecked();
  await expect(page.getByText('2 items left!', { exact: true })).toBeVisible();

  const toggleAll = page.getByRole('checkbox', { name: /Toggle All Input/ });
  await toggleAll.check();
  await expect(toggleAll).toBeChecked();
  for (const title of titles) {
    await expect(todoItem(page, title).getByRole('checkbox')).toBeChecked();
  }
  await expect(page.getByText('0 items left!', { exact: true })).toBeVisible();

  await toggleAll.uncheck();
  await expect(toggleAll).not.toBeChecked();
  for (const title of titles) {
    await expect(todoItem(page, title).getByRole('checkbox')).not.toBeChecked();
  }
  await expect(page.getByText('3 items left!', { exact: true })).toBeVisible();
});

test('T04: Filter active, completed, and all todos', async ({ page }) => {
  const titles = ['Plan filter alpha', 'Plan filter beta', 'Plan filter gamma'];
  for (const title of titles) {
    await addTodo(page, title);
  }

  await todoItem(page, titles[0]).getByRole('checkbox').check();

  await page.getByRole('link', { name: 'Active', exact: true }).click();
  await expect(page).toHaveURL(/#\/active$/);
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(2);
  await expect(todoItem(page, titles[0])).toHaveCount(0);
  await expect(todoItem(page, titles[1])).toBeVisible();
  await expect(todoItem(page, titles[2])).toBeVisible();

  await page.getByRole('link', { name: 'Completed', exact: true }).click();
  await expect(page).toHaveURL(/#\/completed$/);
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(1);
  await expect(todoItem(page, titles[0])).toBeVisible();

  await page.getByRole('link', { name: 'All', exact: true }).click();
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.getByRole('main').getByRole('listitem')).toHaveCount(3);
  await expect(todoItem(page, titles[0]).getByRole('checkbox')).toBeChecked();
  await expect(todoItem(page, titles[1]).getByRole('checkbox')).not.toBeChecked();
  await expect(todoItem(page, titles[2]).getByRole('checkbox')).not.toBeChecked();
  await expect(page.getByText('2 items left!', { exact: true })).toBeVisible();
});

test('T05: Delete one todo', async ({ page }) => {
  const keepTitle = 'Plan keep';
  const deleteTitle = 'Plan delete';
  await addTodo(page, keepTitle);
  await addTodo(page, deleteTitle);

  const rowToDelete = todoItem(page, deleteTitle);
  await rowToDelete.hover();
  const deleteButton = rowToDelete.getByRole('button', { name: 'Delete todo' });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  await expect(todoItem(page, deleteTitle)).toHaveCount(0);
  await expect(todoItem(page, keepTitle)).toBeVisible();
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});

test('T06: Clear completed todos', async ({ page }) => {
  const completedTitle = 'Plan completed';
  const activeTitle = 'Plan active';
  await addTodo(page, completedTitle);
  await addTodo(page, activeTitle);

  await todoItem(page, completedTitle).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Clear completed', exact: true }).click();

  await expect(todoItem(page, completedTitle)).toHaveCount(0);
  await expect(todoItem(page, activeTitle)).toBeVisible();
  await expect(todoItem(page, activeTitle).getByRole('checkbox')).not.toBeChecked();
  await expect(page.getByText('1 item left!', { exact: true })).toBeVisible();
});
