// @ts-check
const { test, expect } = require('@playwright/test');

test('menu link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Click the menu link.
  await page.getByRole('link', { name: 'menu' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/menu/);
});