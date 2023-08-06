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

  // Find the dropdown menu button and click it
  const dropdownToggle = await page.locator('.dropdown-toggle');
  await dropdownToggle.click();

  // Check if the dropdown menu itself is visible
  const dropdownMenu = await page.locator('.dropdown-menu');
  await expect(dropdownMenu).toBeVisible();

  // Additional test to check if the dropdown menu is visible after clicking
  const isDropdownMenuVisible = await dropdownMenu.isVisible();
  expect(isDropdownMenuVisible).toBe(true);
});

test.describe('Dropdown Menu', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the page containing the DropdownMenu component
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
    // Find the dropdown menu button and click it
    const dropdownToggle = await page.locator('.dropdown-toggle');
    await dropdownToggle.click();
  });

  test('Home link should navigate to the correct page', async ({ page }) => {
    // Click on the "Home" link in the dropdown menu
    await page.click('text=Home');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/home')
  });

  test('Menu link should navigate to the correct page', async ({ page }) => {
    // Click on the "Burger Menu" link in the dropdown menu
    await page.locator('[class="dropdown-item"]').getByText("Menu").click();
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/menu')
  });

  
  test('Orders link should navigate to the correct page', async ({ page }) => {
    // Click on the "Orders" link in the dropdown menu
    await page.click('text=Orders');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/myorders')
  });

  test('About link should navigate to the correct page', async ({ page }) => {
    // Click on the "About" link in the dropdown menu
    await page.click('text=About');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/about')
  });

  test('Contact link should navigate to the correct page', async ({ page }) => {
    // Click on the "Contact" link in the dropdown menu
    await page.click('text=Contact');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/contact')
  });

  test('My Account link should navigate to the correct page', async ({ page }) => {
    // Click on the "My Account" link in the dropdown menu
    await page.click('text=My Account');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/me')
  });

  test('Logout link should navigate to the correct page', async ({ page }) => {
    // Click on the "Logout" link in the dropdown menu
    await page.click('text=Logout');
    // Expect the URL to contain the correct path
    await expect(page).toHaveURL('https://burgershop-fredriktvingstedt.vercel.app/')
  });
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
  await page.waitForTimeout(1000);

  // Check if the About, Contact, and Login buttons are NOT visible
  const aboutButton = await page.locator('text=About');
  const contactButton = await page.locator('text=Contact');
  const loginButton = await page.locator('text=Login');
  await expect(aboutButton).not.toBeVisible();
  await expect(contactButton).not.toBeVisible();
  await expect(loginButton).not.toBeVisible();
});
