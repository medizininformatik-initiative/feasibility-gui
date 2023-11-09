import { Component, Input } from '@angular/core';

@Component({
  selector: 'num-query-box-front',
  templateUrl: './query-box-front.component.html',
  styleUrls: ['./query-box-front.component.scss'],
})
export class QueryBoxFrontComponent {
  @Input()
  isInvalid = false;
}
