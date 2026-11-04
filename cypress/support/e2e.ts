// Глобальные настройки и кастомные команды для e2e-тестов
import './commands'

// Игнорируем любые ошибки JavaScript самого сайта.
// Зачем: сайт периодически кидает свои ошибки (например, рекламный трекер:
// "ttdConversionEvents is not defined"), а Cypress по умолчанию роняет на них тест,
// даже если наши проверки в порядке. Playwright такие ошибки игнорирует сам.
// https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', () => false)
