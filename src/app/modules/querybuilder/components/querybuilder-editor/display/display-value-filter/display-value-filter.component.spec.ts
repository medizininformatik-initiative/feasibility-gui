import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayValueFilterComponent } from './display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { Comparator, ValueFilter } from '../../../../model/api/query/valueFilter'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'

describe('DisplayValueFilterComponent', () => {
  let component: DisplayValueFilterComponent
  let fixture: ComponentFixture<DisplayValueFilterComponent>

  const featureService = {
    useFeatureShowDisplayValueFilterIcon: (): boolean => true,
  } as FeatureService

  const testBedConfig = {
    declarations: [DisplayValueFilterComponent],
    imports: [TranslateModule.forRoot(), FontAwesomeTestingModule, HttpClientTestingModule],
    providers: [
      {
        provide: FeatureService,
        useValue: featureService,
      },
    ],
  }

  describe('show display value filter icon', () => {
    beforeEach(async () => {
      jest.spyOn(featureService, 'useFeatureShowDisplayValueFilterIcon').mockReturnValue(true)
      await TestBed.configureTestingModule(testBedConfig).compileComponents()
    })

    beforeEach(() => {
      fixture = TestBed.createComponent(DisplayValueFilterComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should return an empty string instead of "<=" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.LESS_OR_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'less-than-equal', utf8: '' })
    })

    it('should return an empty string instead of "<" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.LESS_THAN
      expect(component.getComparator()).toEqual({ icon: 'less-than', utf8: '' })
    })

    it('should return an empty string instead of ">=" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.GREATER_OR_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'greater-than-equal', utf8: '' })
    })

    it('should return an empty string instead of ">" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.GREATER_THAN
      expect(component.getComparator()).toEqual({ icon: 'greater-than', utf8: '' })
    })

    it('should return an empty string instead of "=" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.EQUAL
      expect(component.getComparator()).toEqual({ icon: 'equals', utf8: '' })
    })

    it('should return an empty string instead of "<>" symbol', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.NOT_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'not-equal', utf8: '' })
    })

    it('should return short display as default', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = undefined
      expect(component.getComparator()).toEqual({ icon: '', utf8: '' })
    })
  })

  describe('do not show display value filter icon', () => {
    beforeEach(async () => {
      jest.spyOn(featureService, 'useFeatureShowDisplayValueFilterIcon').mockReturnValue(false)
      await TestBed.configureTestingModule(testBedConfig).compileComponents()
    })

    beforeEach(() => {
      fixture = TestBed.createComponent(DisplayValueFilterComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should return short display for "<="', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.LESS_OR_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'less-than-equal', utf8: '\u2264' })
    })

    it('should return short display for "<"', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.LESS_THAN
      expect(component.getComparator()).toEqual({ icon: 'less-than', utf8: '\u003c' })
    })

    it('should return short display for ">="', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.GREATER_OR_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'greater-than-equal', utf8: '\u2265' })
    })

    it('should return short display for ">"', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.GREATER_THAN
      expect(component.getComparator()).toEqual({ icon: 'greater-than', utf8: '\u003e' })
    })

    it('should return short display for "="', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.EQUAL
      expect(component.getComparator()).toEqual({ icon: 'equals', utf8: '\u003d' })
    })

    it('should return short display for "<>"', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = Comparator.NOT_EQUAL
      expect(component.getComparator()).toEqual({ icon: 'not-equal', utf8: '\u2260' })
    })

    it('should return short display as default', () => {
      component.filter = new ValueFilter()
      component.filter.comparator = undefined
      expect(component.getComparator()).toEqual({ icon: '', utf8: '' })
    })
  })
})
