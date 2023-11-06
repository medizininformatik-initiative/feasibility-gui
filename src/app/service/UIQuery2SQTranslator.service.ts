import { Injectable } from '@angular/core';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { ObjectHelper } from '../modules/querybuilder/controller/ObjectHelper';
import { CriterionSQ } from '../model/StructuredQuery/CriterionSQ/CriterionSQ';
import { TerminologyCode } from '../model/terminology/Terminology';
import { FeatureService } from './feature.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import {
  Comparator,
  OperatorOptions,
} from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { QuantityComparatorFilter } from '../model/StructuredQuery/CriterionSQ/QuantityComparatorFilter';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AbstractStructuredQueryFilter } from '../model/StructuredQuery/CriterionSQ/AbstractStructuredQueryFilter';
import { QuantityRangeFilter } from '../model/StructuredQuery/CriterionSQ/QuantityRangeFilter';
import { ValueType } from '../model/terminology/AttributeDefinitions/AbstractAttributeDefinitions';
import { Query } from '../model/FeasibilityQuery/Query';

@Injectable({
  providedIn: 'root',
})
export class UIQuery2SQTranslator {
  constructor(private featureService: FeatureService) {}

  public translateToSQ(query: Query): StructuredQuery {
    const result = new StructuredQuery();

    if (query.display) {
      result.display = query.display;
    }
    const exclusionCriteria = ObjectHelper.clone(query.groups[0].exclusionCriteria);
    const inclusionCriteria = ObjectHelper.clone(query.groups[0].inclusionCriteria);

    if (inclusionCriteria.length > 0) {
      result.inclusionCriteria = this.translateCriteriontGroup(inclusionCriteria);
    } else {
      result.inclusionCriteria = [];
    }

    if (exclusionCriteria.length > 0) {
      //result.exclusionCriteria = this.translateCritGroupV2(exclusionCriteria);
    } else {
      result.exclusionCriteria = undefined;
    }

    if (query.consent) {
      //result.inclusionCriteria.push(this.getConsent());
    }
    return result;
  }

  private translateCriteriontGroup(inclusionCriteria: Criterion[][]): CriterionSQ[][] {
    const criterionSQ: CriterionSQ[][] = [];
    inclusionCriteria.forEach((criterionArray) => {
      const innerArraySQ: CriterionSQ[] = [];
      criterionArray.forEach((criterion) => {
        this.assignCriterionElements(criterion);
      });
    });
    return criterionSQ;
  }

  private assignCriterionElements(criterion: Criterion) {
    const criterionSQ = new CriterionSQ();
    criterionSQ.attributeFilters = this.addAttributeFiltersToSQ(criterion);
    criterionSQ.context = this.addContextToSQ(criterion);
    criterionSQ.termCodes = criterion.termCodes;
    criterionSQ.timeRestriction = criterion.timeRestriction;
    criterionSQ.valueFilter = this.addValueFiltersToSQ(criterion);
    return criterionSQ;
  }

  private addContextToSQ(criterion: Criterion): TerminologyCode | undefined {
    if (this.featureService.getSendSQContextToBackend()) {
      return criterion.context;
    } else {
      return undefined;
    }
  }

  //switch einbauen
  private addValueFiltersToSQ(criterion: Criterion): AbstractStructuredQueryFilter | undefined {
    if (criterion.valueFilters?.length > 0) {
      if (this.isNoneComparator(criterion.valueFilters[0].comparator)) {
        return undefined;
      } else {
        const valueFilterType = criterion.valueFilters[0].type;
        if (this.isQunatityComparator(valueFilterType)) {
          return this.setQuantityComparatorAttributes(criterion.valueFilters[0]);
        }
        if (this.isQunatityRange(valueFilterType)) {
          return this.setQuantityRangeAttributes(criterion.valueFilters[0]);
        }
        return criterion.valueFilters[0];
      }
    }
  }

  private setQuantityComparatorAttributes(valueFilter: ValueFilter): QuantityComparatorFilter {
    const quantityComparatorFilter = new QuantityComparatorFilter();
    quantityComparatorFilter.comparator = valueFilter.comparator;
    quantityComparatorFilter.max = valueFilter.max;
    quantityComparatorFilter.min = valueFilter.min;
    return quantityComparatorFilter;
  }

  private setQuantityRangeAttributes(valueFilter: ValueFilter): QuantityRangeFilter {
    const quantityComparatorFilter = new QuantityRangeFilter();
    quantityComparatorFilter.maxValue = valueFilter.maxValue;
    quantityComparatorFilter.minValue = valueFilter.minValue;
    return quantityComparatorFilter;
  }

  private addAttributeFiltersToSQ(criterion: Criterion): AttributeFilter[] | undefined {
    if (criterion.attributeFilters?.length > 0) {
      return criterion.attributeFilters;
    }
  }

  private isConcept(type: ValueType): boolean {
    return type === ValueType.CONCEPT ? true : false;
  }

  private isRefrence(type: ValueType): boolean {
    return type === ValueType.REFERENCE ? true : false;
  }

  private isQunatityRange(type: OperatorOptions): boolean {
    return type === OperatorOptions.QUANTITY_RANGE ? true : false;
  }

  private isQunatityComparator(type: OperatorOptions): boolean {
    return type === OperatorOptions.QUANTITY_COMPARATOR ? true : false;
  }

  private isNoneComparator(type: Comparator): boolean {
    return type === Comparator.NONE ? true : false;
  }
}
