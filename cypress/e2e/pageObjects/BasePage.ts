// общие для всех страниц части (хедер, чёрная полоса сверху, футер, чат), все страницы наследуют BasePage
export class BasePage {
  //elements
  get topCenterMenu() { return cy.get('[data-testid="header-top-center"]'); }
  get mainMenu() { return cy.get('header-menu.header-menu'); }
  get topRightMenu() { return cy.get('[data-testid="header-top-right"]'); }
  get mainContent() { return cy.get('main'); }

  // announcement bar (чёрная полоса сверху)
  get topBar() { return cy.get('.announcement-bar'); }
  get firstPurchaseOfferLink() { return cy.get('.announcement-bar__text a'); }
  get announcementChatLink() { return cy.get('.announcement-bar__links a[data-sierra-chat]'); }
  get findStoreLink() { return cy.get('.announcement-bar__links a[href*="our-stores"]'); }
  get discountPopup() { return cy.get('div[role="dialog"][aria-label="POPUP Form"]'); } //попап Klaviyo, селектор предположительный: из-за бага попап не открывается

  // account menu (рисуется в shadow DOM <shopify-account>)
  get accountButton() { return cy.get('.header-actions--account > .account-button'); }
  get accountMenu() { return cy.get('.account__menu-items'); }
  // строками, а не через cy.get — для soft-проверок в cy.softVisible()
  readonly accountMenuElements = [
    { name: 'Orders', selector: '.account__item-text', text: 'Orders' },
    { name: 'Profile', selector: '.account__item-text', text: 'Profile' },
    { name: 'Legacy Orders', selector: '.account__item-text', text: 'Legacy Orders' },
    { name: 'Sign in heading', selector: '.account__heading', text: 'Sign in or create account' },
    { name: 'Email field', selector: 'input#login-form-email' },
  ];

  // search
  get searchButton() { return cy.get('.search-action--hidden-on-drawer'); }
  get searchDialog() { return cy.get('#search-modal dialog'); }
  get searchInput() { return cy.get('#search-modal .query-box_input'); }
  get popularSearchesLabel() { return cy.get('#search-modal .query-suggestions-label'); }
  // заголовок блока товаров: до ввода "Popular Products", после ввода запроса "Product Matches"
  get searchProductsLabel() { return cy.get('#search-modal .search-result-suggestions-label'); }
  get searchProductTitles() { return cy.get('#search-modal .search-result-suggestions [data-replaceable-card-title]'); }

  // cart
  get cartButton() { return cy.get('[data-testid="cart-drawer-trigger"]'); }
  get cartDialog() { return cy.get('[data-testid="cart-drawer-dialog"]'); }
  get emptyCartTitle() { return cy.get('.empty-cart-message__eyebrow'); }
  get emptyCartHeading() { return cy.get('.empty-cart-message__heading'); }
  get shopWilsonButton() { return cy.get('.empty-cart-message__buttons a'); }

  // footer
  get footer() { return cy.get('footer'); }
  footerColumn(category: string) { return cy.get(`footer nav[data-menu-category="${category}"]`); } //'Our Company', 'Resources'...
  footerLink(category: string, name: string) { return cy.get(`footer a[aria-label="${category}: ${name}"]`); } //('Our Company', 'About Us')
  get chatOnlineButton() { return cy.get('.footer-need-help__chat-button'); }
  get contactUsButton() { return cy.get('.footer-need-help a[href*="help-center"]'); }

  // chat (окно чата Sierra, лежит в shadow DOM)
  get chatDialog() { return cy.get('[data-sierra-part="root"]'); }
  get chatTitle() { return cy.get('[data-sierra-part="header-title"]'); }
  get chatMessageInput() { return cy.get('[data-sierra-part="composer-input"]'); }

  //actions
  openAccount() { this.accountButton.click(); }
  openSearch() { this.searchButton.click(); }
  // без Enter: товары подгружаются прямо в окне поиска, без перехода на страницу результатов
  search(query: string) {
    this.openSearch();
    // ждём, пока окно поиска догрузится: иначе оно перерисовывает поле и первая буква теряется
    this.searchProductsLabel.should('have.text', 'Popular Products');
    this.searchInput.type(query);
  }
  openCart() { this.cartButton.click(); }
  openChatOnline() { this.chatOnlineButton.click(); }
  openAnnouncementChat() { this.announcementChatLink.click(); }
  openFirstPurchaseOffer() { this.firstPurchaseOfferLink.click(); }
  openFindStore() { this.findStoreLink.click(); }
  openContactUs() { this.contactUsButton.click(); }
  openFooterLink(category: string, name: string) { this.footerLink(category, name).click(); }
}
