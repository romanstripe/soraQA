// import { test, expect } from "@playwright/test";
//파일 - 새로전사(메뉴), 각 파일 - 공유, 다운로드, 이름변경, 삭제
//휴지통 - 전체복구(메뉴), 휴지통비우기(메뉴), 각 파일 - 복구, 삭제
//사용자 - 계정 정보, 공유 관리, 링크 공유 관리  + 언어, 테마

//파일페이지 - 파일관련

//   await page.getByRole("button", { name: "Toggle theme" }).click();
//   await page.getByRole("button", { name: "파일 전체 보기" }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^삭제전용$/ })
//     .first()
//     .click();

//   await page.getByRole("button", { name: "휴지통" }).click();
//   await page.getByRole("button", { name: "전체 복구" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "파일 전체 보기" }).click();
//   await page.locator("#radix-_r_30_").click();
//   await page.getByText("삭제").click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "휴지통" }).click();
//   await page.getByRole("button", { name: "휴지통 비우기" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "KAKAO_ID }).click();
//   await page.getByRole("menuitem", { name: "계정 정보" }).click();
//   page.once("dialog", (dialog) => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole("button", { name: "비밀번호 변경" }).click();
//   await page.getByRole("textbox", { name: "현재 비밀번호" }).click();
//   await page.getByRole("button", { name: "KAKAO_ID" }).click();
//   await page.getByRole("menuitem", { name: "공유 관리" }).click();
//   await page.locator("#radix-_r_46_").click();
//   await page.getByText("읽기 전용").click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("cell").filter({ hasText: /^$/ }).nth(1).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "링크 공유 관리 (자막 등)" }).click();
// });

// models/FilePage.ts

import "dotenv/config";
import { type Locator, type Page } from "@playwright/test";

export class FilePage {
  readonly page: Page;
  readonly transBtn: Locator;
  readonly transSubBtn: Locator;
  readonly addressInput: Locator;
  readonly okayBtn: Locator;

  readonly shareBtn: Locator;
  readonly downloadBtn: Locator;
  readonly editBtn: Locator;
  readonly deleteBtn: Locator;

  readonly shareEmailInput: Locator;
  readonly shareSubmitBtn: Locator;
  readonly addEmailBtn: Locator;
  readonly saveBtn: Locator;
  readonly fileNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transBtn = page.getByRole("button", { name: "전사" });
    this.transSubBtn = page.getByRole("button", {
      name: "전사 하기",
      exact: true,
    });
    this.addressInput = page.getByRole("textbox", {
      name: "동영상 웹주소를 입력해주세요",
    });
    this.okayBtn = page.getByRole("button", { name: "확인", exact: true });

    this.shareBtn = page.getByRole("menuitem", { name: "공유" });
    this.downloadBtn = page.getByRole("menuitem", { name: "다운로드" });
    this.editBtn = page.getByRole("menuitem", { name: "이름 변경" });
    this.deleteBtn = page.getByRole("menuitem", { name: "삭제" });

    this.shareEmailInput = page.getByRole("textbox", {
      name: "공유할 사용자 이메일 입력",
    });
    this.shareSubmitBtn = page.getByRole("button", {
      name: "공유",
      exact: true,
    });
    this.addEmailBtn = page.getByRole("button").filter({ hasText: /^$/ });
    this.saveBtn = page.getByRole("button", { name: "저장", exact: true });
    this.fileNameInput = page.getByRole("textbox", { name: "File name" });
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
  }

  private async openFileMenu(fileName: string) {
    const safeName = this.escapeRegExp(fileName);
    const targetFile = this.page
      .locator("div")
      .filter({ hasText: new RegExp(`^${safeName}$`) })
      .first();

    await targetFile.locator('[id^="radix-"]').first().click();
  }

  async makeFile(url: string = process.env.YOUTUBE_URL!) {
    await this.transBtn.click();
    await this.addressInput.fill(url);
    await this.okayBtn.click();
    await this.transSubBtn.click();
  }

  async shareFile(fileName: string, email: string) {
    await this.openFileMenu(fileName);
    await this.shareBtn.click();
    await this.shareEmailInput.fill(email);
    await this.addEmailBtn.click();
    await this.shareSubmitBtn.click();
    await this.okayBtn.click();
  }

  async downloadFile(fileName: string) {
    await this.openFileMenu(fileName);
    await this.downloadBtn.click();
  }

  async editFile(oldFileName: string, newFileName: string) {
    await this.openFileMenu(oldFileName);
    await this.editBtn.click();
    await this.fileNameInput.click();
    await this.fileNameInput.fill(newFileName);
    await this.saveBtn.click();
    await this.okayBtn.click();
  }

  async deleteFile(fileName: string) {
    await this.openFileMenu(fileName);
    await this.deleteBtn.click();
    await this.okayBtn.click();
    await this.okayBtn.click();
  }
}
