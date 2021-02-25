import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EnterCriterionListComponent } from './enter-criterion-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { EditCriterionComponent } from '../edit-criterion/edit-criterion.component'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'

describe('EnterCriterionListComponent', () => {
  let component: EnterCriterionListComponent
  let fixture: ComponentFixture<EnterCriterionListComponent>
  const matDialogRef = {
    close: () => {},
  } as MatDialogRef<EnterCriterionListComponent>
  // noinspection JSUnusedLocalSymbols
  const providerService = {
    store(query: Query): void {},
    query(): Query {
      return undefined
    },
  } as QueryProviderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EnterCriterionListComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        MatInputNumberDirective,
        ButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        OverlayModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            termEntryList: [new TerminologyEntry()],
            critType: 'inclusion',
            groupIndex: 0,
          },
        },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: QueryProviderService, useValue: providerService },
      ],
    }).compileComponents()
  })
  beforeEach(() => {
    // noinspection JSUnusedLocalSymbols
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })

    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should close dialog', () => {
    spyOn(matDialogRef, 'close')
    component.dialogRef = matDialogRef
    component.doDiscardAll()
    expect(matDialogRef.close).toBeCalledWith()
  })

  it('should discard criterion from list', () => {
    spyOn(matDialogRef, 'close')
    component.dialogRef = matDialogRef

    const criterion = new Criterion()
    component.criterionList = [new Criterion(), criterion, new Criterion()]

    component.doDiscard(criterion)

    expect(component.criterionList.length).toBe(2)
    expect(matDialogRef.close).not.toBeCalledWith()
  })

  it('should discard criterion from list', () => {
    spyOn(matDialogRef, 'close')
    component.dialogRef = matDialogRef

    const criterion = new Criterion()
    component.criterionList = [criterion]

    component.doDiscard(criterion)

    expect(component.criterionList.length).toBe(0)
    expect(matDialogRef.close).toBeCalledWith()
  })

  it('should store query in inclusion criteria and discard criterion from list', () => {
    const query = new Query()
    const criterion = new Criterion()

    spyOn(component, 'doDiscard')
    jest.spyOn(providerService, 'query').mockReturnValue(query)
    spyOn(providerService, 'store')

    component.critType = 'inclusion'
    component.provider = providerService
    component.dialogRef = matDialogRef
    component.criterionList = [criterion]

    component.doSave(criterion)

    expect(query.groups[0].inclusionCriteria.length).toBe(1)
    expect(query.groups[0].exclusionCriteria.length).toBe(0)
    expect(component.doDiscard).toBeCalledWith(criterion)
  })

  it('should store query in exclusion criteria and discard criterion from list', () => {
    const query = new Query()
    const criterion = new Criterion()

    spyOn(component, 'doDiscard')
    jest.spyOn(providerService, 'query').mockReturnValue(query)
    spyOn(providerService, 'store')

    component.critType = 'exclusion'
    component.provider = providerService
    component.dialogRef = matDialogRef
    component.criterionList = [criterion]

    component.doSave(criterion)

    expect(query.groups[0].inclusionCriteria.length).toBe(0)
    expect(query.groups[0].exclusionCriteria.length).toBe(1)
    expect(component.doDiscard).toBeCalledWith(criterion)
  })
})
