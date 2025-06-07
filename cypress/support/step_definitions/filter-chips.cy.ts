export class FilterChips {
  public getFilterChipBlock(blockName: string) {
    cy.get('num-criteria-stage .criteria-box').within(() => {
      cy.get('num-filter-chips > [fxlayout="row wrap"]').within(() => {
        cy.get('.block')
          .invoke('text')
          .then((text) => {
            expect(text.replace(/\u00a0/g, '').trim()).to.eq(blockName)
          })
      })
    })
  }

  public getFilterChipByName(blockName: string, chipName: string) {
    cy.get('num-criteria-stage .criteria-box').within(() => {
      cy.get('num-filter-chips > [fxlayout="row wrap"]').within(() => {
        cy.get('.block')
          .invoke('text')
          .then((text) => {
            expect(text.replace(/\u00a0/g, '').trim()).to.eq(blockName)
            cy.get('.chip-container').contains(chipName)
          })
      })
    })
  }
}
