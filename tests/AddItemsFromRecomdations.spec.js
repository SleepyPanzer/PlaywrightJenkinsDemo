import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CartPage } from '../pages/CartPage.js' ;

test('Adding Products From Recommendations', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.scrollToRecommendedItems();
    await home.addRecommendedItemToCart();
    const cart = new CartPage(page);

    await cart.verifyCartHasProducts(1);
});
