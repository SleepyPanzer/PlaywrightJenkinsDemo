import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';

test('Viewing Products From The Categories', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);

  await homePage.goto();
  await homePage.verifyCategoryVisible();
  await homePage.openWomenDressCategory();
  await categoryPage.verifyWomenDressProductsVisible();
});
