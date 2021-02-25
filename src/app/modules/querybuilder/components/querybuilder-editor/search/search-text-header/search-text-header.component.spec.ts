import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchTextHeaderComponent } from './search-text-header.component'
import { TranslateModule } from '@ngx-translate/core'

describe('SearchTextHeaderComponent', () => {
  let component: SearchTextHeaderComponent
  let fixture: ComponentFixture<SearchTextHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTextHeaderComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fire addEvent with id 4711', () => {
    spyOn(component.switchCategory, 'emit')

    component.fireSwitchCategory('4711')

    expect(component.switchCategory.emit).toHaveBeenCalledWith('4711')
    expect(component.selectedId).toBe('4711')
  })
})
