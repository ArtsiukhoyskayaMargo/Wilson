import { BasePage } from './BasePage'

class HelpCenterPage extends BasePage {
  //elements
  get heading() { return cy.get('main h1'); }
  get quickActionLabels() { return cy.get('.category-columns__label'); } //Limited Warranty Request, Start A Return...
}

export const helpCenterPage = new HelpCenterPage()
