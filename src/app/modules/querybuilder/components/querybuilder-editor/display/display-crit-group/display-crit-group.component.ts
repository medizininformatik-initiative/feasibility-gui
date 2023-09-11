import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Criterion } from '../../../../model/api/query/criterion';
import { CritGroupArranger } from '../../../../controller/CritGroupArranger';
import { CritType } from '../../../../model/api/query/group';
import { Query } from '../../../../model/api/query/query';

@Component({
  selector: 'num-display-crit-group',
  templateUrl: './display-crit-group.component.html',
  styleUrls: ['./display-crit-group.component.scss'],
})
export class DisplayCritGroupComponent implements OnInit {
  @Input()
  critGroup: Criterion[][];

  @Input()
  searchType: string;

  @Input()
  query: Query;

  @Input()
  groupId: number;

  @Input()
  critType: CritType;

  @Output()
  dropped = new EventEmitter();

  @Output()
  switch = new EventEmitter();

  @Output()
  storeQuery = new EventEmitter<Query>();

  @Output()
  delete = new EventEmitter<{ row: number; column: number }>();

  constructor() {}

  ngOnInit(): void {}

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

  doDrop($event: any): void {
    this.dropped.emit({
      addMode: 'position',
      from: $event.previousContainer.data,
      to: $event.container.data,
    });
  }

  doStoreQuery(query: Query): void {
    this.storeQuery.emit(query);
  }

  doDelete({ row, column }: { row: number; column: number }): void {
    this.delete.emit({ row, column });
  }

  doDropAtEnd($event: any): void {
    this.dropped.emit({
      addMode: 'end',
      from: $event.previousContainer.data,
      to: $event.container.data,
    });
  }
  isLastSwitch(i: number): boolean {
    let bool = true;
    for (let x = i + 1; x < this.critGroup.length; x++) {
      bool = bool && this.critGroup[x][0]?.isLinked;
    }
    return !bool;
  }
}
