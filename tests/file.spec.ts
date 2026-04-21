// tests/file.spec.ts
import { test, expect } from "@playwright/test";
import { LandingPage } from "../models/LandingPage";
import { LoginPage } from "../models/LoginPage";
import { FilePage } from "../models/FilePage";

test.describe("Test for editing Files", () => {
  // await page.goto(`${process.env.BASE_URL}/service`); //세션 에러 개선후
  // await expect(page).toHaveURL(/.*service/);

  test.beforeEach("Go to Login Page", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto(); //1. 접속
    await landingPage.clickLogin(); //2. 로그인 버튼 클릭

    const loginPage = new LoginPage(page);
    await loginPage.login();
    await expect(page).toHaveURL(/.*service/);
  }); //세션 에러 개선 전 사용할 로그인

  test("File Make Test", async ({ page }) => {
    const filePage = new FilePage(page);
    await filePage.makeFile();
    await expect(page).toHaveURL(/.*service/);
  });

  test("File Edit Test", async ({ page }) => {
    const filePage = new FilePage(page);
    const originalName =
      "Chandler and Monica Find Out If They Got the House | Friends";
    const editedName = `${originalName} Edited`;

    await filePage.editFile(originalName, editedName);
    await expect(page).toHaveURL(/.*service/);
  });

  test("File Share Test", async ({ page }) => {
    const filePage = new FilePage(page);
    const editedName =
      "Chandler and Monica Find Out If They Got the House | Friends Edited";

    await filePage.shareFile(editedName, process.env.KAKAO_ID!);
    await expect(page).toHaveURL(/.*service/);
  });

  test("File Download Test", async ({ page }) => {
    const filePage = new FilePage(page);
    const editedName =
      "Chandler and Monica Find Out If They Got the House | Friends Edited";

    await filePage.downloadFile(editedName);
    await expect(page).toHaveURL(/.*service/);
  });

  test("File Delete Test", async ({ page }) => {
    const filePage = new FilePage(page);
    const originalName =
      "Chandler and Monica Find Out If They Got the House | Friends";

    await filePage.deleteFile(originalName);
    await expect(page).toHaveURL(/.*service/);
  });
});
