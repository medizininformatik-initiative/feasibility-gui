import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeTermEntryComponent } from './search-tree-term-entry.component';

describe('SearchTreeTermEntryComponent', () => {
  let component: SearchTreeTermEntryComponent;
  let fixture: ComponentFixture<SearchTreeTermEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeTermEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTreeTermEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
