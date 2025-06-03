/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<void>
  }
}

Cypress.Commands.add('login', () => {
  cy.session('login-session', () => {
    cy.visit('home')
    cy.wait(1000)
    cy.origin(Cypress.env('redirectUrl'), () => {
      cy.get('input[name=username]').type(Cypress.env('username'))
      cy.get('input[name=password]').type(Cypress.env('password'))
      cy.get('#kc-login').click()
    })

    cy.url({ timeout: 250000 }).should('include', Cypress.env('homeUrl'))
  })
})
