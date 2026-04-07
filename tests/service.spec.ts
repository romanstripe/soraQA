// tests/service.spec.ts

import { test, expect } from "@playwright/test";
import { LandingPage } from "../models/LandingPage";
import { LoginPage } from "../models/LoginPage";

test("Video URL input test", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await landingPage.inputVideoUrl();
  await expect(page).toHaveURL(/.*login/);
});
