import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'num-app-forms-manager',
  templateUrl: './forms-manager.component.html',
  styleUrls: ['./forms-manager.component.css'],
})
export class FormsManagerComponent implements OnInit {
  forms: FormArray<FormGroup>;
  showAddButton = false; // New flag to control the button visibility

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private dataService: DataService,
    private router: Router
  ) {
    this.forms = this.fb.array([this.createFormGroup()]);
  }
  ngOnInit(): void {
    if (this.dataService.hasData()) {
      this.forms = this.dataService.getFormData();
      this.showAddButton = true; // Show the button when data is loaded
    }
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
  }

  determineProfileSelectedState(formGroup: FormGroup): boolean {
    return !!formGroup.get('ressource')?.value;
  }

  previewForms(): void {
    this.dataService.setFormData(this.forms);
    // TODO: /dataextration shouldn't be required in the route path as it's already in the module
    this.router.navigate(['/dataextraction/editor/preview']);
  }
}
