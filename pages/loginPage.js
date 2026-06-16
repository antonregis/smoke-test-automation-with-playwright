exports.LoginPage = class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.locator('#edit-submit');
    this.continueAsGuestBtn = page.locator('#edit-login-guest-continue');
  }


  // Actions
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickContinueAsGuest() {
    await this.continueAsGuestBtn.click();
  }
}