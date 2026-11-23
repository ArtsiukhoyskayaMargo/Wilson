import { homePage } from '../pageObjects/HomePage'
import { helpCenterPage } from '../pageObjects/HelpCenterPage'

// ссылка футера → текст, по которому узнаём открывшуюся страницу
// Колонка Our Sites не покрыта: все её ссылки (Louisville Slugger, DeMarini, EvoShield, ATEC, Team.Shop)
// ведут на другие сайты. Для проверки перехода на другой домен нужен cy.origin(), и тест
// зависел бы от чужого сайта. Ссылка Wilson ведёт на главную этого же сайта.
const footerLinks = [
  { category: 'Our Company', name: 'About Us', pageText: 'Creating a Better World Through Sport' },
  { category: 'Our Company', name: 'Stores & Dealers', pageText: 'Experience a Wilson Retail Store' },
  { category: 'Our Company', name: 'Careers', pageText: 'Wilson Careers' },
  { category: 'Resources', name: 'Check Gift Card Balance', pageText: 'Enter a gift card number and PIN' },
  { category: 'Promotions & Discounts', name: 'Military Discount', pageText: 'Military Discount' },
]

describe('wilson.com footer', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens the contact us page', () => {
    homePage.openContactUs()
    // TODO: спросить у Кости, что лучше — заголовок на странице (heading) или название вкладки (cy.title)
    helpCenterPage.heading.should('contain.text', 'Help Center & Contact Us')
    cy.title().should('include', 'Help Center') //cy.title() смотрит только на тег <title> страницы поэтому только кусок
    helpCenterPage.quickActionLabels.eq(0).should('contain.text', 'Limited Warranty Request')//иишка предложила добавить eq, я не против
    helpCenterPage.quickActionLabels.eq(1).should('contain.text', 'Start A Return')
    helpCenterPage.quickActionLabels.eq(2).should('contain.text', 'View Gift Card Balance')
  })

  footerLinks.forEach(({ category, name, pageText }) => {
    it(`opens the ${name} page from the footer`, () => {
      homePage.openFooterLink(category, name)
      homePage.mainContent.contains(pageText).should('be.visible')
    })
  })
})
