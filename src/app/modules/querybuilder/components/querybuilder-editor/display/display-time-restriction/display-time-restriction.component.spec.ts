import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayTimeRestrictionComponent } from './display-time-restriction.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { TranslateModule } from '@ngx-translate/core'
import { TimeRestrictionType } from '../../../../model/api/query/timerestriction'

describe('DisplayTimeRestrictionComponent', () => {
  let component: DisplayTimeRestrictionComponent
  let fixture: ComponentFixture<DisplayTimeRestrictionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayTimeRestrictionComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTimeRestrictionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should format to empty string', () => {
    expect(component.getDateFormatted(null)).toBe('')
  })

  it('should format to date string', () => {
    expect(component.getDateFormatted(new Date('3/13/2020'))).toBe('13.03.2020')
  })
})
