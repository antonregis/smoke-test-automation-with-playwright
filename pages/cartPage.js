const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator(".page-title.text-center.underline");
    this.checkoutBtn = page.locator("//input[@value='Checkout']");
  }


  // Actions
  async clickCheckout() {
    await this.checkoutBtn.click();
  }


  // Assertions
  async verifyCartPageIsVisible() {
    // console.log(await this.pageHeader.textContent());
    await expect(this.pageHeader).toContainText(/Shopping cart/);
  }
};