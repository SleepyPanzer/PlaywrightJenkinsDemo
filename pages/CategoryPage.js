import { expect } from '@playwright/test';

export class CategoryPage {
  constructor(page) {
    this.page = page;
    this.womenDressHeading = page.getByRole('heading', { name: 'Women - Dress Products' });
  }

  async verifyWomenDressProductsVisible() {
    await expect(this.womenDressHeading).toBeVisible();
  }
}
