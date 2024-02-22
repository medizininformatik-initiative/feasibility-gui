import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CritGroupArranger } from '../../../../controller/CritGroupArranger';
import { CritType } from 'src/app/model/FeasibilityQuery/Group';
import { Query } from 'src/app/model/FeasibilityQuery/Query';

@Component({
  selector: 'num-display-entities',
  templateUrl: './display-entities.component.html',
  styleUrls: ['./display-entities.component.scss'],
})
export class DisplayEntitiesComponent implements OnInit {
  @Input()
  criterionEntity: Criterion;

  @Input()
  query: Query;

  critGroup: Array<any> = [];
  critType: CritType = 'inclusion';

  constructor() {}

  ngOnInit(): void {
    this.criterionEntity.children.forEach((child) => {
      this.critGroup.push(child.children);
    });

    this.critGroup.forEach((children) => {
      children.forEach((child) => {
        child.valueFilters = child.valueDefinitions;
        child.valueFilters[0].selectedConcepts = child.valueDefinitions[0].selectableConcepts;
      });
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
  }

  joinInnerArrays(i: number): void {
    this.critGroup = CritGroupArranger.joinInnerArrays(this.critGroup, i);
  }
}
