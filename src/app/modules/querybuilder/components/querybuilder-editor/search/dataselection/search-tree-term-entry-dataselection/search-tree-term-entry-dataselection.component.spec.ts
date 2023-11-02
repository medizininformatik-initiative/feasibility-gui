import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeTermEntryDataselectionComponent } from './search-tree-term-entry-dataselection.component';

describe('SearchTreeTermEntryDataselectionComponent', () => {
  let component: SearchTreeTermEntryDataselectionComponent;
  let fixture: ComponentFixture<SearchTreeTermEntryDataselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeTermEntryDataselectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTreeTermEntryDataselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
