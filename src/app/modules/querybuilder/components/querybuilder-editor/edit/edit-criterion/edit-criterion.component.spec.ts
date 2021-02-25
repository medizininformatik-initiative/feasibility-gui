import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditCriterionComponent } from './edit-criterion.component'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Criterion } from '../../../../model/api/query/criterion'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

const termEntryWithoutFilter: TerminologyEntry = {
  termCode: {
    code: 'I00',
    system: 'http://test',
    display: 'No Value Filter',
  },
  selected: false,
  children: [],
  leaf: true,
  selectable: true,
  id: 'A1',
  timeRestrictionAllowed: true,
}

const criterion = new Criterion()
criterion.termCode = { code: 'A', system: 'http://test', display: 'Some Code' }
criterion.termEntry = termEntryWithoutFilter // new TermEntry2CriterionTranslator().translate(new MockBackendDataProvider().getTerminologyEntry('id'))

describe('EditCriterionComponent', () => {
  let component: EditCriterionComponent
  let fixture: ComponentFixture<EditCriterionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditCriterionComponent,
        EditValueFilterComponent,
        MatInputNumberDirective,
        ButtonComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriterionComponent)
    component = fixture.componentInstance
    component.criterion = criterion

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
