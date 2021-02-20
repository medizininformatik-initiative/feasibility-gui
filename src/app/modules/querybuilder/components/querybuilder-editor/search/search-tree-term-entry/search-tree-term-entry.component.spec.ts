import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchTreeTermEntryComponent } from './search-tree-term-entry.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule } from '@angular/forms'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { CdkTree, CdkTreeNode } from '@angular/cdk/tree'
import { ChangeDetectorRef, ElementRef } from '@angular/core'

describe('SearchInputTermEntryComponent', () => {
  let component: SearchTreeTermEntryComponent
  let fixture: ComponentFixture<SearchTreeTermEntryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeTermEntryComponent],
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
    fixture = TestBed.createComponent(SearchTreeTermEntryComponent)
    component = fixture.componentInstance
    component.node = new TerminologyEntry()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

class MockElementRef {}
