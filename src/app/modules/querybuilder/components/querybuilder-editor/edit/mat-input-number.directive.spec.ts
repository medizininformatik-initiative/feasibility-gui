import { MatInputNumberDirective } from './mat-input-number.directive'
import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  template: `
    <input
      matInput
      type="number"
      [(ngModel)]="value"
      (blur)="doBlur()"
      numMatInputNumber
      [precision]="precision"
      [min]="min"
      [max]="max"
    />
  `,
})
class TestComponent {
  value = 0
  precision = 2
  min = 0
  max = 100

  blurred = false

  doBlur(): void {
    this.blurred = true
  }
}

describe('MatInputNumberDirective', () => {
  it('should create an instance', () => {
    const directive = new MatInputNumberDirective(undefined)
    expect(directive).toBeTruthy()
  })

  describe('test value adaptions', () => {
    let fixture
    let element
    let component

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [MatInputNumberDirective, TestComponent],
        imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule],
      }).createComponent(TestComponent)
      element = fixture.debugElement.query(By.css('INPUT'))
      component = fixture.componentInstance
    })

    it('should round value to precision 2 for input event', () => {
      component.value = 13.569
      fixture.detectChanges()
      element.nativeElement.dispatchEvent(new Event('input'))

      expect(element.nativeElement.value).toBe('13.57')
      expect(component.blurred).toBe(false)
    })

    it('should result in "0.00" for input event on empty value', () => {
      component.value = null
      fixture.detectChanges()
      element.nativeElement.dispatchEvent(new Event('input'))

      expect(element.nativeElement.value).toBe('0.00')
    })

    it('should round value on blur event', () => {
      component.value = '12.569'
      fixture.detectChanges()
      element.nativeElement.dispatchEvent(new Event('blur'))

      expect(element.nativeElement.value).toBe('12.57')
      expect(component.blurred).toBe(true)
    })

    it('should round value on focus event', () => {
      component.value = '11.569'
      fixture.detectChanges()
      element.nativeElement.dispatchEvent(new Event('focus'))

      expect(element.nativeElement.value).toBe('11.57')
      expect(component.blurred).toBe(false)
    })
  })
})
