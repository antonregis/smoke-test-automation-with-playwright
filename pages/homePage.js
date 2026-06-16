const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.logInButton = page.getByRole('link', { name: 'Log in' });
    this.topBarBlock = page.locator("//section[@role='navigation']//div[@class='container-xl']");
    this.bodyBlock = page.locator('#block-belgrade-content');
    this.headerBlock = page.locator('section.py-5.mt-lg-4.region.region-header');
    this.siteLogo = page.locator("a[class='site-logo text-reset'] svg");
    this.footerBlock = page.getByRole('contentinfo');
    this.allProductsLink = page.getByRole('link', { name: 'All products' });
  }


  // Actions
  async clickLogIn() {
    await this.logInButton.click();
  }

  async clickAllProductsLink() {
    await this.allProductsLink.click();
  }


  // Assertions
  async verifyIfWebsiteIsAccessible(websiteURL) {
    const response = await this.page.goto(websiteURL);
    if (response.status() === 200) {
      return 'yes';
    }
    else {
      throw new Error('Website verify not accessible');
    }
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('Explore the Demo Store | Belgrade');
  }

  async verifyTopBarIsVisible() {
    await expect(this.topBarBlock).toBeVisible();
    await expect(this.topBarBlock).toContainText(/Menu|Log In/);
  }

  async verifyHeaderIsVisible() {
    await expect(this.headerBlock).toBeVisible();
    await expect(this.headerBlock).toContainText(/All products|Blog/);
  }

  async verifySiteLogoIsVisible() {
    await expect(this.siteLogo).toBeVisible();
  }

  async verifyBodyIsVisible() {
    await expect(this.bodyBlock).toBeVisible();
    // console.log(this.bodyBlock);
    await expect(this.bodyBlock).toContainText(/VISIT CATALOG|New products|Bojan Živanović|VISIT US|Latest from our blog/);
  }

  async verifyFooterIsVisible() {
    await expect(this.footerBlock).toBeVisible();
    await expect(this.footerBlock).toContainText('Powered by Drupal');
  }
};