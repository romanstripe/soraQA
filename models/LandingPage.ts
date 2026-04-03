// models/LandingPage.ts

import { type Locator, type Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "로그인" });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL || "https://google.com");
  } //접속할 사이트

  async clickLogin() {
    await this.loginButton.waitFor({ state: "visible" }); //버튼 보이면 클릭
    await this.loginButton.click();
  }
}
