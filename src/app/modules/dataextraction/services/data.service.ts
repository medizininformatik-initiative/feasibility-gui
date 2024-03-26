import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private formData: FormArray<FormGroup>;

  constructor() {}

  setFormData(data: FormArray<FormGroup>) {
    this.formData = data;
  }

  getFormData(): FormArray<FormGroup> {
    return this.formData;
  }

  hasData(): boolean {
    return this.formData !== undefined;
  }
}
