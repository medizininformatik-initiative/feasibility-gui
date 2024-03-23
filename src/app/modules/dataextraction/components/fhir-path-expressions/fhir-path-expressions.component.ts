import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'num-app-fhir-path-expressions',
  templateUrl: './fhir-path-expressions.component.html',
  styleUrls: ['./fhir-path-expressions.component.scss'],
})
export class FhirPathExpressionsComponent {
  parent_form!: FormArray<FormControl>;
  @Input() set form(control: AbstractControl | null) {
    if (control instanceof FormArray) {
      this.parent_form = control;
      if (this.parent_form.length === 0) {
        this.addExpression();
      }
    } else {
      throw new Error('FhirPathExpressionsComponent expects a FormArray instance.');
    }
  }

  get form(): FormArray {
    return this.parent_form;
  }

  constructor(private fb: FormBuilder) {}

  createExpression(value: string = ''): FormControl {
    return this.fb.control(value);
  }

  addExpression(): void {
    if (this.canAddExpression()) {
      this.form.push(this.createExpression());
    }
  }

  removeExpression(index: number): void {
    if (this.form.length > 1) {
      this.form.removeAt(index);
    }
  }

  canAddExpression(): boolean {
    if (this.form.length === 0) {
      return true;
    }
    const lastExpression = this.form.at(this.form.length - 1);
    return lastExpression && lastExpression.value !== '';
  }
}
