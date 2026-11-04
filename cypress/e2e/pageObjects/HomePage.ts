import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  //elements
  get heroBanner() { return cy.get('[data-testid="hero-banner-media"]'); }
  
  //actions
  open() { cy.visit('/'); }
}
