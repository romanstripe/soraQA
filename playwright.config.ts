import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

// .env 파일의 절대 경로를 직접 지정해서 강제로 읽어오기!
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   {
  //     name: 'Mobile Chrome',
  //     use: { ...devices['Pixel 5'] },
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: { ...devices['iPhone 12'] },
  //   },

  //   /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  // ],

  projects: [
    //  [SETUP] 로그인 상태를 파일로 저장하는 프로젝트
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/, // auth.setup.ts 파일만 실행
    },

    //[AUTH] 로그인 기능 테스트시 setup 안씀
    {
      name: "auth-tests",
      testMatch: /auth\.spec\.ts/, // sora.auth.spec.ts 또는 auth.spec.ts
      use: {
        ...devices["Desktop Chrome"],
        // 💡 중요: 여기선 저장된 로그인 정보를 절대 사용하지 않음! 쌩 브라우저로 실행!
        storageState: { cookies: [], origins: [] },
      },
    },

    // [SERVICE] 로그인된 상태로 영상 기능 테스트
    {
      name: "service-tests",
      testMatch: /service\.spec\.ts/, // video.spec.ts 또는 sora.video.spec.ts
      use: {
        ...devices["Desktop Chrome"],
        // 셋업에서 만든 로그인 정보를 가져와서 바로 로그인된 채로 시작
        storageState: "playwright/.auth/user.json",
      },
      //셋업 프로젝트가 성공해야만 이 프로젝트가 돌아감
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
