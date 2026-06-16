const { test, expect } = require('@playwright/test');
import { HomePage } from '../pages/homePage';
import { ProductListingPage } from '../pages/productListingPage';
import { ProductDetailPage } from '../pages/productDetailPage';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';
import { OrderInfoPage } from '../pages/orderInfoPage';
import { ReviewPage } from '../pages/reviewPage';

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(2000);
  await page.close();
});

test('TC1. Homepage loads and displays correctly', async ({ page, baseURL }) => {

  // Initialize page objects
  const homePage = new HomePage(page);

  // Assertions
  if (await homePage.verifyIfWebsiteIsAccessible(baseURL) == 'yes') {
    await page.goto(baseURL);
  }
  await homePage.verifyPageTitle();
  await homePage.verifyTopBarIsVisible();
  await homePage.verifyHeaderIsVisible();
  await homePage.verifySiteLogoIsVisible();
  await homePage.verifyBodyIsVisible();
  await homePage.verifyFooterIsVisible();
});


test('TC2. User can search for a product and see results', async ({ page, baseURL }) => {
 
  // Initialize page objects
  const homePage = new HomePage(page);
  const productListingPage = new ProductListingPage(page);

  // Test data
  const searchKeyword = 'Print';

  // Test steps
  await page.goto(baseURL);
  await homePage.clickAllProductsLink();
  await productListingPage.searchForProduct(searchKeyword);

  // Assertions
  await productListingPage.verifyKeywordInSearchResults(searchKeyword);
});


test('TC3. User can view product details page', async ({ page, baseURL }) => {

  // Initialize page objects
  const homePage = new HomePage(page);
  const productListingPage = new ProductListingPage(page);
  const productDetailPage = new ProductDetailPage(page);

  // Test steps
  await page.goto(baseURL);
  await homePage.clickAllProductsLink();
  await productListingPage.clickRandomProduct();

  // Assertions
  await productDetailPage.verifyProductDetailsPageIsVisible();
});


test('TC4. User can add a product to cart and view cart', async ({ page, baseURL }) => {

  // Initialize page objects
  const homePage = new HomePage(page);
  const productListingPage = new ProductListingPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);

  // Test steps
  await page.goto(baseURL);
  await homePage.clickAllProductsLink();
  await productListingPage.clickRandomProduct();
  await productDetailPage.clickAddToCart();

  // Assert status message
  await productDetailPage.verifyStatusMessageIsVisible();

  // Test steps continued
  await productDetailPage.clickCartBtn();

  // Assert cart page is visible
  await cartPage.verifyCartPageIsVisible();
});


test('TC5. User can complete checkout up to payment page', async ({ page, baseURL }) => {
 
  // Initialize page objects
  const homePage = new HomePage(page);
  const productListingPage = new ProductListingPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const orderInfoPage = new OrderInfoPage(page);
  const reviewPage = new ReviewPage(page);
  
  // Test data
  const email = 'johndoe@testemail.com';
  const country = 'United States';
  const firstName = 'John';
  const lastName = 'Doe';
  const address = '9531 Heather Rd, Beverly Hills';
  const city = 'Los Angeles';
  const state = 'California';
  const zipCode = '90210';
  const cardNo = '4111111111111111';
  const month = String(new Date().getMonth() + 2).padStart(2, '0'); // +1 month from today
  const year = String(new Date().getFullYear() + 1).slice(-2); // +1 year from today
  const cvv = '123';

  // Test steps
  await page.goto(baseURL);
  await homePage.clickAllProductsLink();
  await productListingPage.clickRandomProduct();
  await productDetailPage.clickAddToCart();
  await productDetailPage.clickCartBtn();
  await cartPage.clickCheckout();
  await loginPage.clickContinueAsGuest(); 
  await orderInfoPage.fillContactInfo(email);
  await orderInfoPage.fillShippingInfo(country, firstName, lastName, address, city, state, zipCode);
  await orderInfoPage.fillPaymentInfo(cardNo, month, year, cvv);
  await orderInfoPage.clickContinueToReview();

  // Assertions
  await reviewPage. verifyReviewPageIsVisible();
});