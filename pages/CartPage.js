import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info');        
    this.cartRows = page.locator('#cart_info tbody tr'); 
    this.removeProductButton = page.locator('.cart_quantity_delete').first();
  }

   async verifyCartHasProducts(count) {
   await expect(this.cartTable).toBeVisible();
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
  async removeFirstProduct() {
    await this.removeProductButton.click();
  }

  async verifyProductRemoved() {
    await expect(this.cartRows).toHaveCount(0);
    
  }
}
