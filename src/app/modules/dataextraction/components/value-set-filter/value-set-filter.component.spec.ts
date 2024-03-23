import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetFilterComponent } from './value-set-filter.component';

describe('ValueSetFilterComponent', () => {
  let component: ValueSetFilterComponent;
  let fixture: ComponentFixture<ValueSetFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValueSetFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueSetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
