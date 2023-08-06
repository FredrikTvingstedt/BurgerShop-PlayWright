// @ts-check
const { test, expect } = require('@playwright/test');

// Test - If the user is not logged in

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

// Test - If the user is logged in

test('Cart should be visible', async ({ page }) => {
  // Go to the page containing the Login component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');
  // Click the Login tab to show the login form
  const loginTab = await page.locator('.active-tab');
  if (loginTab.textContent() !== 'Login') {
    await page.click('text=Login');
    await page.waitForTimeout(1000); 
  }
  // Fill in the login form with the username and password
  await page.fill('#form1', 'Guest');
  await page.fill('#form2', 'Password');
  // Click the "Sign in" button to perform the login
  await page.click('text=Sign in');
  await page.waitForTimeout(1000);
  
  const cartButton = await page.locator('.cart-button');
  await expect(cartButton).toBeVisible();
  await cartButton.click();

  // Check if the cart itself is visible
  const cartButton = await page.locator('.cart-button');
  await expect(ButtonMenu).toBeVisible();
});

test('Dropdown menu should be visible', async ({ page }) => {
  // Go to the page containing the Login component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');
  // Click the Login tab to show the login form
  const loginTab = await page.locator('.active-tab');
  if (loginTab.textContent() !== 'Login') {
    await page.click('text=Login');
    await page.waitForTimeout(1000);
  }
  // Fill in the login form with the username and password
  await page.fill('#form1', 'Guest');
  await page.fill('#form2', 'Password');
  // Click the "Sign in" button to perform the login
  await page.click('text=Sign in');
  await page.waitForTimeout(1000);
  
  const dropdownToggle = await page.locator('.dropdown-toggle');
  await expect(dropdownToggle).toBeVisible();
  await dropdownToggle.click();

  // Check if the dropdown menu itself is visible
  const dropdownMenu = await page.locator('.dropdown-menu');
  await expect(dropdownMenu).toBeVisible();
});




test('About, Contact, and Login buttons should not be visible', async ({ page }) => {
  // Go to the page containing the Login component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');
  // Click the Login tab to show the login form
  const loginTab = await page.locator('.active-tab');
  if (loginTab.textContent() !== 'Login') {
    await page.click('text=Login');
    await page.waitForTimeout(1000);
  }
  // Fill in the login form with the username and password
  await page.fill('#form1', 'Guest');
  await page.fill('#form2', 'Password');
  // Click the "Sign in" button to perform the login
  await page.click('text=Sign in');
  // Wait for a little while to allow the login logic to complete
  await page.waitForTimeout(1000);
  // Check if the About, Contact, and Login buttons are NOT visible
  const aboutButton = await page.locator('text=About');
  const contactButton = await page.locator('text=Contact');
  const loginButton = await page.locator('text=Login');
  await expect(aboutButton).not.toBeVisible();
  await expect(contactButton).not.toBeVisible();
  await expect(loginButton).not.toBeVisible();
});
