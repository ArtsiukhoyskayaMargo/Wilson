import { BasePage } from './BasePage'

class HomePage extends BasePage {
  //elements
  get heroBanner() { return cy.get('[data-testid="hero-banner-media"]'); }

  //actions
  open() { cy.visit('/'); }
}

export const homePage = new HomePage()
