import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ExtractionFormToViewDefinitionService } from '../../services/extraction-form-to-view-definition.service';
import { FormSubmissionService } from '../../services/form-submission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'num-dataextraction-preview',
  templateUrl: './dataextraction-preview.component.html',
  styleUrls: ['./dataextraction-preview.component.scss'],
})
export class DataextractionPreviewComponent implements OnInit {
  displayExpertView = false;

  forms: FormArray<FormGroup>;
  translationComponent: ExtractionFormToViewDefinitionService =
    new ExtractionFormToViewDefinitionService();
  constructor(
    private formSubmissionService: FormSubmissionService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    if (formData) {
      this.forms = formData;
      console.log('Data loaded:', this.forms.getRawValue());
    }
  }

  toggleExpertView($event: any) {
    this.displayExpertView = !this.displayExpertView;
  }
  edit() {
    this.dataService.setFormData(this.forms);
    this.router.navigate(['/dataextraction/editor/']);
  }

  download() {
    const formDataJson = JSON.stringify(this.forms.getRawValue(), null, 2);
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
    const filename = `forms_${timestamp}.json`;
    this.downloadForm(formDataJson, filename);
  }

  downloadForm(data: string, filename: string) {
    const blob = new Blob([data], { type: 'application/json' });
    const element = document.createElement('a');
    const url = URL.createObjectURL(blob);

    element.href = url;
    element.download = filename;
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  }

  open() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const formDataJson = e.target.result;
        const formData = JSON.parse(formDataJson);
        const formGroups = formData.map((data: any) => this.createFormGroupFromJson(data));
        this.forms = new FormArray<FormGroup>(formGroups);
        console.log('Data loaded:', this.forms.getRawValue());
      };
      reader.readAsText(file);
    };

    input.click();
  }

  isPrimitive(value) {
    return value !== null && typeof value !== 'object' && typeof value !== 'function';
  }

  createFormGroupFromJson(json: any): FormGroup {
    const group: { [key: string]: AbstractControl } = {};
    Object.keys(json).forEach((key) => {
      if (Array.isArray(json[key])) {
        // For arrays, decide based on the type of the first element or create a more complex logic as needed
        group[key] = this.isPrimitive(json[key][0])
          ? new FormArray(json[key].map((value) => new FormControl(value)))
          : new FormArray(json[key].map((item) => this.createFormGroupFromJson(item)));
      } else if (this.isPrimitive(json[key]) || json[key] === null) {
        // Directly create a FormControl for primitives and null values
        group[key] = new FormControl(json[key]);
      } else {
        // Recursively create FormGroup for object structures
        group[key] = this.createFormGroupFromJson(json[key]);
      }
    });
    return new FormGroup(group);
  }

  submitForms(): void {
    const processedData = this.translationComponent.transformToViewDefinitions(
      this.forms.getRawValue()
    );
    const formDataJson = JSON.stringify(processedData, null, 2); // Serialize with pretty print
    console.log('Submitting forms:', formDataJson);
    this.formSubmissionService.submitForm(formDataJson).subscribe(
      (response) => {
        console.log('Forms submitted successfully');
        // Directly use the response data, assuming it's the CSV content
        this.downloadFile(response, 'extracted_data.csv');
      },
      (error) => {
        console.error('Error submitting forms:', error);
      }
    );
  }

  downloadFile(data: any, filename: string): void {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    a.remove();
  }

  applicableFilter(form: FormGroup): boolean {
    const whereControls = (form.get('where') as FormArray).controls;
    // Use 'some' to return true as soon as any control meets the criteria
    return whereControls.some((control) => {
      if (control.get('type').value === 'coding') {
        return this.isCodingFilterApplicable(control);
      } else if (control.get('type').value === 'date') {
        return this.isDateFilterApplicable(control);
      }
      return false;
    });
  }

  isDateFilterApplicable(control: AbstractControl): boolean {
    console.log(control.get('afterDate').value !== null || control.get('beforeDate').value !== null);
    return control.get('afterDate').value !== null || control.get('beforeDate').value !== null;
  }

  isCodingFilterApplicable(control: AbstractControl): boolean {
    if (control instanceof FormGroup) {
      const codesArray = control.get('value') as FormArray;
      return codesArray && codesArray.controls.length > 0;
    }
    return false;
  }
}
