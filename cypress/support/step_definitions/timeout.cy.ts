import { defineStep } from "@badeball/cypress-cucumber-preprocessor"

export class Timeout {
    public waitFor(seconds: number) {
        cy.wait(seconds * 1000, { log: true })
    }
}

export const timeout = new Timeout()
defineStep('I wait for {int} seconds', (seconds: number) => {
    timeout.waitFor(seconds)
})