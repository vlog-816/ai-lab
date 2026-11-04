import { expect, test } from '@playwright/test';

const appUrl = 'https://vlog-ai-powered-assistant.vercel.app';

test.beforeEach(async ({ page }) => {
  await page.goto(`${appUrl}/login`);
});

test('AUTH-01: Validate empty login submission', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(`${appUrl}/login`);
  await expect(page.getByText('Missing username or password', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toHaveCount(0);
});

test('AUTH-02: Navigate from login to account creation', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign up' }).click();

  await expect(page).toHaveURL(`${appUrl}/register`);
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
});

test('AUTH-03: Validate empty account-creation submission', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL(`${appUrl}/register`);
  await expect(page.getByText('Email and password are required', { exact: true })).toBeVisible();
});

test('AUTH-04: Create an account with populated fields', async ({ page }) => {
  const uniqueId = `${Date.now()}-${test.info().workerIndex}`;
  const email = `playwright-${uniqueId}@example.com`;

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill(`Playwright Test ${uniqueId}`);
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(`Test-${uniqueId}-Pass!`);
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL(`${appUrl}/`);
  await expect(page.getByText(email, { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Generate Test Cases' })).toBeVisible();
});
