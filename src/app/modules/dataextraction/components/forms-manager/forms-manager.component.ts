import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ExtractionFormToViewDefinitionService } from '../../services/extraction-form-to-view-definition.service';
import { FormSubmissionService } from '../../services/form-submission.service';

@Component({
  selector: 'num-app-forms-manager',
  templateUrl: './forms-manager.component.html',
  styleUrls: ['./forms-manager.component.css'],
})
export class FormsManagerComponent {
  forms: FormArray<FormGroup>;
  showAddButton = false; // New flag to control the button visibility
  translationComponent: ExtractionFormToViewDefinitionService =
    new ExtractionFormToViewDefinitionService();

  constructor(
    private formSubmissionService: FormSubmissionService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.forms = this.fb.array([this.createFormGroup()]);
  }

  createFormGroup(data: any = {}): FormGroup {
    return this.fb.group({});
  }

  addFormGroup(): void {
    this.forms.push(this.createFormGroup());
    this.showAddButton = false; // Hide the button after adding a new form
  }

  removeFormGroup(index: number): void {
    if (this.forms.length > 1) {
      this.forms.removeAt(index);
    }
  }

  handleProfileSelection(selected: boolean): void {
    if (selected) {
      this.showAddButton = true; // Show the button when a profile is selected
    }
    this.cdRef.detectChanges();
    console.log(this.forms.value); // Log the form data (for debugging purposes)
    console.log(this.forms.getRawValue());
    // No need to track each form's selection state individually
  }

  exportFormData(): void {
    const formData = this.forms.value;
    const formDataJson = JSON.stringify(formData, null, 2); // Serialize with pretty print
    const blob = new Blob([formDataJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importFormData(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const text = e.target.result;
          const data = JSON.parse(text);
          // Ensure data is in the expected format (an array of form data objects)
          if (Array.isArray(data)) {
            this.forms.clear(); // Clear existing form groups
            data.forEach((formData) => this.forms.push(this.createFormGroup(formData)));
          } else {
            console.error('Imported data is not an array of form data objects.');
          }
        } catch (error) {
          console.error('Error parsing imported file:', error);
        }
      };
      reader.readAsText(file);
    }
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

  // Helper function to trigger file download
  // Adjusted to handle CSV data
  downloadFile(data: any, filename: string): void {
    // Directly use the CSV data to create a Blob
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
}
