# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> AUTH-04: Create an account with populated fields
- Location: tests\auth.spec.ts:35:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://vlog-ai-powered-assistant.vercel.app/"
Received: "https://vlog-ai-powered-assistant.vercel.app/register"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://vlog-ai-powered-assistant.vercel.app/register"

```

```yaml
- heading "Create Account" [level=1]
- paragraph: Sign up to get started
- text: Full Name
- textbox "Full Name":
  - /placeholder: Your Name
  - text: Playwright Test 1793818588297-0
- text: Email
- textbox "Email":
  - /placeholder: your-email@email.com
  - text: playwright-1793818588297-0@example.com
- text: Password
- textbox "Password":
  - /placeholder: ••••••••
  - text: Test-1793818588297-0-Pass!
- button "Creating account..." [disabled]
- text: Already have an account?
- link "Sign in":
  - /url: /login
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | const appUrl = 'https://vlog-ai-powered-assistant.vercel.app';
  4  | 
  5  | test.beforeEach(async ({ page }) => {
  6  |   await page.goto(`${appUrl}/login`);
  7  | });
  8  | 
  9  | test('AUTH-01: Validate empty login submission', async ({ page }) => {
  10 |   await page.getByRole('button', { name: 'Sign in' }).click();
  11 | 
  12 |   await expect(page).toHaveURL(`${appUrl}/login`);
  13 |   await expect(page.getByText('Missing username or password', { exact: true })).toBeVisible();
  14 |   await expect(page.getByRole('button', { name: 'Logout' })).toHaveCount(0);
  15 | });
  16 | 
  17 | test('AUTH-02: Navigate from login to account creation', async ({ page }) => {
  18 |   await page.getByRole('link', { name: 'Sign up' }).click();
  19 | 
  20 |   await expect(page).toHaveURL(`${appUrl}/register`);
  21 |   await expect(page.getByRole('textbox', { name: 'Full Name' })).toBeVisible();
  22 |   await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
  23 |   await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  24 |   await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  25 | });
  26 | 
  27 | test('AUTH-03: Validate empty account-creation submission', async ({ page }) => {
  28 |   await page.getByRole('link', { name: 'Sign up' }).click();
  29 |   await page.getByRole('button', { name: 'Create Account' }).click();
  30 | 
  31 |   await expect(page).toHaveURL(`${appUrl}/register`);
  32 |   await expect(page.getByText('Email and password are required', { exact: true })).toBeVisible();
  33 | });
  34 | 
  35 | test('AUTH-04: Create an account with populated fields', async ({ page }) => {
  36 |   const uniqueId = `${Date.now()}-${test.info().workerIndex}`;
  37 |   const email = `playwright-${uniqueId}@example.com`;
  38 | 
  39 |   await page.getByRole('link', { name: 'Sign up' }).click();
  40 |   await page.getByRole('textbox', { name: 'Full Name' }).fill(`Playwright Test ${uniqueId}`);
  41 |   await page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  42 |   await page.getByRole('textbox', { name: 'Password' }).fill(`Test-${uniqueId}-Pass!`);
  43 |   await page.getByRole('button', { name: 'Create Account' }).click();
  44 | 
> 45 |   await expect(page).toHaveURL(`${appUrl}/`);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  46 |   await expect(page.getByText(email, { exact: true })).toBeVisible();
  47 |   await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  48 |   await expect(page.getByRole('heading', { name: 'Generate Test Cases' })).toBeVisible();
  49 | });
  50 | 
```