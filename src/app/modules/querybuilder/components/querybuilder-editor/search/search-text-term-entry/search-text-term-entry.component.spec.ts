import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTextTermEntryComponent } from './search-text-term-entry.component';

describe('SerachTextTermEntryComponent', () => {
  let component: SearchTextTermEntryComponent;
  let fixture: ComponentFixture<SearchTextTermEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTextTermEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextTermEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire choose event', () => {
    spyOn(component.choose, 'emit');
    component.fireChoose();
    expect(component.choose.emit).toHaveBeenCalledWith(component.node);
  });
});
