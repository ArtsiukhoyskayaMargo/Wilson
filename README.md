# Wilson — UI-автотесты на Cypress

Учебный фреймворк автотестов для сайта [wilson.com](https://www.wilson.com/en-us) на Cypress + TypeScript с паттерном Page Object.

## Что тестируется

| Спека | Что проверяет |
|---|---|
| `main-menu.spec.cy.ts` | меню аккаунта (5 элементов через soft assert), контент окна поиска, поиск с проверкой каждого результата, контент пустой корзины |
| `footer.spec.cy.ts` | Contact Us и переходы по ссылкам футера (параметризованные тесты) |
| `chat-online.spec.cy.ts` | чат открывается из футера и из чёрной полосы сверху |
| `announcement-bar.spec.cy.ts` | контент чёрной полосы сверху, Find a Store, предложение скидки (известный баг, `it.skip`) |

Подробные тест-кейсы — в [TEST_CASES.md](TEST_CASES.md).

## Структура

```
cypress/
  e2e/
    pageObjects/
      BasePage.ts           — общие для всех страниц части: хедер, announcement bar, футер, чат
      HomePage.ts           — главная страница
      HelpCenterPage.ts     — страница Help Center & Contact Us
    tests/                  — спеки по компонентам
  support/
    commands.ts             — cy.acceptCookies(), soft assert: cy.softVisible(), cy.softAssertAll()
    e2e.ts                  — глобальные настройки
cypress.config.ts           — конфиг Cypress
```

- Локаторы хранятся только в page objects, в спеках сырых селекторов нет.
- Всё, что есть на каждой странице (хедер, футер), лежит в `BasePage`. Страницы наследуют его через `extends`.
- Page objects экспортируются готовыми объектами: `import { homePage } from '../pageObjects/HomePage'`.
- `cy.acceptCookies()` принимает куки один раз через `cy.session()` и кэширует сессию для всех спек.
- Soft assert — плагин `soft-assert`. `cy.softVisible()` ждёт элемент (в том числе в shadow DOM), но при неудаче не роняет тест; `cy.softAssertAll()` в конце теста выводит все ошибки разом.

## Установка и запуск

```
npm install
```

| Команда | Что делает |
|---|---|
| `npm run cy:open` | открывает окно Cypress, тесты запускаются в Chrome |
| `npm test` | все тесты в Chrome с окном браузера (`--headed`: в headless-режиме сайт блокирует запросы) |
| `npm run test:e2e` | только e2e-тесты, тоже `--headed` |

Запустить одну спеку:
```
npx cypress run --browser chrome --spec cypress/e2e/tests/need-help.spec.cy.ts
```

## Настройки в `cypress.config.ts`

- `includeShadowDom: true` — `cy.get` ищет и внутри shadow DOM. Нужно для окна чата Sierra и аккаунта (`<shopify-account>`): они рисуются в shadow DOM.
- `chromeWebSecurity: false` — отключает same-origin policy, чтобы тесты не падали на iframe и переходах на другие домены.
- `retries.runMode` — локально 1 повтор, в CI 2: сайт иногда отвечает `429` на первый заход.
- `uncaught:exception` в `support/e2e.ts` игнорирует JS-ошибки самого сайта (рекламные трекеры).

## Известные проблемы

**Cypress не запускается из терминала VS Code** (ошибка `bad option: --smoke-test`). Терминал VS Code передаёт переменную `ELECTRON_RUN_AS_NODE=1`. Перед запуском выполнить в PowerShell:
```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE
```

**`cy.visit()` падает с `429: Too Many Requests`.** Сайт стоит за Cloudflare и иногда блокирует первый заход браузера Cypress. Помогает повтор (уже включён) или запуск в Electron: `npx cypress run --browser electron`.
