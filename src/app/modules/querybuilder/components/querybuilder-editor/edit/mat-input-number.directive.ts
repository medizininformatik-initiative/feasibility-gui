import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core'
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

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
  precision = 1

  private valueInternal: string | null

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  get value(): string | null {
    return this.valueInternal
  }

  @Input('value')
  set value(value: string | null) {
    this.formatValue(value)
    this._onChange(value)
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value): void {
    this.valueInternal = value.replace(/[^\d.-]/g, '')
    this._onChange(value)
  }

  @HostListener('blur')
  onBlur(): void {
    this._onTouch(this.valueInternal) // here to notify Angular Validators
  }

  @HostListener('focus')
  onFocus(): void {
    this.unFormatValue()
  }

  // noinspection JSUnusedLocalSymbols
  _onChange(value: any): void {}

  // noinspection JSUnusedLocalSymbols
  _onTouch(value: any): void {}

  writeValue(value: any): void {
    this.valueInternal = this.round(value).toFixed(this.precision)
    this.formatValue(this.valueInternal) // format Value
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn
  }

  registerOnTouched(fn: (value: any) => void): void {
    this._onTouch = (value) => {
      this.writeValue(value)
      fn(value)
    }
  }

  private formatValue(value: string | null): void {
    if (value !== null) {
      this.elementRef.nativeElement.value = this.round(value).toFixed(this.precision)
    } else {
      this.elementRef.nativeElement.value = ''
    }
  }

  private unFormatValue(): void {
    const value = this.elementRef.nativeElement.value
    this.valueInternal = value.replace(/[^\d.-]/g, '')
    if (value) {
      this.elementRef.nativeElement.value = this.valueInternal
    } else {
      this.elementRef.nativeElement.value = ''
    }
  }

  private round(value: string): number {
    const divisor = Math.pow(10, this.precision)
    return Math.round(Number(value) * divisor) / divisor
  }
}
