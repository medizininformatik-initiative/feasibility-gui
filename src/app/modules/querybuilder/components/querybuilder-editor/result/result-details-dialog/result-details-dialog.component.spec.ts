import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResultDetailsDialogComponent } from './result-details-dialog.component'

describe('ResultDetailsDialogComponent', () => {
  let component: ResultDetailsDialogComponent
  let fixture: ComponentFixture<ResultDetailsDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultDetailsDialogComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
