import { defineConfig } from 'cypress'

const isCI = !!process.env.CI

export default defineConfig({
  retries: {
    runMode: isCI ? 2 : 1, //локально 1 повтор: сайт иногда отвечает 429 на первый заход
    openMode: 0,
  },

  defaultCommandTimeout: 20000, //на экшон и экспект
  pageLoadTimeout: 20000, //нафигэйшн

  // screenshot: 'only-on-failure', video: 'off'
  screenshotOnRunFailure: true,
  video: false,

  includeShadowDom: true, //cy.get ищет и внутри shadow DOM
  chromeWebSecurity: false, //отключаем same-origin policy в Chrome


  e2e: {
    baseUrl: 'https://www.wilson.com/en-us',
    specPattern: ['cypress/e2e/tests/**/*.spec.cy.ts', 'cypress/api/**/*.spec.cy.ts'],
  },
})
