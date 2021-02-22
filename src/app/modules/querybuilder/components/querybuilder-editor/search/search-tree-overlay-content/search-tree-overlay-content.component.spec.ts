import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchTreeOverlayContentComponent } from './search-tree-overlay-content.component'
import { SearchTreeHeaderComponent } from '../search-tree-header/search-tree-header.component'
import { SearchTreeFooterComponent } from '../search-tree-footer/search-tree-footer.component'
import { SearchTreeTermEntryComponent } from '../search-tree-term-entry/search-tree-term-entry.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { ComponentType, OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { BackendService } from '../../../../service/backend.service'
import { Observable, of } from 'rxjs'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { EventEmitter, TemplateRef } from '@angular/core'
import { EnterCriterionListComponent } from '../../edit/enter-criterion-list/enter-criterion-list.component'
import { EditCriterionComponent } from '../../edit/edit-criterion/edit-criterion.component'
import { EditValueFilterComponent } from '../../edit/edit-value-filter/edit-value-filter.component'
import { MatInputNumberDirective } from '../../edit/mat-input-number.directive'

describe('SearchOverlayTreeComponent', () => {
  let component: SearchTreeOverlayContentComponent
  let fixture: ComponentFixture<SearchTreeOverlayContentComponent>

  function createTermEntry(code: string, selected: boolean): TerminologyEntry {
    const termEntry = new TerminologyEntry()
    termEntry.id = code
    termEntry.termCode.code = code
    termEntry.selected = selected
    termEntry.leaf = false
    return termEntry
  }

  const termEntry1 = createTermEntry('1', false)
  const termEntry1a = createTermEntry('1a', true)
  termEntry1.children = [termEntry1a]

  const termEntry2 = createTermEntry('2', true)
  const termEntry2WithoutChildren = createTermEntry('2', true)
  const termEntry2a = createTermEntry('2a', false)
  const termEntry2b = createTermEntry('2b', true)
  const termEntry2c = createTermEntry('2c', false)
  termEntry2.children = [termEntry2a, termEntry2b, termEntry2c]
  termEntry2a.leaf = true

  const termEntriesSelected = [termEntry1a, termEntry2WithoutChildren, termEntry2b]

  let backendService
  let dialog
  let closeOverlay

  beforeEach(async () => {
    backendService = {
      getCategories(): Observable<Array<CategoryEntry>> {
        return of([new CategoryEntry()])
      },
      getTerminolgyTree(id: string): Observable<TerminologyEntry> {
        switch (id) {
          case '1':
            return of(termEntry1)
          case '2':
            return of(termEntry2)
          default:
            return of(undefined)
        }
      },
    } as BackendService

    // noinspection JSUnusedLocalSymbols
    dialog = {
      open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>
      ): MatDialogRef<T, R> {
        return {} as MatDialogRef<any>
      },
    } as MatDialog

    closeOverlay = {
      emit(): void {
        return
      },
    } as EventEmitter<void>

    await TestBed.configureTestingModule({
      declarations: [
        SearchTreeOverlayContentComponent,
        SearchTreeHeaderComponent,
        SearchTreeFooterComponent,
        SearchTreeTermEntryComponent,
        ButtonComponent,
        EnterCriterionListComponent,
        EditCriterionComponent,
        EditValueFilterComponent,
        MatInputNumberDirective,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: BackendService,
          useValue: backendService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    // noinspection JSUnusedLocalSymbols
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })

    fixture = TestBed.createComponent(SearchTreeOverlayContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    jest.spyOn(backendService, 'getCategories').mockReturnValue(of([new CategoryEntry()]))

    expect(component).toBeTruthy()
  })

  describe('handle dialog', () => {
    it('should open dialog', () => {
      jest.spyOn(dialog, 'open')
      component.dialog = dialog

      jest.spyOn(closeOverlay, 'emit')
      component.closeOverlay = closeOverlay

      component.cachedTrees.set('1', termEntry1)
      component.cachedTrees.set('2', termEntry2)

      component.openDetailsPopUp(true)

      const expectedDialogConfig = new MatDialogConfig()
      expectedDialogConfig.autoFocus = true
      expectedDialogConfig.disableClose = true
      expectedDialogConfig.data = {
        termEntryList: termEntriesSelected,
        groupIndex: 0,
        critType: undefined,
      }

      expect(dialog.open).toBeCalledWith(EnterCriterionListComponent, expectedDialogConfig)
      expect(closeOverlay.emit).toBeCalled()
    })

    it('should not open dialog for value false', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({} as MatDialogRef<any>)
      component.dialog = dialog

      jest.spyOn(closeOverlay, 'emit')
      component.closeOverlay = closeOverlay

      component.cachedTrees.set('1', termEntry1)
      component.cachedTrees.set('2', termEntry2)

      component.openDetailsPopUp(false)

      expect(dialog.open).not.toBeCalledWith(EnterCriterionListComponent, {
        data: termEntriesSelected,
      })
      expect(closeOverlay.emit).toBeCalled()
    })

    it('should not open dialog for non-selected terminology entries', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({} as MatDialogRef<any>)
      component.dialog = dialog

      jest.spyOn(closeOverlay, 'emit')
      component.closeOverlay = closeOverlay

      component.openDetailsPopUp(true)

      expect(dialog.open).not.toBeCalledWith(EnterCriterionListComponent, {
        data: termEntriesSelected,
      })
      expect(closeOverlay.emit).toBeCalled()
    })
  })

  describe('extraction of selected terminology entries', () => {
    it('should extract three selected terminology entries', () => {
      jest.spyOn(backendService, 'getCategories').mockReturnValue(of([new CategoryEntry()]))

      component.cachedTrees.set('1', termEntry1)
      component.cachedTrees.set('2', termEntry2)

      const actual = component.extractSelectedEntries()

      expect(actual).toEqual(termEntriesSelected)
    })
  })

  describe('readTreeData', () => {
    it('should skip reading data for identical ids', () => {
      component.catId = '13'

      component.readTreeData('13')

      expect(component.cachedTrees.size).toBe(0)
      expect(component.dataSource.data).toEqual([])
    })

    it('should read from cache', () => {
      component.catId = '13'
      component.cachedTrees.set('1', termEntry1)

      component.readTreeData('1')

      expect(component.cachedTrees.size).toBe(1)
      expect(component.dataSource.data).toEqual([termEntry1])
    })

    it('should read from server', () => {
      component.catId = '13'
      component.cachedTrees.set('2', termEntry2)

      component.readTreeData('1')

      expect(component.cachedTrees.size).toBe(2)
      expect(component.dataSource.data).toEqual([termEntry1])
    })
  })

  describe('getChildren', () => {
    it('should return empty list for leaf', () => {
      component.getChildren(termEntry2a).subscribe((value) => expect(value).toEqual([]))
    })

    it('should return list from terminology entry', () => {
      component
        .getChildren(termEntry2)
        .subscribe((value) => expect(value).toEqual([termEntry2a, termEntry2b, termEntry2c]))
    })

    it('should retrieve child nodes from backend service', () => {
      component
        .getChildren(termEntry2WithoutChildren)
        .subscribe((value) => expect(value).toEqual([termEntry2a, termEntry2b, termEntry2c]))
    })
  })
})
