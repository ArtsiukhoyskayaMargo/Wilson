import { homePage } from '../pageObjects/HomePage'

describe('wilson.com announcement bar', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('shows the announcement bar content', () => {
    homePage.topBar.should('be.visible')
    homePage.firstPurchaseOfferLink.should('have.text', 'Get 15% Off First Purchase')
    homePage.announcementChatLink.should('have.text', 'Chat Online')
    homePage.findStoreLink.should('have.text', 'Find a Store')
  })

  // БАГ: клик ничего не открывает. У ссылки href="javascript:void(0)", а в id попали
  // типографские кавычки: id="“announcement_promo”" — скрипт попапа не находит ссылку.
  // Убрать .skip, когда сайт исправят.
  it.skip('opens the first purchase discount offer', () => {
    homePage.openFirstPurchaseOffer()
    homePage.discountPopup.should('be.visible')
  })

  it('opens the chat from the announcement bar', () => {
    homePage.openAnnouncementChat()
    homePage.chatDialog.should('be.visible')
    homePage.chatTitle.should('have.text', 'Virtual Agent')
    homePage.chatMessageInput.should('be.visible')
  })

  it('opens the find a store page', () => {
    homePage.openFindStore()
    homePage.mainContent.contains('Experience a Wilson Retail Store').should('be.visible')
  })
})
