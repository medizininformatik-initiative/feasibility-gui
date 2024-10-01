import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-display-criteria-group',
  templateUrl: './display-criteria-group.component.html',
  styleUrls: ['./display-criteria-group.component.scss'],
})
export class DisplayCriteriaGroupComponent implements OnInit {
  droppedItems: Criterion[] = [];
  groupType: 'Inclusion' | 'Exclusion';
  querySubscription: Subscription;

  @Input() isEditable: boolean;

  constructor() {}

  ngOnInit() {}
}
