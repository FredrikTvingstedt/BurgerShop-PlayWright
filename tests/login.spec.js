// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BurgerShop/);
});



// Your test code
test('login functionality', async ({ page }) => {
  // Go to the page containing the Login component
  await page.goto('https://burgershop-fredriktvingstedt.vercel.app/');

  // Click the Login tab to show the login form
  const loginTab = await page.locator('.active-tab');
  if (loginTab.textContent() !== 'Login') {
    await page.click('text=Login');
    await page.waitForTimeout(1000); // Add a short delay to allow the form to show (optional)
  }

  // Fill in the login form with the username and password
  await page.fill('#form1', 'Guest');
  await page.fill('#form2', 'Password');

  // Click the "Sign in" button to perform the login
  await page.click('text=Sign in');

  // Wait for a little while to allow the login logic to complete (optional)
  await page.waitForTimeout(1000);

  // Check if the user is authenticated after login
  const loggedInUser = await page.evaluate(() => {
    const user = window.localStorage.getItem('user');
    if (!user) return null;

    // Parse the user data and exclude the 'id' and 'imgUrl' properties
    const { id, imgUrl, ...userWithoutIdAndImgUrl } = JSON.parse(user);
    return userWithoutIdAndImgUrl;
  });

  // Expect the user to be logged in with the relevant properties
  expect(loggedInUser).toEqual({
  
    username: "Guest",
    password: "Password",
    name: 'John Doe',
    phonenumber: 70123456789112,
    email: 'John-Doe@Burgershop.se'
  });

  // Logout the user
  await page.click('text=Logout');

  // Wait for a little while to allow the logout logic to complete (optional)
  await page.waitForTimeout(1000);

  // Check if the user is logged out after clicking the "Logout" button
  const loggedOutUser = await page.evaluate(() => window.localStorage.getItem('user'));

  // Expect the user to be logged out
  expect(loggedOutUser).toBeNull();
});





