import { Component, Input } from '@angular/core';

@Component({
  selector: 'num-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() currentStep = 1;
}
