import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { MaterialModule } from '../../../../../../layout/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { SearchTreeOverlayContentComponent } from '../search-tree-overlay-content/search-tree-overlay-content.component';
import { SearchTreeHeaderComponent } from '../search-tree-header/search-tree-header.component';
import { SearchTreeFooterComponent } from '../search-tree-footer/search-tree-footer.component';
import { SearchTreeTermEntryComponent } from '../search-tree-term-entry/search-tree-term-entry.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology';
import { BackendService } from '../../../../service/backend.service';
import { SearchTextHeaderComponent } from '../search-text-header/search-text-header.component';
import { SearchTextOverlayContentComponent } from '../search-text-overlay-content/search-text-overlay-content.component';
import { MockBackendDataProvider } from '../../../../service/MockBackendDataProvider';
import { SearchTextTermEntryComponent } from '../search-text-term-entry/search-text-term-entry.component';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { cold } from 'jasmine-marbles';
import { EventEmitter } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('SearchInputComponent', () => {
  const testBedConfig = {
    declarations: [
      SearchInputComponent,
      SearchTreeOverlayContentComponent,
      SearchTextOverlayContentComponent,
      SearchTextHeaderComponent,
      SearchTextTermEntryComponent,
      SearchTreeHeaderComponent,
      SearchTreeFooterComponent,
      SearchTreeTermEntryComponent,
      ButtonComponent,
    ],
    imports: [
      BrowserAnimationsModule,
      HttpClientTestingModule,
      MaterialModule,
      OverlayModule,
      FormsModule,
      FlexLayoutModule,
      FontAwesomeTestingModule,
      TranslateModule.forRoot(),
      MatTooltipModule,
    ],
  };

  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    // Workaround: see https://github.com/telerik/kendo-angular/issues/1505
    // noinspection JSUnusedLocalSymbols
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => '',
      }),
    });
  });

  describe('default TestBed', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open overlay', () => {
      component.isOverlayOpen = false;

      // trigger the click
      const nativeElement = fixture.nativeElement;
      const button = nativeElement.querySelector('.button-tree-view');
      button.dispatchEvent(new Event('click'));

      expect(component.isOverlayOpen).toBe(true);
    });

    it('should open overlay for designated searchMode = "tree"', () => {
      component.searchMode = 'text';
      component.search = '';
      component.isOverlayOpen = false;

      component.switchSearchMode();

      expect(component.searchMode).toBe('tree');
      expect(component.isOverlayOpen).toBe(true);
    });

    it('should open overlay for designated searchMode = "text" with search text', () => {
      component.searchMode = 'tree';
      component.search = 'abc';

      component.switchSearchMode();

      expect(component.searchMode).toBe('text');
      expect(component.isOverlayOpen).toBe(true);
    });

    it('should close overlay for designated searchMode = "text" without search text', () => {
      component.searchMode = 'tree';
      component.search = '';

      component.switchSearchMode();

      expect(component.searchMode).toBe('text');
      expect(component.isOverlayOpen).toBe(false);
    });

    it('should delete search text', () => {
      component.search = 'abc';
      component.isOverlayOpen = true;

      component.closeOverlay('text');

      expect(component.search).toBe('');
      expect(component.isOverlayOpen).toBe(false);
      expect(component.searchMode).toBe('text');
    });

    it('should not delete search text', () => {
      component.search = 'abc';
      component.isOverlayOpen = true;

      component.closeOverlay('tree');

      expect(component.search).toBe('abc');
      expect(component.isOverlayOpen).toBe(false);
      expect(component.searchMode).toBe('text');
    });

    it('should initialize position on the right ("inclusion")', () => {
      component.critType = 'inclusion';
      component.initPositionStrategy();

      expect(component.positions).toEqual([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);
    });

    it('should initialize position on the right ("exclusion")', () => {
      component.critType = 'exclusion';
      component.initPositionStrategy();

      expect(component.positions).toEqual([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);
    });
  });

  describe('special TestBeds', () => {
    it('should close overlay on button click', () => {
      const backendService = {
        getCategories: (): Observable<Array<CategoryEntry>> => of([new CategoryEntry()]),
        getTerminolgyEntrySearchResult: (
          catId: string,
          search: string
        ): Observable<Array<TerminologyEntry>> =>
          of(new MockBackendDataProvider().getTerminolgyEntrySearchResult(catId, search)),
      } as BackendService;

      TestBed.overrideProvider(BackendService, { useValue: backendService });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // open overlay panel
      component.isOverlayOpen = true;
      fixture.detectChanges();

      // trigger the click
      const overlayContent = document.querySelector(
        '.cdk-overlay-container num-search-text-overlay-content'
      );
      overlayContent.dispatchEvent(new Event('closeOverlay'));

      expect(component.isOverlayOpen).toBe(false);
    });

    // noinspection JSUnusedLocalSymbols
    const focusMonitor = {
      monitor: (element: HTMLElement, checkChildren?: boolean): Observable<FocusOrigin> =>
        of({} as FocusOrigin),
      stopMonitoring: (element: HTMLElement): void => {},
    } as FocusMonitor;

    it('overlay should remain closed when input field is not focused', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'INPUT':
            return cold('^---|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;

      component.searchMode = 'tree';
      component.isOverlayOpen = false;

      fixture.detectChanges();

      expect(component.focusInputField$).toBeObservable(cold('^---|', { a: true }));
      expect(component.searchMode).toBe('tree');
      expect(component.isOverlayOpen).toBe(false);
    });

    it('should open overlay when input field is focused', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'INPUT':
            return cold('^-o-|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;

      component.searchMode = 'tree';
      component.isOverlayOpen = false;

      fixture.detectChanges();

      expect(component.focusInputField$).toBeObservable(cold('^-a-|', { a: true }));
      expect(component.searchMode).toBe('text');
      expect(component.isOverlayOpen).toBe(true);
    });

    it('should open overlay when input field is focused and remain open when focused again', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'INPUT':
            return cold('^-oo|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;

      component.searchMode = 'tree';
      component.isOverlayOpen = false;

      fixture.detectChanges();

      expect(component.focusInputField$).toBeObservable(cold('^-aa|', { a: true }));
      expect(component.searchMode).toBe('text');
      expect(component.isOverlayOpen).toBe(true);
    });

    it('should remain closed on backdropClick, open on focusing form field and close on detach event', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'MAT-FORM-FIELD':
            return cold('^-o-|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;
      component.isOverlayOpen = false;

      component.connectedOverlay.backdropClick = cold('^e--|', {
        e: {} as MouseEvent,
      }) as Observable<MouseEvent> as EventEmitter<MouseEvent>;
      component.connectedOverlay.detach = cold('^--e|') as Observable<void> as EventEmitter<void>;

      fixture.detectChanges();

      expect(component.showOverlay$).toBeObservable(cold('^ftf|', { f: false, t: true }));
      expect(component.isOverlayOpen).toBe(false);
    });

    it('should open on fousing form field, close on backdropClick and open on focusing form field', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'MAT-FORM-FIELD':
            return cold('^o-o|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;
      component.isOverlayOpen = false;

      component.connectedOverlay.backdropClick = cold('^-e-|', {
        e: {} as MouseEvent,
      }) as Observable<MouseEvent> as EventEmitter<MouseEvent>;
      component.connectedOverlay.detach = cold('^---|') as Observable<void> as EventEmitter<void>;

      fixture.detectChanges();

      expect(component.showOverlay$).toBeObservable(cold('^tft|', { f: false, t: true }));
      expect(component.isOverlayOpen).toBe(true);
    });

    it('should open on focusing form field, close on detach event and open on focusing form field', () => {
      jest.spyOn(focusMonitor, 'monitor').mockImplementation((element) => {
        switch (element.nativeElement.tagName) {
          case 'MAT-FORM-FIELD':
            return cold('^o-o|', { o: {} as FocusOrigin });
          default:
            return cold('');
        }
      });

      TestBed.overrideProvider(FocusMonitor, { useValue: focusMonitor });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
      fixture = TestBed.createComponent(SearchInputComponent);
      component = fixture.componentInstance;
      component.isOverlayOpen = false;

      component.connectedOverlay.backdropClick = cold('^---|', {
        e: {} as MouseEvent,
      }) as Observable<MouseEvent> as EventEmitter<MouseEvent>;
      component.connectedOverlay.detach = cold('^-e-|') as Observable<void> as EventEmitter<void>;

      fixture.detectChanges();

      expect(component.showOverlay$).toBeObservable(cold('^tft|', { f: false, t: true }));
      expect(component.isOverlayOpen).toBe(true);
    });
  });
});
