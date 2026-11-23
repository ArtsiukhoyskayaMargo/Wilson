import { homePage } from '../pageObjects/HomePage'

describe('wilson.com main menu', () => {
  beforeEach(() => {
    cy.acceptCookies()
    homePage.open()
  })

  it('opens the account menu', () => {
    homePage.openAccount()
    homePage.accountMenu.should('be.visible')
    homePage.accountMenuElements.forEach(element => cy.softVisible(element))
    cy.softAssertAll()
  })

  it('shows the search dialog content', () => {
    homePage.openSearch()
    homePage.searchDialog.should('be.visible')
    homePage.searchInput.should('be.visible')
    homePage.popularSearchesLabel.should('have.text', 'Popular Searches')
    homePage.searchProductsLabel.should('have.text', 'Popular Products')
  })

  it('shows search results matching the query', () => {
    homePage.search('duffle')
    homePage.searchInput.should('have.value', 'duffle') //буква d теряется, есть сумки с duffel
    homePage.searchProductsLabel.should('have.text', 'Product Matches')
    homePage.searchProductTitles.should(($titles) => {
      $titles.each((_index, title) => {
        expect(title.textContent).to.contain('Duffle')
      })
    })
  })

  it('opens the cart drawer', () => {
    homePage.openCart()
    homePage.cartDialog.should('be.visible')
    homePage.emptyCartTitle.should('have.text', 'No Items in Bag')
    homePage.emptyCartHeading.should('have.text', "No Worries, We've Got Just the Thing for You")
    homePage.shopWilsonButton.should('be.visible').and('have.text', 'Shop Wilson')
  })
})
