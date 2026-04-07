// models/LandingPage.ts

import { type Locator, type Page } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly videoUrlInput: Locator;
  readonly confirmButton: Locator;
  readonly transButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "로그인" });
    this.videoUrlInput = page.getByPlaceholder("동영상 웹주소를 입력해주세요");
    this.confirmButton = page.getByRole("button", { name: "확인" });
    this.transButton = page.getByRole("button", { name: "전사 하기" });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL || "https://google.com");
  } //접속할 사이트

  async clickLogin() {
    await this.loginButton.waitFor({ state: "visible" }); //버튼 보이면 클릭
    await this.loginButton.click();
  }

  async inputVideoUrl(url: string = process.env.YOUTUBE_URL!) {
    await this.videoUrlInput.fill(url);
    await this.confirmButton.click();
    await this.transButton.click();
  }
}
