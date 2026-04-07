// tests/service.spec.ts

import { test, expect } from "@playwright/test";
import { LandingPage } from "../models/LandingPage";
import { LoginPage } from "../models/LoginPage";

test("동영상 URL 입력 테스트", async ({ page }) => {
  // await page.goto(`${process.env.BASE_URL}/service`); //세션 에러 개선후
  // await expect(page).toHaveURL(/.*service/);

  const landingPage = new LandingPage(page);
  await landingPage.goto(); //1. 접속
  await landingPage.clickLogin(); //2. 로그인 버튼 클릭

  const loginPage = new LoginPage(page);
  await loginPage.login();
  await expect(page).toHaveURL(/.*service/);
});
