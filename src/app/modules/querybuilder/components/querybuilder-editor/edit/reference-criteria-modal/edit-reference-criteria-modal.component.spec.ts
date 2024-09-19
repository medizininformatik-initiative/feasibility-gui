import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReferenceCriteriaModalComponent } from './edit-reference-criteria-modal.component';

describe('EditReferenceCriteriaComponent', () => {
  let component: EditReferenceCriteriaModalComponent;
  let fixture: ComponentFixture<EditReferenceCriteriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditReferenceCriteriaModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditReferenceCriteriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
