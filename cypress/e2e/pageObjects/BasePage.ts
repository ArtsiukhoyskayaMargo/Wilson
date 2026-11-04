// общие для всех страниц части (хедер + чёрная полоса сверху), все страницы наследуют BasePage
export class BasePage {
  //elements
  get topBar() { return cy.get('.announcement-bar'); } //чёрная полоса сверху
  get topCenterMenu() { return cy.get('[data-testid="header-top-center"]'); }
  get mainMenu() { return cy.get('header-menu.header-menu'); }
  get topRightMenu() { return cy.get('[data-testid="header-top-right"]'); }

  // top right menu
  get accountButton() { return cy.get('.header-actions--account > .account-button'); }
  get accountContent() { return cy.get('.account__content'); }
  get searchButton() { return cy.get('.search-action--hidden-on-drawer'); }
  get searchDialog() { return cy.get('#search-modal dialog'); }
  get cartButton() { return cy.get('[data-testid="cart-drawer-trigger"]'); }
  get cartDialog() { return cy.get('[data-testid="cart-drawer-dialog"]'); }

  // footer
  get footer() { return cy.get('footer'); }
  footerColumn(category: string) { return cy.get(`footer nav[data-menu-category="${category}"]`); } //'Our Company', 'Resources'...
  footerLink(category: string, name: string) { return cy.get(`footer a[aria-label="${category}: ${name}"]`); } //('Our Company', 'About Us')
  get chatOnlineButton() { return cy.get('.footer-need-help__chat-button'); }
  get contactUsButton() { return cy.get('.footer-need-help a[href*="help-center"]'); }
  get chatWindow() { return cy.get('[data-sierra-part="root"]'); } //окно чата Sierra, лежит в shadow DOM

  //actions
  openAccount() { this.accountButton.click(); }
  openSearch() { this.searchButton.click(); }
  openCart() { this.cartButton.click(); }
  openChatOnline() { this.chatOnlineButton.click(); }
  openContactUs() { this.contactUsButton.click(); }
}
