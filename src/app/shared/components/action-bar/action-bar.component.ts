import { BackgroundColor } from '../../models/ActionBar/ActioBarBackgroundColor';
import { Component, Input } from '@angular/core';

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
