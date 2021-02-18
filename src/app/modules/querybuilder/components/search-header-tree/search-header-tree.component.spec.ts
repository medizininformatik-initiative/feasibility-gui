import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderTreeComponent } from './search-header-tree.component'

describe('SearchHeaderTreeComponent', () => {
  let component: SearchHeaderTreeComponent
  let fixture: ComponentFixture<SearchHeaderTreeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHeaderTreeComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderTreeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fire addEvent with true', () => {
    spyOn(component.switchCategory, 'emit')

    component.fireSwitchCategory('4711')

    expect(component.switchCategory.emit).toHaveBeenCalledWith('4711')
  })
})
