// @ts-check
const { test, expect } = require('@playwright/test');

test('click GitHub link', async ({ page }) => {
  // Go to the page containing the Footer component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/about');

  // Get the initial number of open pages/tabs
  const initialPageCount = (await page.context().pages()).length;

  // Click the GitHub link.
  const githubLink = await page.locator('a[href="https://github.com/FredrikTvingstedt/"]');
  await githubLink.click();

  // Wait for a new page/tab to open
  await page.waitForTimeout(3000);

  // Get the new page that opened after clicking the link
  const pages = await page.context().pages();
  const newPage = pages.find((p) => !p.isClosed() && !p.url().includes('about'));

  // Expect the new page's URL to be the GitHub URL.
  await expect(newPage.url()).toEqual('https://github.com/FredrikTvingstedt/');
});