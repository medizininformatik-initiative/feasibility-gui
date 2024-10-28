import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-display-feasibility-query',
  templateUrl: './display-feasibility-query.component.html',
  styleUrls: ['./display-feasibility-query.component.scss'],
})
export class DisplayFeasibilityQueryComponent implements OnInit {
  droppedItems: Criterion[] = [];
  groupType: 'Inclusion' | 'Exclusion';
  querySubscription: Subscription;

  @Input() isEditable: boolean;

  constructor() {}

  ngOnInit() {}
}