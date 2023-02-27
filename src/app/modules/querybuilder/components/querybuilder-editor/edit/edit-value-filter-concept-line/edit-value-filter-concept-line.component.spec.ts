import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValueFilterConceptLineComponent } from './edit-value-filter-concept-line.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../layout/material/material.module';

describe('EditValueFilterConceptComponent', () => {
  let component: EditValueFilterConceptLineComponent;
  let fixture: ComponentFixture<EditValueFilterConceptLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditValueFilterConceptLineComponent],
      imports: [MaterialModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValueFilterConceptLineComponent);
    component = fixture.componentInstance;
    component.concept = {
      code: 'a',
      system: 'http://test',
      display: 'nothing',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire selectConcept event', () => {
    spyOn(component.selectConcept, 'emit');
    component.doSelectConcept();
    expect(component.selectConcept.emit).toHaveBeenCalledWith();
  });
});
