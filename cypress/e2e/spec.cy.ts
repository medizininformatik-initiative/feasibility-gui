describe('Fetch Token on Login', () => {
  it('logs in and retrieves the token', () => {
    // Step 1: Intercept the request that fetches the token
    cy.intercept('POST', 'http://localhost:8080/realms/feasibility/protocol/openid-connect/token').as('tokenRequest');

    // Step 2: Visit the page that triggers the login flow
    cy.visit('http://localhost:4200/data-query/cohort-definition'); // Page where you log in

    // Step 3: Fill in the login form
    cy.get('#username').type('test'); // Adjust for your form's field names
    cy.get('#password').type('test1');
    
    // Step 4: Submit the form to trigger the login
    cy.get('#kc-login').click()

    // Step 5: Wait for the token request to complete
    cy.wait('@tokenRequest').then((interception) => {
      // Step 6: Extract the access token from the response
      const accessToken = interception.response.body.access_token;

      // Step 7: Store the token in localStorage or cookies for later use
      cy.window().then((window) => {
        window.localStorage.setItem('access_token', accessToken);
      });

      // Optional: Verify that the token is stored correctly
      cy.window().then((window) => {
        expect(window.localStorage.getItem('access_token')).to.equal(accessToken);
      });
      cy.get('button').each(($el) => {
        cy.log($el.text().trim())
        if ($el.text().trim() === 'Neue Kohorte') {
          cy.wrap($el).click({ force: true }) // Click the matching button
        }
      })
    });
    cy.wait(5000)
  });

});



