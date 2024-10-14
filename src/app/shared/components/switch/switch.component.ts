import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'num-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  @Input()
  isChecked = true;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public toggleSwitch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;

    this.toggle.emit(this.isChecked);
  }
}
