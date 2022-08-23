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
import { FeatureService } from '../../../../../../service/feature.service'
import { EditTimeRestrictionComponent } from '../edit-time-restriction/edit-time-restriction.component'
import { DisplayEntitiesComponent } from '../../display/display-entities/display-entities.component'
import { DisplayCriterionComponent } from '../../display/display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../../display/bool-logic-switch/bool-logic-switch.component'
import { DisplayValueFilterComponent } from '../../display/display-value-filter/display-value-filter.component'
import { DisplayTimeRestrictionComponent } from '../../display/display-time-restriction/display-time-restriction.component'
import { MatTooltipModule } from '@angular/material/tooltip'

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

  const featureService = {
    useFeatureTimeRestriction(): boolean {
      return true
    },
    getQueryVersion(): string {
      return 'v2'
    },
  } as FeatureService

  beforeEach(async () => {
    const testBedConfig = {
      declarations: [
        EnterCriterionListComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        MatInputNumberDirective,
        ButtonComponent,
        EditTimeRestrictionComponent,
        DisplayEntitiesComponent,
        DisplayCriterionComponent,
        BoolLogicSwitchComponent,
        DisplayValueFilterComponent,
        DisplayTimeRestrictionComponent,
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
        MatTooltipModule,
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
        { provide: FeatureService, useValue: featureService },
        { provide: QueryProviderService, useValue: providerService },
      ],
    }
    await TestBed.configureTestingModule(testBedConfig).compileComponents()
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
  })

  it('should create', () => {
    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should close dialog', () => {
    spyOn(matDialogRef, 'close')
    TestBed.overrideProvider(MatDialogRef, { useValue: matDialogRef })

    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    component.doDiscardAll()
    expect(matDialogRef.close).toBeCalledWith()
  })

  it('should discard criterion from list', () => {
    spyOn(matDialogRef, 'close')
    TestBed.overrideProvider(MatDialogRef, { useValue: matDialogRef })

    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    const criterion = new Criterion()
    component.criterionList = [new Criterion(), criterion, new Criterion()]

    component.doDiscard(criterion)

    expect(component.criterionList.length).toBe(2)
    expect(matDialogRef.close).not.toBeCalledWith()
  })

  it('should discard criterion from list', () => {
    spyOn(matDialogRef, 'close')
    TestBed.overrideProvider(MatDialogRef, { useValue: matDialogRef })

    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    const criterion = new Criterion()
    component.criterionList = [criterion]

    component.doDiscard(criterion)

    expect(component.criterionList.length).toBe(0)
    expect(matDialogRef.close).toBeCalledWith()
  })

  it('should store query in inclusion criteria and discard criterion from list', () => {
    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    const query = QueryProviderService.createDefaultQuery()
    const criterion = new Criterion()

    spyOn(component, 'doDiscard')
    spyOn(providerService, 'store')

    component.critType = 'inclusion'
    component.query = query
    component.criterionList = [criterion]

    component.doSave({ groupId: 1 }, criterion)

    expect(query.groups[0].inclusionCriteria.length).toBe(1)
    expect(query.groups[0].exclusionCriteria.length).toBe(0)
    expect(component.doDiscard).toBeCalledWith(criterion)
  })

  it('should store query in exclusion criteria and discard criterion from list', () => {
    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    const query = QueryProviderService.createDefaultQuery()
    const criterion = new Criterion()

    spyOn(component, 'doDiscard')
    spyOn(providerService, 'store')

    component.critType = 'exclusion'
    component.query = query
    component.criterionList = [criterion]
    component.provider = providerService

    component.doSave({ groupId: 1 }, criterion)

    expect(query.groups[0].inclusionCriteria.length).toBe(0)
    expect(query.groups[0].exclusionCriteria.length).toBe(1)
    expect(component.doDiscard).toBeCalledWith(criterion)
    expect(providerService.store).toBeCalledWith(query)
  })

  it('should not store query and and not discard criterion from list when groupId is invalid', () => {
    fixture = TestBed.createComponent(EnterCriterionListComponent)
    component = fixture.componentInstance
    component.criterionList = []
    fixture.detectChanges()

    const query = QueryProviderService.createDefaultQuery()
    const criterion = new Criterion()

    spyOn(component, 'doDiscard')
    spyOn(providerService, 'store')

    component.critType = 'exclusion'
    component.query = query
    component.criterionList = [criterion]

    component.doSave({ groupId: 1234 }, criterion)

    expect(query.groups[0].inclusionCriteria.length).toBe(0)
    expect(query.groups[0].exclusionCriteria.length).toBe(0)
    expect(component.doDiscard).not.toBeCalledWith(criterion)
    expect(providerService.store).not.toBeCalled()
  })
})
