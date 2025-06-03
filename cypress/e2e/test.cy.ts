let selectedCriteria:number = 0
let addedCriteria:number = 0

export const gotoAndCheckCohortSelectionSearch = () => {
  cy.get('num-table tbody > tr').should('have.length', 50)
  /*cy.get('num-search-action-bar button').each((button) => cy.wrap(button).should('have.class', 'disabled'))
  cy.get('num-search-action-bar num-button > span.mat-badge-content').each((button) => cy.wrap(button).should('have.text', 0))*/
  checkButtons()
}
function gotoAndCheckCohortSelectionEdit() {
  cy.get('num-search-action-bar button').eq(1).click()
}
function checkButtons() {
  [selectedCriteria,addedCriteria].forEach((value, index) => {
    cy.get('num-search-action-bar button').eq(index).then((button) => {
      if(value > 0) {
        cy.wrap(button).should('not.have.class', 'disabled')
      } else {
        cy.wrap(button).should('have.class', 'disabled')
      }
    })
    cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(index).should('have.text', value)
  })
}

export function selectCriterion(indices: number[]) {
  indices.forEach((index) => {
    cy.get('num-table tbody > tr').eq(index).within(() => {
      cy.get('mat-checkbox').click()
    })
  })
  selectedCriteria += indices.length
  cy.wait(1000)
  /*cy.get('num-search-action-bar button').eq(0).should('not.have.class', 'disabled')
  cy.get('num-search-action-bar button').eq(1).should('have.class', 'disabled')
  cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(0).should('have.text', indices.length)
  cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(1).should('have.text', 0)*/
  checkButtons()
}
function deselectCriterion(indices: number[]) {
  indices.forEach((index) => {
    cy.get('num-table tbody > tr').eq(index).within(() => {
      cy.get('mat-checkbox').click()
    })
  })
  selectedCriteria -= indices.length
  cy.wait(1000)
  /*cy.get('num-search-action-bar button').each((button) => cy.wrap(button).should('have.class', 'disabled'))
  cy.get('num-search-action-bar num-button > span.mat-badge-content').each((button) => cy.wrap(button).should('have.text', 0))*/
  checkButtons()
}
function addCriteria() {
  cy.get('num-search-action-bar button').eq(0).click()
  addedCriteria += selectedCriteria
  selectedCriteria = 0
  /*cy.get('num-search-action-bar button').eq(0).should('have.class', 'disabled')
  cy.get('num-search-action-bar button').eq(1).should('not.have.class', 'disabled')
  cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(0).should('have.text', 0)
  cy.get('num-search-action-bar num-button > span.mat-badge-content').eq(1).should('have.text', 2)*/
  checkButtons()
}
export function searchInput(text: string) {
  cy.get('num-searchbar input').clear().type(text)
  cy.wait(1000)
}
function checkStage() {
  cy.get('num-criteria-stage .criteria-box').should('have.length', addedCriteria)
}
function editGender() {
  cy.get('num-criteria-stage .criteria-box').eq(3).within(() => {
    cy.get('num-menu > num-button').click()
  })
  //cy.wait(1000)
  cy.get('.mat-mdc-menu-panel button').eq(3).click()
}
/*describe('test', () => {
  it('test', () => {
    cy.login()
    gotoAndCheckCohortSelectionSearch()
    selectCriterion([1, 2])
    deselectCriterion([1,2])
    selectCriterion([1, 2])
    addCriteria()
    searchInput('geschlecht')
    selectCriterion([0])
    addCriteria()
    searchInput('chronologisches alter')
    selectCriterion([0])
    addCriteria()
    gotoAndCheckCohortSelectionEdit()
    checkStage()
    editGender()
  })
})*/
