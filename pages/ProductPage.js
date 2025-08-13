import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.productsLink = page.getByRole('link', { name: ' Products' });

    // Search
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.getByRole('button', { name: '' });
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productNames = page.locator('.productinfo.text-center p');
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });

    // Cart
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.cartRows = page.locator('#cart_info tbody tr');

    // Review
    this.nameField = page.getByRole('textbox', { name: 'Your Name' });
    this.emailField = page.getByRole('textbox', { name: 'Email Address', exact: true });
    this.reviewField = page.getByRole('textbox', { name: 'Add Review Here!' });
    this.submitReviewButton = page.getByRole('button', { name: 'Submit' });
    this.reviewSuccessMsg = page.getByText('Thank you for your review. Submit');
    this.writeReviewLink = page.getByRole('link', { name: 'Write Your Review' });

    // Specific product add-to-cart buttons from working script
    this.firstAddToCartBtn = page.locator('.overlay-content > .btn').first();
    this.secondAddToCartBtn = page.locator(
      'div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn'
    );
    this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async goto() {
    await this.page.goto('https://www.automationexercise.com', { waitUntil: 'domcontentloaded' });
  }

  async navigateToProducts() {
    await this.productsLink.click();
  }

  async addFirstProductToCart() {
  const firstProductCard = this.page.locator('.product-image-wrapper').first();
  await firstProductCard.scrollIntoViewIfNeeded();
  await firstProductCard.hover();
  const firstAddToCartBtn = firstProductCard.locator('.overlay-content > .btn');
  await firstAddToCartBtn.waitFor({ state: 'visible', timeout: 5000 });
  await firstAddToCartBtn.click({ force: true });
}

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async addSecondProductToCart() {
    await this.secondAddToCartBtn.click();
  }

  async goToCart() {
    await this.viewCartLink.click();
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async verifySearchedProductsContain(text) {
    await expect(this.searchedProductsHeading).toBeVisible();
    const count = await this.productNames.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const name = await this.productNames.nth(i).textContent();
      expect(name.toLowerCase()).toContain(text.toLowerCase());
    }
  }

  async verifyCartHasProducts(count) {
    await expect(this.cartRows).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      const priceText = await this.cartRows.nth(i).locator('td').nth(2).textContent();
      const qtyText = await this.cartRows.nth(i).locator('.disabled').textContent();

      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const qty = parseInt(qtyText);
      expect(price).toBeGreaterThan(0);
      expect(qty).toBeGreaterThan(0);
    }
  }

  async openFirstProductDetails() {
    const firstProduct = this.page.locator('.product-image-wrapper').first();
    const detailLink = firstProduct.locator('.nav.nav-pills.nav-justified > li > a').first();
    await detailLink.click();
  }

  async verifyWriteReviewVisible() {
    await expect(this.writeReviewLink).toBeVisible();
  }

  async submitReview(name, email, review) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.reviewField.fill(review);
    await this.submitReviewButton.click();
  }

  async verifyReviewSubmitted() {
    await expect(this.reviewSuccessMsg).toBeVisible();
  }

  async verifyAllProductsVisible() {
    await expect(this.allProductsHeading).toBeVisible();
  }
}
