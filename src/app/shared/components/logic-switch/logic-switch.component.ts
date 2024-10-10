import { Component } from '@angular/core';

@Component({
  selector: 'num-logic-switch',
  templateUrl: './logic-switch.component.html',
  styleUrls: ['./logic-switch.component.scss'],
})
export class LogicSwitchComponent {
  isOrSelected = false;

  test(event) {
    this.isOrSelected = event;
  }
}
