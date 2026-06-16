const { expect } = require('@playwright/test');

exports.ReviewPage = class ReviewPage {

  constructor(page) {
    this.page = page;
    this.payAndCompletePurchaseBtn = page.locator('#edit-actions-next');
  }


  // Assertions
  async verifyReviewPageIsVisible() {
    await expect(this.page).toHaveTitle(/Review/);
    await expect(this.payAndCompletePurchaseBtn).toBeVisible();
  }
};