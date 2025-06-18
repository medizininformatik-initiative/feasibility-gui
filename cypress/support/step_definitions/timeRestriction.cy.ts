import { defineStep } from '@badeball/cypress-cucumber-preprocessor'
import {
  TimeRestrictionFilterType,
  TimeRestrictionFilterTypeDE,
} from '../../e2e/Utilities/timeRestrictionFilter'
import { time } from 'console'

// Update the import path below if the file is located elsewhere
export class TimeRestriction {
  /**
   * Clicks the "Add Time Restriction" button.
   */
  public addTimeRestriction(
    date: string,
    type: TimeRestrictionFilterType | TimeRestrictionFilterTypeDE
  ) {
    cy.get('num-timerestriction-type-selector').click()
    cy.get('.mat-mdc-option').contains(type).click()
    cy.get('.mat-datepicker-input').clear().type(date).should('have.value', date)
  }
}
export const timeRestriction = new TimeRestriction()
defineStep('I set the time restriction filter to before with date {string}', (date: string) => {
  timeRestriction.addTimeRestriction(date, TimeRestrictionFilterType.Before)
})
defineStep('I set the time restriction filter to on with date {string}', (date: string) => {
  timeRestriction.addTimeRestriction(date, TimeRestrictionFilterType.On)
})
defineStep('I set the time restriction filter to after with date {string}', (date: string) => {
  timeRestriction.addTimeRestriction(date, TimeRestrictionFilterType.After)
})
defineStep('I set the time restriction filter to equal with date {string}', (date: string) => {})
defineStep(
  'I set the time restriction filter to between {string} and {string}',
  (startDate: string, endDate: string) => {}
)
