// @ts-check
const { test, expect } = require('@playwright/test');

//Test - Main

test('menu link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Click the menu link.
  await page.getByRole('link', { name: 'menu' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/menu/);
});

//Test - Header

test('contact link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Click the contact link.
  await page.getByRole('link', { name: 'contact' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/contact/);
});

test('about link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Click the contact link.
  await page.getByRole('link', { name: 'about' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/about/);
});

test('login link', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Click the contact link.
  await page.getByRole('link', { name: 'login' }).click();

  // Extract the root URL from the current URL and navigate to it.
  const rootUrl = new URL('/', page.url());
  await page.goto(rootUrl.toString());

  // Expects the URL to be the root URL.
  await expect(page.url()).toEqual(rootUrl.toString());
});

// Test - Footer

test('click GitHub link', async ({ page }) => {
  // Go to the page containing the Footer component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Get the initial number of open pages/tabs
  const initialPageCount = (await page.context().pages()).length;

  // Click the GitHub link.
  const githubLink = await page.locator('a[href="https://github.com/FredrikTvingstedt/"]');
  await githubLink.click();

  // Wait for a new page/tab to open
  await page.waitForTimeout(1000);

  // Get the new page that opened after clicking the link
  const pages = await page.context().pages();
  const newPage = pages.find((p) => !p.isClosed() && !p.url().includes('about'));

  // Expect the new page's URL to be the GitHub URL.
  await expect(newPage.url()).toEqual('https://github.com/FredrikTvingstedt/');
});

