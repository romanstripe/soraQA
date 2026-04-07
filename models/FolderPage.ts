// import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page //파일 관련 - 전사 등등
//폴더 - 공유 기능
//파일 중... 휴지통 - 복구, 완전 삭제 기능
//사용자 - 계정 정보, 공유 관리, 링크 공유 관리 등등

//     .locator("div")
//     .filter({ hasText: /^삭제전용$/ })
//     .nth(1)
//     .click();
//   await page.getByRole("button", { name: "새로 전사하기" }).click();
//   await page
//     .getByRole("textbox", { name: "동영상 웹주소를 입력해주세요" })
//     .click();
//   await page
//     .getByRole("textbox", { name: "동영상 웹주소를 입력해주세요" })
//     .fill("https://youtu.be/FqGaN7E3WZg?si=i_SB8CPtvtzoQAiV");
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.getByRole("button", { name: "전사 하기" }).click();
//   await page.getByRole("button", { name: "Toggle theme" }).click();
//   await page.getByRole("button", { name: "파일 전체 보기" }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^삭제전용$/ })
//     .first()
//     .click();

//   await page.locator("#radix-_r_10_").click();
//   await page.getByRole("menuitem", { name: "공유" }).click();
//   await page
//     .getByRole("textbox", { name: "공유할 사용자 이메일 입력" })
//     .click();
//   await page
//     .getByRole("textbox", { name: "공유할 사용자 이메일 입력" })
//     .fill("ppresi26@naver.com");
//   await page.getByRole("button").filter({ hasText: /^$/ }).click();
//   await page
//     .getByRole("button", { name: "편집 가능 이름 변경 및 자막 편집 가능" })
//     .click();
//   await page.getByRole("button", { name: "공유" }).click();
//   await page.getByRole("button", { name: "확인" }).click();
//   await page.locator("#radix-_r_10_").click();
//   await page.getByRole("menuitem", { name: "편집" }).click();

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

// models/ServiceFolder.ts

import "dotenv/config";
import { type Locator, type Page } from "@playwright/test";

export class FolderPage {
  readonly page: Page;
  readonly folderInput: Locator;
  readonly folderBtn: Locator;
  readonly createFolderBtn: Locator;
  readonly deleteBtn: Locator;
  readonly okayBtn: Locator;
  readonly editBtn: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.folderInput = page.getByRole("textbox", { name: "폴더 이름" });
    this.folderBtn = page.getByRole("button", { name: "폴더 생성하기" });
    this.createFolderBtn = page.getByRole("button", {
      name: "생성",
      exact: true,
    });
    this.deleteBtn = page.getByRole("menuitem", { name: "삭제" });
    this.editBtn = page.getByRole("menuitem", { name: "편집" });
    this.okayBtn = page.getByRole("button", { name: "확인", exact: true });
    this.saveBtn = page.getByRole("button", { name: "저장", exact: true });
  }

  async makeFolder(folderName: string) {
    await this.folderBtn.click();
    await this.folderInput.fill(folderName);
    await this.createFolderBtn.click();
  }

  async deleteFolder(folderName: string) {
    // 폴더 이름으로 영역 확보
    const folderLocator = this.page
      .locator("div")
      .filter({
        hasText: new RegExp(`^${folderName}$`),
      })
      .first();

    // 그 영역 '안에' 들어있는 radix 버튼 클릭
    // .first()를 붙이는 이유는 레이아웃상 아이콘이 여러 개일 수 있기 때문
    await folderLocator.locator('[id^="radix-"]').first().click();
    await folderLocator.click();
    await this.deleteBtn.click();
    await this.okayBtn.click();
    await this.okayBtn.click();
  }

  async editFolder(oldFolderName: string, newFolderName: string) {
    // 폴더 이름으로 영역 확보
    const folderLocator = this.page
      .locator("div")
      .filter({
        hasText: new RegExp(`^${oldFolderName}$`),
      })
      .first();

    // 그 영역 '안에' 들어있는 radix 버튼 클릭
    // .first()를 붙이는 이유는 레이아웃상 아이콘이 여러 개일 수 있기 때문
    await folderLocator.locator('[id^="radix-"]').first().click();
    await folderLocator.click();
    await this.editBtn.click();
    await this.folderInput.fill(newFolderName);
    await this.saveBtn.click();
    await this.okayBtn.click();
  }
}
