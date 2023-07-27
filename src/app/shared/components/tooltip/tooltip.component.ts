import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'num-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input()
  tooltipMessage: string;

  public helpText: string;
  constructor() {}

  ngOnInit() {
    console.log(this.tooltipMessage);
    this.helpText = this.tooltipMessage;
  }
}
