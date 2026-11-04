import { HomePage } from '../pageObjects/HomePage'

const homePage = new HomePage()

describe('wilson.com top right menu', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens the account popup', () => {
    homePage.openAccount()
    homePage.accountContent.should('be.visible')
  })

  it('opens the search dialog', () => {
    homePage.openSearch()
    homePage.searchDialog.should('be.visible')
  })

  it('opens the cart drawer', () => {
    homePage.openCart()
    homePage.cartDialog.should('be.visible')
  })
})
