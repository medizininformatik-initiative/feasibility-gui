/*import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from '../../../../../../model/FeasibilityQuery/Criterion/Criterion';
import { CritGroupArranger } from '../../../../controller/CritGroupArranger';
import { CritType, Group } from '../../../../../../model/FeasibilityQuery/Group';
import { Query } from '../../../../../../model/FeasibilityQuery/Query';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-display-crit-group',
  templateUrl: './display-crit-group.component.html',
  styleUrls: ['./display-crit-group.component.scss'],
})
export class DisplayCritGroupComponent implements OnInit {
  @Input()
  critGroup: Criterion[][];

  @Input()
  critType: CritType;

  query: Query;

  @Input()
  groupId: number;

  @Output()
  dropped = new EventEmitter();

  @Output()
  switch = new EventEmitter();

  @Output()
  storeQuery = new EventEmitter<Query>();

  @Output()
  delete = new EventEmitter<{ row: number; column: number }>();

  group: Group;

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.getFeasibilityQuery().subscribe((query) => {
      this.query = query;
      this.group = this.query.groups[this.groupId];
    });
  }

  getInnerLabelKey(): 'AND' | 'OR' {
    return this.critType === 'inclusion' ? 'OR' : 'AND';
  }

  getOuterLabelKey(): 'AND' | 'OR' {
    return this.critType === 'exclusion' ? 'OR' : 'AND';
  }

  splitInnerArray(i: number, j: number): void {
    this.critGroup = CritGroupArranger.splitInnerArray(this.critGroup, i, j);
    this.switch.emit(this.critGroup);
  }

  joinInnerArrays(i: number): void {
    this.critGroup = CritGroupArranger.joinInnerArrays(this.critGroup, i);
    this.switch.emit(this.critGroup);
  }

  doStoreQuery(query: Query): void {
    this.storeQuery.emit(query);
  }

  doDelete({ row, column }: { row: number; column: number }): void {
    this.group = CritGroupArranger.removeFromGroup(
      this.group,
      { groupId: this.groupId, critType: this.critType, row, column },
      'delete'
    );
    const index = this.query.groups.findIndex((groupTemp) => groupTemp.id === this.groupId);
    if (index >= 0) {
      this.query.groups[index] = this.group;
    }
  }

  doDrop($event: any): void {
    this.query.groups = CritGroupArranger.moveCriterion(
      this.query.groups,
      $event.previousContainer.data,
      $event.container.data
    );
    this.queryService.setFeasibilityQuery(this.query);
  }

  doDropAtEnd($event: any): void {
    this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
      this.query.groups,
      $event.previousContainer.data,
      $event.container.data
    );
    this.queryService.setFeasibilityQuery(this.query);
  }

  isLastSwitch(i: number): boolean {
    let bool = true;
    for (let x = i + 1; x < this.critGroup.length; x++) {
      bool = bool && this.critGroup[x][0]?.isLinked;
    }
    return !bool;
  }
}
*/
