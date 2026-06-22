const { expect } = require('@playwright/test');

exports.ProductListingPage = class ProductListingPage {

  constructor(page) {
    this.page = page;
    this.filterSearchBtn = page.getByRole('button', { name: 'Filters & search' });
    this.searchTextBox = page.locator('#edit-keyword-search');
    this.applyBtn = page.getByRole('button', { name: 'Apply' });
    this.searchResultsBlock = page.locator('div.row.g-4');
    this.product = page.locator('a.stretched-link');
  }


  // Actions
  async searchForProduct(keyword) {
    await this.filterSearchBtn.click();
    await this.searchTextBox.fill(keyword);
    await this.applyBtn.click();
  }

  async clickFirstProduct() {
    await this.page.locator('a.stretched-link').first().evaluate(domElement => domElement.click());
  }

  async clickRandomProduct() {
    const count = await this.page.locator('a.stretched-link').count();
    const randomProduct = Math.floor(Math.random() * count) + 1;
    // console.log(count);
    // console.log(randomProduct);
    await this.product.nth(randomProduct - 1).scrollIntoViewIfNeeded();
    await this.product.nth(randomProduct).evaluate(domElement => domElement.click());
  }


  // Assertions
  async verifyKeywordInSearchResults(keyword) {
    await expect(this.searchResultsBlock).toBeVisible();
    await expect(this.searchResultsBlock).toContainText(new RegExp(keyword, 'i'));
  }
};
