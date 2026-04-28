# Playwright QA Automation

웹 서비스의 주요 사용자 플로우를 Playwright로 자동화 테스트한 프로젝트입니다.  
로그인, 폴더 생성/수정/삭제/공유, 파일 관련 기능 등 반복 확인이 필요한 QA 시나리오를 테스트 코드로 관리했습니다.

## 기술 스택

- Playwright
- TypeScript
- dotenv

## 테스트 범위

- 로그인 플로우
- 폴더 생성
- 폴더 이름 수정
- 폴더 삭제
- 폴더 공유 / 공유 해제
- 파일 생성, 공유, 다운로드, 이름 변경, 삭제 테스트 구조 설계

## 프로젝트 구조

```txt
.
├── models/                  # Page Object Model
│   ├── LandingPage.ts
│   ├── LoginPage.ts
│   ├── FolderPage.ts
│   └── FilePage.ts
│
├── tests/                   # 테스트 코드
│   ├── auth.spec.ts
│   ├── folder.spec.ts
│   ├── file.spec.ts
│   └── sora.spec.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 실행 방법
```
npm install
npx playwright install
npx playwright test
```

## 구현 메모

초기에는 auth.setup.ts를 통해 로그인 세션을 저장하고 테스트를 간소화하려 했으나, 세션 유지 이슈로 인해 각 테스트 실행 전 로그인 과정을 수행하는 방식으로 구성했습니다.


## 주요 포인트

- Page Object Model 구조 적용
- 반복되는 UI 조작 로직을 모델 클래스로 분리
- 실제 사용자 흐름 기반 E2E 테스트 작성
환경변수를 활용한 테스트 계정 및 URL 관리
