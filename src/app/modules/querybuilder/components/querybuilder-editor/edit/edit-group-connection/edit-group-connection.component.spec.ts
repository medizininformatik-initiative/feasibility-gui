import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditGroupConnectionComponent } from './edit-group-connection.component'

describe('EditGroupConnectionComponent', () => {
  let component: EditGroupConnectionComponent
  let fixture: ComponentFixture<EditGroupConnectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGroupConnectionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupConnectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
