import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { combineLatest, filter, Observable, of, take } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FhirTerminologyService } from '../../services/fhir-terminology-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'num-app-value-set-filter',
  templateUrl: './value-set-filter.component.html',
  styleUrls: ['./value-set-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueSetFilterComponent),
      multi: true,
    },
  ],
})
export class ValueSetFilterComponent implements OnInit, ControlValueAccessor {
  @Input() valueSetUrl!: string;
  @Input() formGroup!: FormGroup;
  @Input() formArrayName!: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  control = new FormControl('');
  values$!: Observable<any[]>;
  @ViewChild('inputField') inputField!: ElementRef;
  firstCode = '';

  constructor(private fb: FormBuilder, private fhirService: FhirTerminologyService) {}

  ngOnInit(): void {
    this.setupValueChanges();
    this.getCodesControl().setAsyncValidators(this.validateValueSetCode());
    this.firstValueSetCode();
  }

  setupValueChanges(): void {
    this.values$ = this.control.valueChanges.pipe(
      filter((value) => (value ? value.length > 2 : true)),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => (value ? this.searchValueSet(value) : of([])))
    );
  }

  searchValueSet(value: string): Observable<any[]> {
    return this.fhirService.getValuesFromValueSet(this.valueSetUrl).pipe(
      map((options) =>
        options.filter(
          (option) =>
            option.code.toLowerCase().includes(value.toLowerCase()) ||
            option.display.toLowerCase().includes(value.toLowerCase()) ||
            this.displayFn(option).toLowerCase().includes(value.toLowerCase())
        )
      ),
      catchError(() => of([]))
    );
  }

  firstValueSetCode(): void {
    this.fhirService
      .getValuesFromValueSet(this.valueSetUrl)
      .pipe(
        map((options) => (options.length > 0 ? options[0] : null)),
        take(1) // Take only the first emission from the Observable and complete.
      )
      .subscribe((code) => {
        if (code) {
          this.firstCode = this.displayFn(code);
        }
      });
  }

  validateValueSetCode(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (!control.value || control.value.length === 0) {
        return of(null); // Considered valid if empty
      }
      return this.validateCodes(control.value);
    };
  }

  validateCodes(codes: any[]): Observable<{ [key: string]: any } | null> {
    const validations$ = codes.map((code) =>
      this.fhirService.getValuesFromValueSet(this.valueSetUrl).pipe(
        map((options) =>
          options.some(
            (option) =>
              option.code.toLowerCase() === code.code.toLowerCase() &&
              option.display.toLowerCase() === code.display.toLowerCase()
          )
        ),
        catchError(() => of(false))
      )
    );

    return of(validations$).pipe(
      switchMap((validationObs) => validationObs.length > 0 ? combineLatest(validationObs) : of([true])),
      map((validations) =>
        validations.every((isValid) => isValid) ? null : { valueSetMismatch: true }
      )
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const { code, display, system } = event.option.value;
    event.option.deselect();
    this.addCode({ code, display, system });
    this.control.reset();
    this.inputField.nativeElement.value = '';
  }

  addCode(code: { code: string; display: string; system: string }): void {
    this.getCodesControl().push(this.fb.group(code));
  }

  remove(index: number): void {
    this.getCodesControl().removeAt(index);
  }

  writeValue(value: any): void {
    const codesControl = this.getCodesControl();
    codesControl.clear();
    if (value) {
      value.forEach((code: any) => codesControl.push(this.fb.group(code)));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(_fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  displayFn(value: any): string {
    return value && value.code ? `${value.code} - ${value.display}` : '';
  }

  protected getCodesControl(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }
}
