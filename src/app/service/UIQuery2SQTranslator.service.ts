import { Injectable } from '@angular/core';
import { StructuredQuery } from '../model/StructuredQuery/StructuredQuery';
import { ObjectHelper } from '../modules/querybuilder/controller/ObjectHelper';
import { TerminologyCode } from '../model/terminology/Terminology';
import { FeatureService } from './feature.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import {
  AbstractAttributeFilters,
  Comparator,
  OperatorOptions,
} from '../model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { QuantityComparatorFilter } from '../model/StructuredQuery/CriterionSQ/QuantityFilter/QuantityComparatorFilter';
import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/CriterionSQ/AbstractStructuredQueryFilters';
import { QuantityRangeFilter } from '../model/StructuredQuery/CriterionSQ/QuantityFilter/QuantityRangeFilter';
import { Query } from '../model/FeasibilityQuery/Query';
import { ReferenceFilter } from '../model/StructuredQuery/CriterionSQ/ReferenceFilter/ReferenceFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/CriterionSQ/ConceptFilter/ConceptAttributeFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/CriterionSQ/ConceptFilter/ConceptValueFilter';
import { StructuredQueryCriterion } from '../model/StructuredQuery/CriterionSQ/StructuredQueryCriterion';
import { AbstractQuantityFilter } from '../model/StructuredQuery/CriterionSQ/QuantityFilter/AbstractQuantityFilter';
import { TimeRestrictionType } from '../model/FeasibilityQuery/TimeRestriction';
import { AbstractTimeRestriction } from '../model/StructuredQuery/CriterionSQ/TimeRestriction/AbstractTimeRestriction';
import { AfterFilter } from '../model/StructuredQuery/CriterionSQ/TimeRestriction/AfterFilter';
import { AtFilter } from '../model/StructuredQuery/CriterionSQ/TimeRestriction/AtFilter';
import { BeforeFilter } from '../model/StructuredQuery/CriterionSQ/TimeRestriction/BeforeFilter';
import { BetweenFilter } from '../model/StructuredQuery/CriterionSQ/TimeRestriction/BetweenFilter';

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
      result.inclusionCriteria = this.translateCriterionGroup(inclusionCriteria);
    } else {
      result.inclusionCriteria = [];
    }
    if (exclusionCriteria.length > 0) {
      result.exclusionCriteria = this.translateCriterionGroup(exclusionCriteria);
    } else {
      result.exclusionCriteria = undefined;
    }
    if (query.consent) {
      result.inclusionCriteria.push(this.getConsent());
    }
    return result;
  }

  private getConsent(): StructuredQueryCriterion[] {
    return [
      {
        termCodes: [
          {
            code: 'central-consent',
            system: 'mii.abide',
            display: 'MDAT wissenschaftlich nutzen - EU DSGVO Niveau',
          },
        ],
      },
    ];
  }

  private translateCriterionGroup(criterionGroup: Criterion[][]): StructuredQueryCriterion[][] {
    const criterionSQ: StructuredQueryCriterion[][] = [];
    criterionGroup.forEach((criterionArray) => {
      const innerArraySQ: StructuredQueryCriterion[] = [];
      criterionArray.forEach((criterion) => {
        innerArraySQ.push(this.assignCriterionElements(criterion));
      });
      criterionSQ.push(innerArraySQ);
    });
    return criterionSQ;
  }

  /**
   *
   * @todo timeRestriction braucht ne Logik also ne Funktion
   */
  private assignCriterionElements(criterion: Criterion): StructuredQueryCriterion {
    const criterionSQ = new StructuredQueryCriterion();
    criterionSQ.attributeFilters = this.addAttributeFiltersToSQ(criterion);
    criterionSQ.context = this.addContextToSQ(criterion);
    criterionSQ.termCodes = criterion.termCodes;
    criterionSQ.timeRestriction = this.addTimeRestrictionToSQ(criterion);
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
  private addValueFiltersToSQ(criterion: Criterion): AbstractStructuredQueryFilters | undefined {
    const abstractValueFilter: AbstractStructuredQueryFilters[] = [];
    const valueFilterType = criterion.valueFilters[0].type;
    if (criterion.valueFilters?.length > 0) {
      if (this.isConcept(valueFilterType)) {
        abstractValueFilter.push(this.setConceptValueFilter(criterion.valueFilters[0]));
      }
      if (this.isQuantity(valueFilterType)) {
        if (this.isNoneComparator(criterion.valueFilters[0].comparator)) {
          return undefined;
        } else {
          abstractValueFilter.push(this.setQuantity(criterion.valueFilters[0]));
        }
      }
      return abstractValueFilter[0];
    }
  }

  private addAttributeFiltersToSQ(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    const abstractFilter: AbstractStructuredQueryFilters[] = [];
    if (criterion.attributeFilters.length > 0) {
      criterion.attributeFilters?.forEach((attributeFilter) => {
        if (this.isConcept(attributeFilter.type)) {
          abstractFilter.push(this.setConceptAttributeFilter(attributeFilter));
        }
        if (this.isQuantity(attributeFilter.type)) {
          if (!this.isNoneComparator(attributeFilter.comparator)) {
            abstractFilter.push(this.setQuantity(attributeFilter));
          }
        }
        if (this.isReference(attributeFilter.type)) {
          abstractFilter.push(this.setReferences(criterion.linkedCriteria, attributeFilter));
        }
      });
      return abstractFilter;
    } else {
      return undefined;
    }
  }

  /**
   *
   * @todo check if "quantityFilter as QuantityComparatorFilter" is working
   * @returns
   */
  private setQuantity(quantityFilter: AbstractQuantityFilter): AbstractQuantityFilter {
    const type = quantityFilter.type;
    if (this.isQuantityComparator(type)) {
      return this.setQuantityComparatorAttributes(quantityFilter as QuantityComparatorFilter);
    }
    if (this.isQuantityRange(type)) {
      return this.setQuantityRangeAttributes(quantityFilter as QuantityRangeFilter);
    }
  }

  private addTimeRestrictionToSQ(criterion: Criterion): AbstractTimeRestriction {
    if (criterion.timeRestriction) {
      if (criterion.timeRestriction.minDate) {
        const startDate = new Date(criterion.timeRestriction.minDate);
        const endDate = new Date(criterion.timeRestriction.maxDate);
        const offset = startDate.getTimezoneOffset() / -60;
        startDate.setHours(23 + offset, 59, 59, 999);
        endDate.setHours(offset, 0, 0, 0);

        switch (criterion.timeRestriction.tvpe) {
          case TimeRestrictionType.AFTER: {
            const afterFilter = new AfterFilter();
            afterFilter.afterDate = startDate.toISOString().split('T')[0];
            return afterFilter;
          }
          case TimeRestrictionType.AT: {
            const atFilter = new AtFilter();
            atFilter.afterDate = startDate.toISOString().split('T')[0];
            atFilter.beforeDate = startDate.toISOString().split('T')[0];
            return atFilter;
          }
          case TimeRestrictionType.BEFORE: {
            const beforeFilter = new BeforeFilter();
            beforeFilter.beforeDate = startDate.toISOString().split('T')[0];
            return beforeFilter;
          }
          case TimeRestrictionType.BETWEEN: {
            const betweenFilter = new BetweenFilter();
            betweenFilter.afterDate = startDate.toISOString().split('T')[0];
            betweenFilter.beforeDate = endDate.toISOString().split('T')[0];
            return betweenFilter;
          }
        }
      }
    }
  }

  private setConceptAttributeFilter(attributeFilter: AttributeFilter): ConceptAttributeFilter {
    const filter = new ConceptAttributeFilter();
    filter.attributeCode = attributeFilter.attributeCode;
    filter.selectedConcepts = attributeFilter.selectedConcepts;
    return filter;
  }

  private setConceptValueFilter(valueFilter: ValueFilter): ConceptValueFilter {
    const filter = new ConceptValueFilter();
    filter.selectedConcepts = valueFilter.selectedConcepts;
    return filter;
  }

  private setReferences(
    linkedCriteria: Criterion[],
    attributeFilter: AttributeFilter
  ): ReferenceFilter {
    const filter = new ReferenceFilter();
    filter.attributeCode = attributeFilter.attributeCode;
    filter.criteria = this.setEachLinkedCriteria(linkedCriteria);
    return filter;
  }

  private setEachLinkedCriteria(linkedCriteria: Criterion[]): StructuredQueryCriterion[] {
    const linkedCriteriaArray = new Array<StructuredQueryCriterion>();
    linkedCriteria.forEach((linkedCriterion) => {
      linkedCriteriaArray.push(this.assignCriterionElements(linkedCriterion));
    });
    return linkedCriteriaArray;
  }

  private setQuantityComparatorAttributes(
    quantityComparatorFilter: QuantityComparatorFilter
  ): QuantityComparatorFilter {
    const filter = new QuantityComparatorFilter();
    filter.comparator = quantityComparatorFilter.comparator;
    filter.unit = quantityComparatorFilter.unit;
    filter.value = quantityComparatorFilter.value;
    return filter;
  }

  private setQuantityRangeAttributes(
    quantityRangeFilter: QuantityRangeFilter
  ): QuantityRangeFilter {
    const filter = new QuantityRangeFilter();
    filter.maxValue = quantityRangeFilter.maxValue;
    filter.minValue = quantityRangeFilter.minValue;
    filter.unit = quantityRangeFilter.unit;
    return filter;
  }

  private isQuantity(type: OperatorOptions) {
    return this.isQuantityComparator(type) || this.isQuantityRange(type) ? true : false;
  }

  private isConcept(type: OperatorOptions): boolean {
    return type === OperatorOptions.CONCEPT ? true : false;
  }

  private isReference(type: OperatorOptions): boolean {
    return type === OperatorOptions.REFERENCE ? true : false;
  }

  private isQuantityRange(type: OperatorOptions): boolean {
    return type === OperatorOptions.QUANTITY_RANGE ? true : false;
  }

  private isQuantityComparator(type: OperatorOptions): boolean {
    return type === OperatorOptions.QUANTITY_COMPARATOR ? true : false;
  }

  private isNoneComparator(type: Comparator): boolean {
    return type === Comparator.NONE ? true : false;
  }
}
