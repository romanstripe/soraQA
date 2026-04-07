// tests/service.spec.ts

import { test, expect } from "@playwright/test";

test("동영상 URL 입력 테스트", async ({ page }) => {
  // 이미 로그인이 되어 있으므로 바로 서비스 페이지로 이동
  await page.goto(`${process.env.BASE_URL}/service`);
});
