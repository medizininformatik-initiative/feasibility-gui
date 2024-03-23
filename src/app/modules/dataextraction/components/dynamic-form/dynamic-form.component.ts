import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { ProfileFormConfigService } from '../../services/profile-form-config.service';
import { FhirPathField } from '../../models/field-config.model';

@Component({
  selector: 'num-app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  dynamicForm!: FormGroup;
  @Output() profileSelected = new EventEmitter<boolean>();
  isProfileSelected = false;

  @Input() set setFormGroup(control: AbstractControl) {
    if (control instanceof FormGroup) {
      this.dynamicForm = control;
    } else {
      throw new Error('DynamicFormComponent expects a FormGroup instance.');
    }
  }

  get formGroup(): FormGroup {
    return this.dynamicForm;
  }

  constructor(private fb: FormBuilder, private configService: ProfileFormConfigService) {}

  get selectionColumnsControls() {
    // Ensure 'selection.columns' exists before trying to access its controls
    const selectionColumnsPath = 'selection.column'; // Verify this is the correct path
    if (this.dynamicForm && this.dynamicForm.get(selectionColumnsPath)) {
      return (this.dynamicForm.get(selectionColumnsPath) as FormArray).controls;
    }
    return [];
  }

  get whereControls() {
    // Ensure 'where' exists before trying to access its controls
    if (this.dynamicForm && this.dynamicForm.get('where')) {
      return (this.dynamicForm.get('where') as FormArray).controls;
    }
    return [];
  }

  ngOnInit(): void {
    this.dynamicForm.addControl('ressource', this.fb.control(''));

    this.dynamicForm.get('ressource')?.valueChanges.subscribe((value) => {
      // Emit true if a profile is selected, false otherwise
      this.isProfileSelected = !!value;
      this.profileSelected.emit(!!value);
    });

    const profileControl = this.dynamicForm.get('ressource');
    if (profileControl) {
      profileControl.valueChanges.subscribe((value) => {
        this.updateFormBasedOnProfile(value);
      });
    }
  }

  updateFormBasedOnProfile(profile: string): void {
    const profileConfig = this.configService.getFormConfig(profile);
    const filterFields = profileConfig.filter;
    const fhirPathFields = profileConfig.paths;

    // Reset form to initial state, remove all existing controls except 'profileSelection'
    Object.keys(this.dynamicForm.controls).forEach((controlName) => {
      if (controlName !== 'ressource') {
        this.dynamicForm.removeControl(controlName);
      }
    });

    // Initialize 'selection' and 'where' sections in the form
    this.dynamicForm.addControl(
      'selection',
      this.fb.group({
        column: this.fb.array([]),
      })
    );
    this.dynamicForm.addControl('where', this.fb.array([]));

    // Handle 'selection' columns based on fhirPathFields
    const selectionColumns = this.dynamicForm.get('selection.column') as FormArray;
    fhirPathFields.forEach((pathField) => {
      selectionColumns.push(
        this.fb.group({
          name: pathField.label,
          path: pathField.path,
          selected: pathField.preselected,
          disabled: pathField.mandatory,
          info: pathField.info,
          hidden: pathField.hidden ? pathField.hidden : false,
        })
      );
    });

    // Handle 'where' based on filterFields
    const whereArray = this.dynamicForm.get('where') as FormArray;
    filterFields.forEach((field) => {
      const control: any = this.fb.group({
        type: field.type,
        field: field.field,
        label: [field.label],
        path: [field.path],
      });

      if (field.type === 'date') {
        control.addControl(`afterDate`, this.fb.control(null)); // Initialize with current date
        control.addControl(`beforeDate`, this.fb.control(null)); // Initialize with current date
      } else if (field.type === 'coding') {
        const valueArray = this.fb.array([]);
        control.addControl('value', valueArray);

        if (field.valueSetUrls) {
          const valueSetUrlsArray = this.fb.array(
            field.valueSetUrls.map((url) => this.fb.control(url))
          );
          control.addControl('valueSetUrls', valueSetUrlsArray);
        }
      } else {
        control.addControl('value', this.fb.control(''));
      }

      whereArray.push(control);
    });

    console.log(`Profile selection changed to: ${JSON.stringify(this.dynamicForm.value, null, 2)}`);
  }
}
