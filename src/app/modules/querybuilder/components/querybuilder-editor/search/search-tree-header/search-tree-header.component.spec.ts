import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeHeaderComponent } from './search-tree-header.component';

describe('SearchHeaderTreeComponent', () => {
  let component: SearchTreeHeaderComponent;
  let fixture: ComponentFixture<SearchTreeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTreeHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTreeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire addEvent with id 4711', () => {
    spyOn(component.switchCategory, 'emit');

    component.fireSwitchCategory('4711');

    expect(component.switchCategory.emit).toHaveBeenCalledWith('4711');
  });
});
