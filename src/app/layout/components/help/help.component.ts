import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TooltipComponent } from 'src/app/shared/components/tooltip/tooltip.component';

@Component({
  selector: 'num-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  @Output() toggleHelp = new EventEmitter();

  @Input() isHelpExpanded = true;

  displayHelpText: TooltipComponent;

  ngOnInit() {}
  toggleMenu() {
    this.toggleHelp.emit();
  }
}
