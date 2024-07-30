import { Component, Input } from '@angular/core';
import { BackgroundColor } from '../../models/ActionBar/ActioBarBackgroundColor';

@Component({
  selector: 'num-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  BackgroundColor = BackgroundColor;
  @Input()
  backgroundLayout: BackgroundColor = BackgroundColor.GREEN;
}
