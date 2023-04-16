import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSimpleComponent } from './result-simple.component';

describe('ResultSimpleComponent', () => {
  let component: ResultSimpleComponent;
  let fixture: ComponentFixture<ResultSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultSimpleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
