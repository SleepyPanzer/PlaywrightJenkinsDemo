import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test('Adding Review To A Product', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.goToProducts();

  await productPage.verifyAllProductsVisible();
  await productPage.openFirstProductDetails();
  await productPage.verifyWriteReviewVisible();

  await productPage.submitReview('shaheer', 'shaheer@gmail.com', 'The product is very good');
  await productPage.verifyReviewSubmitted();
});
