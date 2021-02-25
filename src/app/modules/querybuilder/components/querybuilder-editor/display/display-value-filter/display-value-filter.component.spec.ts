import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayValueFilterComponent } from './display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { Comparator, ValueFilter } from '../../../../model/api/query/valueFilter'

describe('DisplayValueFilterComponent', () => {
  let component: DisplayValueFilterComponent
  let fixture: ComponentFixture<DisplayValueFilterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayValueFilterComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayValueFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return short display for "<="', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.LESS_OR_EQUAL
    expect(component.getComparator()).toBe('<=')
  })

  it('should return short display for "<"', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.LESS_THAN
    expect(component.getComparator()).toBe('<')
  })

  it('should return short display for ">="', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.GREATER_OR_EQUAL
    expect(component.getComparator()).toBe('>=')
  })

  it('should return short display for ">"', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.GREATER_THAN
    expect(component.getComparator()).toBe('>')
  })

  it('should return short display for "="', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.EQUAL
    expect(component.getComparator()).toBe('=')
  })

  it('should return short display for "<>"', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = Comparator.NOT_EQUAL
    expect(component.getComparator()).toBe('<>')
  })

  it('should return short display as default', () => {
    component.filter = new ValueFilter()
    component.filter.comparator = undefined
    expect(component.getComparator()).toBe('##')
  })
})
