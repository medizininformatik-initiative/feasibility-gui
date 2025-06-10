import { defineStep } from '@badeball/cypress-cucumber-preprocessor'

export class FilterChips {
  // 🔹 Get the criteria box element by its label text
  private getCriteriaBoxByLabel(criterium: string) {
    return cy.contains('num-criteria-stage .criteria-box *', criterium).closest('.criteria-box')
  }

  // 🔹 Assert the block name text
  private assertBlockName(expectedBlockName: string) {
    cy.get('.block')
      .invoke('text')
      .then((text) => {
        const normalized = text.replace(/\u00a0/g, '').trim()
        expect(normalized).to.eq(expectedBlockName)
      })
  }

  private assertChipVisible(chipName: string) {
    cy.get('.chip-container').contains(chipName).should('be.visible')
  }

  /**
   * Retrieves a filter chip by its block name and chip name within a specified criterium.
   * @param blockName
   * @param chipName
   * @param criterium
   */
  public getFilterChipByName(criterium: string, chipName: string, blockName: string) {
    this.getCriteriaBoxByLabel(criterium).within(() => {
      cy.get('num-filter-chips > [fxlayout="row wrap"]').within(() => {
        this.assertBlockName(blockName)
        this.assertChipVisible(chipName)
      })
    })
  }

  /**
   * Retrieves a filter chip block by its name within a specified criterium.
   * @param blockName
   * @param criterium
   */
  public getFilterChipBlock(criterium: string, blockName: string) {
    this.getCriteriaBoxByLabel(criterium).within(() => {
      cy.get('num-filter-chips > [fxlayout="row wrap"]').within(() => {
        this.assertBlockName(blockName)
      })
    })
  }
}

export const filterChips = new FilterChips()
defineStep(
  'I see the criterium {string} with filter chip block {string}',
  (criterium: string, blockName: string) => {
    filterChips.getFilterChipBlock(criterium, blockName)
  }
)

defineStep(
  'I see the criterium {string} with filter chip {string} in the block {string}',
  (criterium: string, chipName: string, blockName: string) => {
    filterChips.getFilterChipByName(criterium, chipName, blockName)
  }
)
