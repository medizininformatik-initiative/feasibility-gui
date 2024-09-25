import { Component, Input } from '@angular/core';

@Component({
  selector: 'num-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input()
  isChecked = true; // Default value, set it to true or false based on your logic

  toggleSwitch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
  }
}
