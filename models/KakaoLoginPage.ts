// models/KakaoLoginPage.ts

import { type Locator, type Page, expect } from "@playwright/test";

export class KakaoLoginPage {
  readonly page: Page;
  readonly kakaoLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.kakaoLoginBtn = page.getByRole("button", { name: "Kakao로 계속하기" });
  }

  private getPopupLocators(popup: Page) {
    return {
      idInput: popup.locator('input[name="loginId"]'),
      pwInput: popup.locator('input[name="password"]'),
      submitBtn: popup.locator('button[type="submit"]'),
    };
    //팝업 내 요소들 속성으로 선택하기
  }

  async kakaoLogin(
    id: string = process.env.KAKAO_ID!,
    pw: string = process.env.KAKAO_PW!,
  ) {
    const popupPromise = this.page.waitForEvent("popup");
    await this.kakaoLoginBtn.click();
    const popup = await popupPromise;

    await popup.waitForLoadState("domcontentloaded");

    // 팝업 내 요소들 가져오기
    const { idInput, pwInput, submitBtn } = this.getPopupLocators(popup);

    await idInput.fill(id);
    await pwInput.fill(pw);
    await submitBtn.click();
  }
}
