const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('Saucedemo Add to Cart Test', () => {
  let loginPage, productsPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
  });

  test('Add product to cart and verify', async ({ page }) => {
    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // Get Product Details and Add to Cart
    const { name } = await productsPage.getProductNameAndPrice();
    await productsPage.addToCart();
    
    // Verify Product in Cart
    await productsPage.goToCart();
    const productInCart = await cartPage.verifyProductInCart(name);
    expect(productInCart).toBeTruthy();

    // Logout
    await cartPage.logout();
    await expect(page).toHaveURL(/login/);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});