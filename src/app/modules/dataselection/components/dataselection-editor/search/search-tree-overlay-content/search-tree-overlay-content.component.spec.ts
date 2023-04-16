import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeOverlayContentComponent } from './search-tree-overlay-content.component';

describe('SearchTreeOverlayContentComponent', () => {
  let component: SearchTreeOverlayContentComponent;
  let fixture: ComponentFixture<SearchTreeOverlayContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeOverlayContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTreeOverlayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
