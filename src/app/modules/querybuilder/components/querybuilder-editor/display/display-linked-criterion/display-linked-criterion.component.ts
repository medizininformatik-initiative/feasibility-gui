import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from '../../../../model/api/query/criterion';
import { Query } from '../../../../model/api/query/query';
import { ValueFilter } from '../../../../model/api/query/valueFilter';
import { FeatureService } from '../../../../../../service/feature.service';

@Component({
  selector: 'num-display-linked-criterion',
  templateUrl: './display-linked-criterion.component.html',
  styleUrls: ['./display-linked-criterion.component.scss'],
})
export class DisplayLinkedCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion;

  @Input()
  query: Query;

  isinvalid: boolean;

  constructor(public featureService: FeatureService) {}

  ngOnInit(): void {
    console.log('Hello');
    this.isinvalid = this.criterion.isinvalid === true;
  }

  getValueFilters(): ValueFilter[] {
    if (this.criterion.valueFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]];
      }

      return this.criterion.valueFilters;
    } else {
      return [];
    }
  }
  getAttributeFilters(): ValueFilter[] {
    if (this.criterion.attributeFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.attributeFilters.length === 0
          ? []
          : [this.criterion.attributeFilters[0]];
      }

      return this.criterion.attributeFilters;
    } else {
      return [];
    }
  }
}
