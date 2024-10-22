import { Component, Input } from '@angular/core';

@Component({
  selector: 'num-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  constructor() {}

  @Input() icon?: string;
  @Input() type?: 'blue' | 'green' | 'red';
  @Input() isDisabled?: boolean;
  @Input() tooltip?: string;
}
