// models/FolderPage.ts

import "dotenv/config";
import { type Locator, type Page } from "@playwright/test";

export class FolderPage {
  readonly page: Page;
  readonly folderInput: Locator;
  readonly folderBtn: Locator;
  readonly createFolderBtn: Locator;

  readonly shareBtn: Locator;
  readonly editBtn: Locator;
  readonly deleteBtn: Locator;

  readonly shareEmailInput: Locator;
  readonly removeShareBtn: Locator;
  readonly shareSubmitBtn: Locator;
  readonly addEmailBtn: Locator;

  readonly okayBtn: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.folderInput = page.getByRole("textbox", { name: "폴더 이름" });
    this.folderBtn = page.getByRole("button", { name: "폴더 생성하기" });
    this.createFolderBtn = page.getByRole("button", {
      name: "생성",
      exact: true,
    });

    this.shareBtn = page.getByRole("menuitem", { name: "공유" });
    this.editBtn = page.getByRole("menuitem", { name: "편집" });
    this.deleteBtn = page.getByRole("menuitem", { name: "삭제" });

    this.okayBtn = page.getByRole("button", { name: "확인", exact: true });
    this.saveBtn = page.getByRole("button", { name: "저장", exact: true });

    this.shareSubmitBtn = page.getByRole("button", {
      name: "공유",
      exact: true,
    });
    this.shareEmailInput = page.getByRole("textbox", {
      name: "공유할 사용자 이메일 입력",
    });

    this.addEmailBtn = page.getByRole("button").filter({ hasText: /^$/ });
    this.removeShareBtn = page.getByRole("menuitem", { name: "공유 제거" });
  }

  // 점 세 개 여는 함수 - 공유, 편집, 삭제, 공유제거 - boolean으로 구분
  private async openFolderMenu(folderName: string, isShared: boolean = false) {
    let root: Locator;

    if (isShared) {
      // 비공유 영역에서 찾을 때
      root = this.page
        .locator("div")
        .filter({ hasText: /^공유 폴더$/ }) // 제목 찾고
        .locator("..") // 부모로 올라가서 목록 전체 확보
        .first();
    } else {
      root = this.page
        .locator("div")
        .filter({ hasText: /^폴더 목록$/ }) // 제목 찾고
        .locator("..") // 부모로 올라가서 목록 전체 확보
        .first();
    }

    // 최종적으로 타겟 폴더의 메뉴 버튼 클릭
    const targetFolder = root
      .locator("div")
      .filter({ hasText: new RegExp(`^${folderName}$`) })
      .first();

    await targetFolder.locator('[id^="radix-"]').first().click();
  }

  async makeFolder(folderName: string) {
    await this.folderBtn.click();
    await this.folderInput.fill(folderName);
    await this.createFolderBtn.click();
  }

  async deleteFolder(folderName: string) {
    await this.openFolderMenu(folderName);
    await this.deleteBtn.click();
    await this.okayBtn.click();
    await this.okayBtn.click();
  }

  async editFolder(oldFolderName: string, newFolderName: string) {
    await this.openFolderMenu(oldFolderName);
    await this.editBtn.click();
    await this.folderInput.fill(newFolderName);
    await this.saveBtn.click();
    await this.okayBtn.click();
  }

  async shareFolder(
    folderName: string,
    email: string,
    authType: "읽기 전용" | "편집 가능" = "읽기 전용", // 기본값 설정
  ) {
    await this.openFolderMenu(folderName);
    await this.shareBtn.click();
    await this.shareEmailInput.fill(email);
    await this.addEmailBtn.click();
    //await this.page.keyboard.press("Enter"); //엔터로도 넘어감
    await this.page.getByRole("button", { name: new RegExp(authType) }).click();
    await this.shareSubmitBtn.click();
    await this.okayBtn.click();
  }

  async unshareFolder(folderName: string) {
    await this.openFolderMenu(folderName, true); // 공유됐으므로 true 전달
    await this.removeShareBtn.click();
    await this.okayBtn.click();
    await this.okayBtn.click();
  }
}
