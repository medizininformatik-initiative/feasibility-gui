import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[numMatInputNumber]',
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatInputNumberDirective },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInputNumberDirective),
      multi: true,
    },
  ],
})
export class MatInputNumberDirective implements ControlValueAccessor {
  @Input()
  precision = 1;

  private valueInternal: string | null;

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value): void {
    this.valueInternal = value.replace(/[^\d.-]/g, '');
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouch(this.valueInternal); // here to notify Angular Validators
  }

  @HostListener('focus')
  onFocus(): void {
    this.unFormatValue();
  }

  // noinspection JSUnusedLocalSymbols
  onChange(value: any): void {}

  // noinspection JSUnusedLocalSymbols
  onTouch(value: any): void {}

  writeValue(value: any): void {
    this.valueInternal = this.round(value).toFixed(this.precision);
    this.formatValue(this.valueInternal); // format Value
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void): void {
    this.onTouch = (value) => {
      this.writeValue(value);
      fn(value);
    };
  }

  private formatValue(value: string | null): void {
    this.elementRef.nativeElement.value = this.round(value).toFixed(this.precision);
  }

  private unFormatValue(): void {
    this.elementRef.nativeElement.value = this.valueInternal;
  }

  private round(value: string): number {
    const divisor = Math.pow(10, this.precision);
    return Math.round(Number(value) * divisor) / divisor;
  }
}
