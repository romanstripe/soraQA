// import { test, expect } from "@playwright/test";
//파일 - 새로전사(메뉴), 각 파일 - 공유, 다운로드, 이름변경, 삭제
//휴지통 - 전체복구(메뉴), 휴지통비우기(메뉴), 각 파일 - 복구, 삭제
//사용자 - 계정 정보, 공유 관리, 링크 공유 관리  + 언어, 테마

//파일페이지 - 파일관련
// test("test", async ({ page }) => {
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

// models/FilePage.ts

import "dotenv/config";
import { type Locator, type Page } from "@playwright/test";

export class FilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
