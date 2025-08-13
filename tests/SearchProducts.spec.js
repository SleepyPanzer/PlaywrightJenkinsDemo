import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test('Searching Products', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const productName = 'dress';

  await homePage.goto();
  await homePage.clickProducts();
  await productPage.searchProduct(productName);
  await productPage.verifySearchedProductsContain(productName);
});
