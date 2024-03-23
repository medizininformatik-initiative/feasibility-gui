import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'num-app-fhir-path',
  templateUrl: './fhir-path.component.html',
  styleUrls: ['./fhir-path.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FhirPathComponent),
      multi: true,
    },
  ],
})
export class FhirPathComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() infoText = '';
  // Inside FhirPathComponent
  @Input() disabled = false;
  checked = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange: any = () => {};

  onCheckboxChange(event: any): void {
    console.log('event', event);
    this.checked = event.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Implement if needed
  }
}
