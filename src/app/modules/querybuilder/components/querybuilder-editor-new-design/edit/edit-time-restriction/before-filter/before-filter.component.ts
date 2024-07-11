import { Component, Input } from '@angular/core';
import { TimeRestriction } from 'src/app/model/FeasibilityQuery/TimeRestriction';

@Component({
  selector: 'num-before-filter',
  templateUrl: './before-filter.component.html',
  styleUrls: ['./before-filter.component.scss'],
})
export class BeforeFilterComponent {
  @Input()
  timeRestriction: TimeRestriction;
}
