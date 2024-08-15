import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFieldsModalComponent } from './edit-fields-modal.component';

describe('EditFieldsModalComponent', () => {
  let component: EditFieldsModalComponent;
  let fixture: ComponentFixture<EditFieldsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFieldsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFieldsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
