// tests/auth.setup.ts
import { test as setup } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page); //검증된 로케이터들 소환

  // 1. 로그인 과정 수행
  await page.goto(`${process.env.BASE_URL}/login`);
  await loginPage.login(process.env.USER_ID!, process.env.USER_PW!);

  // 2. 로그인 성공 여부 확인
  await page.waitForURL(/.*service/);

  // 3. 상태 저장
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
