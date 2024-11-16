# Playwright Framework

[![Build Status](https://github.com/anoopsimon/playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/anoopsimon/playwright-framework/blob/main/.github/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Playwright Version](https://img.shields.io/badge/playwright-v1.44.0-blue)](https://playwright.dev/)

Simple JS automation test project template that features `Playwright` for ui automation

Other features
  -  Allure Single file Report
  -  GH Action Integrated for CI run
  -  Extendable to add more automation types such as REST, mobile etc.



Allure Report live [here](https://anoopsimon.github.io/playwright-framework/)

![](./report.png)

```bash
npx playwright test && npx playwright show-report
```

If there are test failures due missing browser exe please re run `npx playwright install` 

Example error to look for :
`Error: browserType.launch: Executable doesn't exist at C:\Users\xxxx\AppData\Local\ms-playwright\chromium-1140\chrome-win\chrome.exe
`


Allure report
```
npx allure generate --single-file --clean
```