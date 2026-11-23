import { homePage } from '../pageObjects/HomePage'

describe('wilson.com chat online', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens the chat from the footer', () => {
    homePage.openChatOnline()
    homePage.chatDialog.should('be.visible')
    homePage.chatTitle.should('have.text', 'Virtual Agent')
    homePage.chatMessageInput.should('be.visible')
  })
})
