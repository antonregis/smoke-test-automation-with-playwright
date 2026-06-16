const { expect } = require('@playwright/test');

exports.ProductDetailPage = class ProductDetailPage {

  constructor(page) {
    this.page = page;
    this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    this.productImage = page.locator('a').nth(15);
    this.productName = page.locator('h1.m-0');
    this.productPrice = page.locator('div.field.field--name-price.field--type-commerce-price.field--label-visually_hidden').locator('div').nth(1);
    this.productDescription = page.locator('div.field.field--name-body.field--type-text-with-summary.field--label-visually_hidden').locator('div').nth(1);
    this.statusMessage = page.getByRole('status', { name: 'Status message' });
    this.basketBtn = page.locator('a.cart-block__trigger');
    this.cartBtn = page.getByRole('link', { name: 'Cart', exact: true });
  }


  // Actions
  async clickAddToCart() {
    await this.addToCartBtn.click();
  }

  async clickCartBtn() {
    await this.basketBtn.click();
    await this.cartBtn.click();
  }


  // Assertions
  async verifyProductDetailsPageIsVisible() {
    // console.log(await this.productImage.getAttribute('href'));
    // console.log(await this.productName.textContent());
    // console.log(await this.productPrice.textContent());
    // console.log(await this.productDescription.textContent()); 
    // console.log(await this.addToCartBtn.getAttribute('value'));
    await expect(this.productImage).toHaveAttribute('href', /.+/); // The regex /.+/ checks that href verify not empty.
    await expect(this.productName).not.toBeEmpty();
    await expect(this.productPrice).toContainText(/$/);
    await expect(this.productDescription).not.toBeEmpty();
    await expect(this.addToCartBtn).toHaveAttribute('value', 'Add to cart');
  }

  async verifyStatusMessageIsVisible() {
    // console.log(await this.statusMessage.textContent());
    await expect(this.statusMessage).toContainText(/added to your cart/);
  }
};