import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    this.productLink = page.getByRole('link', { name: ' Products' });
    this.cartPageLink = page.getByRole('link', { name: ' Cart' });
    this.categories = page.getByRole('heading', { name: 'Category' });
    this.womenCategory = page.getByRole('link', { name: ' Women' });
    this.subCategoryDress = page.getByRole('link', { name: 'Dress' });
    this.recommendedItemsTitle = page.getByRole('heading', { name: 'recommended items' });

    this.recommendedItemAddCartBtn = page
      .locator('.item.active > div > .product-image-wrapper > .single-products > .productinfo > .btn')
      .first();

    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.productsLink = page.getByRole('link', { name: ' Products' });
    this.categoryHeading = page.getByRole('heading', { name: 'Category' });
    this.firstProduct = page.locator('.product-image-wrapper').first();

    this.addToCartButton = this.firstProduct
      .locator('a:has-text("Add to cart")')
      .filter({ hasText: 'Add to cart', has: this.page.locator('.productinfo') })
      .first();

    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartButton = page.getByRole('link', { name: 'Cart' });
  }

  async goto() {
    await this.page.goto('https://www.automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await this.page.locator('#slider').waitFor({ state: 'visible', timeout: 15000 });
  }

  async scrollToRecommendedItems() {
    await this.recommendedItemsTitle.scrollIntoViewIfNeeded();
    await expect(this.recommendedItemsTitle).toBeVisible();
  }

  async addRecommendedItemToCart() {
    await this.recommendedItemAddCartBtn.click();
    await this.viewCartLink.click();
  }

  async clickProducts() {
    await this.productLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async verifyCategoryVisible() {
    await expect(this.categoryHeading).toBeVisible();
  }

async addFirstProductToCart() {
    await this.firstProduct.hover();
    await this.page.waitForTimeout(500); 

    const overlayButton = this.firstProduct.locator('.overlay-content a:has-text("Add to cart")').first();
    await expect(overlayButton).toBeVisible({ timeout: 5000 });
    await overlayButton.click();

    const modal = this.page.locator('#cartModal'); 
    await expect(modal).toBeVisible({ timeout: 10000 });

    await this.continueShoppingButton.click();
}


  async goToCart() {
    await this.cartButton.click();
  }
}
