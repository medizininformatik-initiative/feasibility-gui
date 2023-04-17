import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeHeaderComponent } from './search-tree-header.component';

describe('SearchTreeHeaderComponent', () => {
  let component: SearchTreeHeaderComponent;
  let fixture: ComponentFixture<SearchTreeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTreeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
