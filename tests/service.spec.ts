// tests/service.spec.ts

import { test, expect } from "@playwright/test";
import { LandingPage } from "../models/LandingPage";
import { LoginPage } from "../models/LoginPage";
import { FolderPage } from "../models/FolderPage";

test.describe("Test for editing folders", () => {
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

  test("Folder Make Test", async ({ page }) => {
    const folderPage = new FolderPage(page);
    await folderPage.makeFolder("New2 Folder");
    await expect(page).toHaveURL(/.*service/);
  });

  test("Folder Delete Test", async ({ page }) => {
    const folderPage = new FolderPage(page);
    await folderPage.makeFolder("New2 Folder");
    await folderPage.deleteFolder("New2 Folder");
    await expect(page).toHaveURL(/.*service/);
  });

  test("Folder Edit Test", async ({ page }) => {
    const folderPage = new FolderPage(page);
    await folderPage.makeFolder("New2 Folder");
    await folderPage.editFolder("New2 Folder", "Edited Folder");
    await expect(page).toHaveURL(/.*service/);
  });

  test("Folder Share Test", async ({ page }) => {
    const folderPage = new FolderPage(page);
    await folderPage.shareFolder("Share Folder", process.env.KAKAO_ID!);
    await folderPage.shareFolder(
      "Share2 Folder",
      process.env.KAKAO_ID!,
      "편집 가능",
    );
    await expect(page).toHaveURL(/.*service/);
  });

  test("Folder Unshare Test", async ({ page }) => {
    const folderPage = new FolderPage(page);
    await folderPage.unshareFolder("Share2 Folder");
    await expect(page).toHaveURL(/.*service/);
  });
});
