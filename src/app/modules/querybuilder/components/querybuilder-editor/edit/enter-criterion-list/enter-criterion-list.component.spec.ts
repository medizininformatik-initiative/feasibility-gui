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

describe('EnterCriterionListComponent', () => {
  let component: EnterCriterionListComponent
  let fixture: ComponentFixture<EnterCriterionListComponent>

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
        { provide: MatDialogRef, useValue: {} },
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
})
