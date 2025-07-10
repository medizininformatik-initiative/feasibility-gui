let selectedCriteria:number = 0
let addedCriteria:number = 0

export function gotoAndCheckCohortSelectionSearch() {
  cy.visit('feasibility-query/search')
  cy.wait(1000)
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

function selectCheckbox(indices: number[]) {
  indices.forEach((index) => {
    cy.get('num-table tbody > tr').eq(index).within(() => {
      cy.get('mat-checkbox').click()
    })
  })
}
export function selectCriterion(indices: number[]) {
  selectCheckbox(indices)
  selectedCriteria += indices.length
  cy.wait(1000)
  checkButtons()
}
function deselectCriterion(indices: number[]) {
  selectCheckbox(indices)
  selectedCriteria -= indices.length
  cy.wait(1000)
  /*cy.get('num-search-action-bar button').each((button) => cy.wrap(button).should('have.class', 'disabled'))
  cy.get('num-search-action-bar num-button > span.mat-badge-content').each((button) => cy.wrap(button).should('have.text', 0))*/
  checkButtons()
}
function selectFilter(filterIndex: number, optionIndex: number) {
  cy.get('num-search-filter').eq(filterIndex).click()
  cy.get('num-search-filter mat-select').eq(filterIndex).invoke('attr', 'id').then((id) => {
    cy.get('@root').find('#' + id + '-panel').find('.mat-mdc-option').eq(optionIndex).click()
  })
  //cy.get('num-search-filter').eq(filterIndex).click({force:true})
}
function selectOption(element: string, optionIndex: number) {
    cy.get(element).click()
    cy.get(element + ' mat-select').invoke('attr', 'id').then((id) => {
      cy.get('@root').find('#' + id + '-panel').find('.mat-mdc-option').eq(optionIndex).click()
    })
}
export function addCriteria() {
  cy.get('num-search-action-bar button').eq(1).click()
  addedCriteria += selectedCriteria
  selectedCriteria = 0
  checkButtons()
}
export function searchInput(text: string) {
  cy.get('num-searchbar input').clear().type(text)
  cy.wait(1000)
}
function checkStage() {
  cy.get('num-criteria-stage .criteria-box').should('have.length', addedCriteria)
}
function selectGender() {
  searchInput('geschlecht')
  selectCriterion([0])
  addCriteria()
}
function editGender() {
  cy.get('num-criteria-stage .criteria-box').eq(2).within(() => {
    cy.get('num-menu > num-button').click()
  })
  cy.get('.mat-mdc-menu-panel button').eq(3).click()
  cy.get('num-edit-criterion-modal').within(() => {
    cy.get('num-value-filter').within(() => {
      //cy.get('num-concept').within(() => {
      cy.get('mat-expansion-panel-header').click()
      selectCheckbox([1,2])
      cy.get('num-button.add-button').click()
      cy.get('num-staged-concepts .selected-filter-box > .selected-filter-element').should('have.length', 2)
      })
    // })
    cy.get('num-button.select-button').eq(0).click()
  })
}
function selectAge() {
  searchInput('chronologisches alter')
  selectCriterion([0])
  addCriteria()
}
function editAge() {
  cy.get('body').as('root');
  cy.get('num-criteria-stage .criteria-box').eq(3).within(() => {
    cy.get('num-menu > num-button').click()
  })
  cy.get('.mat-mdc-menu-panel button').eq(3).click()
  cy.get('num-edit-criterion-modal').within(() => {
    cy.get('num-value-filter').within(() => {
      //cy.get('num-concept').within(() => {
      cy.get('mat-expansion-panel-header').click()
      selectOption('num-quantity-comparision-select', 2)
      cy.get('num-quantity-comparator input').clear({force: true}).type('5')
      selectOption('num-allowed-units', 2)
    })
    // })
    cy.get('num-button.select-button').eq(0).click()
  })
}
function selectAmbulant() {
  cy.get('body').as('root');
  selectFilter(0, 8)
  searchInput('ambulant')
  selectCriterion([2])
  addCriteria()
}
/* describe('test', () => {
  it('test', () => {
    cy.login()
    gotoAndCheckCohortSelectionSearch()
    selectCriterion([1, 2])
    //deselectCriterion([1,2])
    //selectCriterion([1, 2])
    addCriteria()
    selectGender()
    selectAge()
    selectAmbulant()
    gotoAndCheckCohortSelectionEdit()
    checkStage()
    editGender()
    editAge()
  })
})
 */