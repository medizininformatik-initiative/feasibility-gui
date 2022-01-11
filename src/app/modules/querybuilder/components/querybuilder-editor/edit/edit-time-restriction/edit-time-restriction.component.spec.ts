import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditTimeRestrictionComponent } from './edit-time-restriction.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

describe('EditTimeRestrictionComponent', () => {
  let component: EditTimeRestrictionComponent
  let fixture: ComponentFixture<EditTimeRestrictionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTimeRestrictionComponent],
      imports: [MaterialModule, FormsModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeRestrictionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
