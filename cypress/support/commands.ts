/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// cy.session() один раз принимает куки и кэширует cookies/localStorage
// для всех спеков (cacheAcrossSpecs)
Cypress.Commands.add('acceptCookies', () => {
  cy.session(
    'acceptCookies',
    () => {
      cy.visit('/')
      cy.get('#onetrust-accept-btn-handler').click()
    },
    { cacheAcrossSpecs: true },
  )
})

// soft assert (плагин soft-assert): упавшая проверка не роняет тест сразу,
// ошибки копятся и выводятся все вместе в cy.softAssertAll()
const softAssert = require('soft-assert')

// ищет элементы во всём документе, включая shadow DOM
function queryDeep(root: Document | ShadowRoot, selector: string): Element[] {
  const found = Array.from(root.querySelectorAll(selector))
  root.querySelectorAll('*').forEach(el => {
    if (el.shadowRoot) found.push(...queryDeep(el.shadowRoot, selector))
  })
  return found
}

function isVisible(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

// soft-проверка видимости: ждёт элемент до timeout, но при неудаче не роняет тест
Cypress.Commands.add('softVisible', (element: SoftElement, timeout = 10000) => {
  const { name, selector, text } = element
  const found = (doc: Document) =>
    queryDeep(doc, selector).some(el => isVisible(el) && (!text || el.textContent!.includes(text)))

  const check = (started: number): void => {
    cy.document({ log: false }).then(doc => {
      if (found(doc) || Date.now() - started > timeout) {
        Cypress.log({ name: 'softVisible', message: `${name}: ${found(doc) ? 'visible' : 'NOT visible'}` })
        softAssert.softTrue(found(doc), `${name} is not visible`)
      } else {
        cy.wait(300, { log: false }).then(() => check(started))
      }
    })
  }
  check(Date.now())
})

Cypress.Commands.add('softAssertAll', () => {
  cy.then(() => softAssert.softAssertAll())
})

// сбрасываем ошибки, оставшиеся от теста, который упал до cy.softAssertAll()
beforeEach(() => {
  softAssert.softAssertJson = null
  softAssert.softAssertCount = 0
})

declare global {
  type SoftElement = { name: string; selector: string; text?: string }

  namespace Cypress {
    interface Chainable {
      acceptCookies(): Chainable<void>
      softVisible(element: SoftElement, timeout?: number): Chainable<void>
      softAssertAll(): Chainable<void>
    }
  }
}

export {}

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }