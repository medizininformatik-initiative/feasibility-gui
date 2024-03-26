import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormGroup } from '@angular/forms';
import { ExtractionFormToViewDefinitionService } from '../../services/extraction-form-to-view-definition.service';
import { FormSubmissionService } from '../../services/form-submission.service';
import { O } from '@angular/cdk/keycodes';

@Component({
  selector: 'num-dataextraction-preview',
  templateUrl: './dataextraction-preview.component.html',
  styleUrls: ['./dataextraction-preview.component.scss'],
})
export class DataextractionPreviewComponent implements OnInit {
  forms: FormArray<FormGroup>;
  translationComponent: ExtractionFormToViewDefinitionService =
    new ExtractionFormToViewDefinitionService();
  constructor(
    private formSubmissionService: FormSubmissionService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const formData = this.dataService.getFormData();
    if (formData) {
      this.forms = formData;
      console.log('Data loaded:', this.forms.getRawValue());
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
