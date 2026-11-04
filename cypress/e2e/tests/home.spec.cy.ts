import { HomePage } from '../pageObjects/HomePage'

const homePage = new HomePage()

describe('wilson.com home page', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens', () => {
    cy.url().should('include', 'wilson.com/en-us')
  })

  it('shows the hero banner', () => {
    homePage.heroBanner.should('be.visible')
  })
})
