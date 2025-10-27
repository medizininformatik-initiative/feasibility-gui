import { defineStep } from "@badeball/cypress-cucumber-preprocessor";

export class Login {

  public constructor() {}

  public visitLoginPage() {
    cy.visit('home');
    cy.wait(1000);
  }

  public login() {
    cy.login();
  }
}


let login = new Login();
defineStep('I go to the login page', () => login.visitLoginPage())
defineStep('I fill in the login form with valid credentials', () => login.login())
defineStep('I am logged in as a user', () => {
  login.visitLoginPage();
  login.login();
});
