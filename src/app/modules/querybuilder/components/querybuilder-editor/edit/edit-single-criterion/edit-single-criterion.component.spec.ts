import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditSingleCriterionComponent } from './edit-single-criterion.component'
import { EditCriterionComponent } from '../edit-criterion/edit-criterion.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'
import { OperatorOptions } from '../../../../model/api/query/valueFilter'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'
import { TerminologyCode, TerminologyEntry } from '../../../../model/api/terminology/terminology'

describe('EditSingleCriterionComponent', () => {
  let component: EditSingleCriterionComponent
  let fixture: ComponentFixture<EditSingleCriterionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditSingleCriterionComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        ButtonComponent,
        MatInputNumberDirective,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        MaterialModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            query: new Query(),
            criterion: new Criterion(),
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleCriterionComponent)
    component = fixture.componentInstance

    const criterion = new Criterion()
    criterion.valueFilter = {
      precision: 1,
      type: OperatorOptions.CONCEPT,
      selectedConcepts: [],
    }
    const termCode: TerminologyCode = {
      code: 'a',
      system: 'http://test',
      display: 'none',
    }

    const termEntry = new TerminologyEntry()
    termEntry.valueDefinition = {
      type: ValueType.CONCEPT,
      precision: 1,
    }

    criterion.termCode = termCode
    criterion.termEntry = termEntry
    component.criterion = criterion

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
