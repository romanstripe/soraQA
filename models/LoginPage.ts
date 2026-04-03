// models/LoginPage.ts

import "dotenv/config";
import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly idInput: Locator;
  readonly pwInput: Locator;
  readonly loginSubmitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idInput = page.getByRole("textbox", { name: "아이디 입력" });
    this.pwInput = page.getByRole("textbox", { name: "비밀번호 입력" });
    this.loginSubmitBtn = page
      .getByRole("main")
      .getByRole("button", { name: "로그인" });
  }

  async login(
    id: string = process.env.USER_ID!,
    pw: string = process.env.USER_PW!,
  ) {
    await this.idInput.fill(id);
    await this.pwInput.fill(pw);
    await this.loginSubmitBtn.click();
  }
}
