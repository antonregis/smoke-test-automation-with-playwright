exports.OrderInfoPage = class OrderInfoPage {

  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.countrySelect = page.getByRole('combobox', { name: 'Country' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.addressInput = page.getByLabel('Street address', { exact: true });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.stateSelect = page.getByRole('combobox', { name: 'State' });
    this.zipCodeInput = page.getByRole('textbox', { name: 'Zip code' });
    this.cardNoInput = page.locator('[id*="edit-payment-information-add-payment-method-payment-details-number"]');
    this.monthSelect = page.locator('[name="payment_information[add_payment_method][payment_details][expiration][month]"]');
    this.yearSelect = page.locator('[name="payment_information[add_payment_method][payment_details][expiration][year]"]');
    this.cvvInput = page.getByRole('textbox', { name: 'CVV' });
    this.continueToReviewBtn = page.locator('input[value="Continue to review"]');
  }

  // Actions
  async fillContactInfo(email) {
    await this.emailInput.fill(email);
  }

  async fillShippingInfo(country, firstName, lastName, address, city, state, zipCode) {
    await this.countrySelect.selectOption(country);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.scrollIntoViewIfNeeded();
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateSelect.selectOption(state);
    await this.zipCodeInput.fill(zipCode);
  }

  async fillPaymentInfo(cardNo, month, year, cvv) {
    // console.log({ cardNo, month, year, cvv });
    await this.cvvInput.scrollIntoViewIfNeeded();
    await this.cardNoInput.fill(cardNo);
    await this.monthSelect.selectOption(month);
    await this.yearSelect.selectOption(year);
    await this.cvvInput.fill(cvv);
  }

  async clickContinueToReview() {
    await this.continueToReviewBtn.scrollIntoViewIfNeeded();
    await this.continueToReviewBtn.click();
  }
};