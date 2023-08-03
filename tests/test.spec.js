// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BurgerShop/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');

  // Click the get started link.
  await page.getByRole('link', { name: 'menu' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*menu/);
});
