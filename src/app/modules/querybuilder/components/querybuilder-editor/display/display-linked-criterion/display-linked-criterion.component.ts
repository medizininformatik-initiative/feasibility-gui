/*import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeatureService } from 'src/app/service/Feature.service';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

@Component({
  selector: 'num-display-linked-criterion',
  templateUrl: './display-linked-criterion.component.html',
  styleUrls: ['./display-linked-criterion.component.scss'],
})
export class DisplayLinkedCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion;

  isinvalid: boolean;

  constructor(public featureService: FeatureService) {}

  ngOnInit(): void {
    this.isinvalid = this.criterion.isInvalid === true;
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
  getAttributeFilters(): AttributeFilter[] {
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
*/
