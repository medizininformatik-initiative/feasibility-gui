import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQueryComponent } from './single-query.component';

describe('SingleQueryComponent', () => {
  let component: SingleQueryComponent;
  let fixture: ComponentFixture<SingleQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleQueryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
