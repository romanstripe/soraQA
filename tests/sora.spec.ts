// tests/sora.spec.ts

import { test, expect } from "@playwright/test";
import { LandingPage } from "../models/LandingPage";
import { LoginPage } from "../models/LoginPage";
import { KakaoLoginPage } from "../models/KakaoLoginPage";
// import { MyPage } from "../models/MyPage";

test.describe("Login test", () => {
  test.beforeEach("Go to Login Page", async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.goto(); //1. 접속

    await landingPage.clickLogin(); //2. 로그인 버튼 클릭

    await expect(page).toHaveURL(/.*login/);
    //3. 검증 - url 이 로그인 페이지로 바뀌었는지 확인
  });

  test("Id/Pw login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await expect(page).toHaveURL(/.*service/);
  });

  test("Kakao login", async ({ page }) => {
    const kakaoLoginPage = new KakaoLoginPage(page);
    await kakaoLoginPage.kakaoLogin();
    await expect(page).toHaveURL(/.*service/);
  });
});
