import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchInputTermEntryComponent } from './search-input-term-entry.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { CdkTree, CdkTreeNode } from '@angular/cdk/tree'
import { ChangeDetectorRef, ElementRef } from '@angular/core'

describe('SearchInputTermEntryComponent', () => {
  let component: SearchInputTermEntryComponent
  let fixture: ComponentFixture<SearchInputTermEntryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputTermEntryComponent],
      imports: [MaterialModule, FormsModule],
      providers: [
        CdkTree,
        CdkTreeNode,
        ChangeDetectorRef,
        { provide: ElementRef, useClass: MockElementRef },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputTermEntryComponent)
    component = fixture.componentInstance
    component.node = new TerminologyEntry()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

class MockElementRef {}
