import { HomePage } from '../pageObjects/HomePage'

const homePage = new HomePage()

describe('wilson.com footer need help', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens the chat online window', () => {
    homePage.openChatOnline()
    homePage.chatWindow.should('be.visible')
  })

  it('opens the contact us page', () => {
    homePage.openContactUs()
    cy.url().should('include', '/pages/help-center')
  })
})
