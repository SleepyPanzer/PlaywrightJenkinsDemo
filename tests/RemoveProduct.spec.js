import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test('Remove Product from Cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.addFirstProductToCart();
  await homePage.goToCart();
  await cartPage.removeFirstProduct();
  await cartPage.verifyProductRemoved();
});
