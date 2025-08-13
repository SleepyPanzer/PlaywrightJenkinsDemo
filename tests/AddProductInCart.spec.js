import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test('Adding Product To Cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.clickProducts();

  await productPage.addFirstProductToCart();
  await productPage.continueShopping();
  await productPage.addSecondProductToCart();

  await productPage.goToCart();
  await cartPage.verifyCartHasProducts(2);
});
