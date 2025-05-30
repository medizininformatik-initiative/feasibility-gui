export const loginTests = () => {
  it('logs in with valid credentials', () => {
    cy.login();
  })
};
