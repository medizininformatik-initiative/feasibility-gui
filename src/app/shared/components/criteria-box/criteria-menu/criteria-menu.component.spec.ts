import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaMenuComponent } from './criteria-menu.component';

describe('CriteriaMenuComponent', () => {
  let component: CriteriaMenuComponent;
  let fixture: ComponentFixture<CriteriaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CriteriaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
