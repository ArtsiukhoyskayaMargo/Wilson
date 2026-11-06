# Wilson — UI-автотесты на Cypress

Учебный фреймворк автотестов для сайта [wilson.com](https://www.wilson.com/en-us) на Cypress + TypeScript с паттерном Page Object.

## Что тестируется

| Спека | Что проверяет |
|---|---|
| `top-right-menu.spec.cy.ts` | правое меню хедера: открывается попап аккаунта, окно поиска, корзина |
| `need-help.spec.cy.ts` | блок Need Help в футере: открывается чат Chat Online, Contact Us ведёт на help-center |
| `home.spec.cy.ts` | главная страница открывается, виден hero-баннер |

## Структура

```
cypress/
  e2e/
    pageObjects/
      BasePage.ts    — общие для всех страниц части: хедер, правое меню, футер
      HomePage.ts    — главная страница, наследует BasePage
    tests/           — спеки
  support/
    commands.ts      — кастомная команда cy.acceptCookies()
    e2e.ts           — глобальные настройки
cypress.config.ts    — конфиг Cypress
```

- Локаторы хранятся только в page objects, в спеках сырых селекторов нет.
- Всё, что есть на каждой странице (хедер, футер), лежит в `BasePage`. Страницы наследуют его через `extends`.
- `cy.acceptCookies()` принимает куки один раз через `cy.session()` и кэширует сессию для всех спек.

## Установка и запуск

```
npm install
```

| Команда | Что делает |
|---|---|
| `npm run cy:open` | открывает окно Cypress, тесты запускаются в Chrome |
| `npm test` | все тесты без окна (headless) |
| `npm run test:e2e` | только e2e-тесты |

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
