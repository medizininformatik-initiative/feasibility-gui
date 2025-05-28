describe('Fetch Token on Login', () => {
  it('logs in and retrieves the token', () => {
    // Step 1: Intercept the request that fetches the token
    cy.visit('http://localhost:4200')
    cy.wait(3000)
    cy.wait(3000)

    // Step 3: Fill in the login form
    cy.get('#username').type('test') // Replace with your app's username field ID or class
    cy.get('#password').type('test1') // Replace with your app's password field ID or class

    // Step 4: Submit the form to trigger the login
    cy.get('#kc-login').click()

    // Step 5: Wait for the token request to complete and log the access token
    cy.wait('@tokenRequest').then((interception) => {
      // Check if the response contains the access token
      expect(interception.response.statusCode).to.eq(200)
      const accessToken = interception.response.body.access_token
      expect(accessToken).to.exist

      console.log('Access Token:', accessToken)

      // Store the token in localStorage
      cy.window().then((window) => {
        window.localStorage.setItem('access_token', accessToken)
      })

      // Optional: Verify token storage
      cy.window().then((window) => {
        const storedToken = window.localStorage.getItem('access_token')
        expect(storedToken).to.equal(accessToken)
      })
    })
  })
})
