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
import { AbstractStructuredQueryFilters } from '../model/StructuredQuery/CriterionSQ/AbstractStructuredQueryFilters';
import { QuantityRangeFilter } from '../model/StructuredQuery/CriterionSQ/QuantityRangeFilter';
import { Query } from '../model/FeasibilityQuery/Query';
import { ReferenceFilter } from '../model/StructuredQuery/CriterionSQ/ReferenceFilter';
import { ConceptAttributeFilter } from '../model/StructuredQuery/CriterionSQ/ConceptAttributeFilter';
import { ConceptValueFilter } from '../model/StructuredQuery/CriterionSQ/ConceptValueFilter';

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
      //result.inclusionCriteria.push(this.getConsent());
    }
    return result;
  }

  private translateCriterionGroup(inclusionCriteria: Criterion[][]): CriterionSQ[][] {
    const criterionSQ: CriterionSQ[][] = [];
    inclusionCriteria.forEach((criterionArray) => {
      const innerArraySQ: CriterionSQ[] = [];
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
  private assignCriterionElements(criterion: Criterion): CriterionSQ {
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

  /**
   * @todo wie valueFilter aufbauen
   */
  private addAttributeFiltersToSQ(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    const abstractAttributeFilter: AbstractStructuredQueryFilters[] = [];
    criterion.attributeFilters?.forEach((attributeFilter) => {
      if (this.isConcept(attributeFilter.type)) {
        abstractAttributeFilter.push(this.setConceptAttributeFilter(attributeFilter));
      }
      if (this.isQuantity(attributeFilter.type)) {
        if (!this.isNoneComparator(attributeFilter.comparator)) {
          abstractAttributeFilter.push(this.setQuantity(attributeFilter));
        }
      }
      if (this.isReference(attributeFilter.type)) {
        abstractAttributeFilter.push(this.setReferences(criterion.linkedCriteria, attributeFilter));
      }
    });
    return abstractAttributeFilter;
  }

  /**
   *
   * @todo check if "quantityFilter as QuantityComparatorFilter" is working
   * @returns
   */
  private setQuantity(
    quantityFilter: AbstractStructuredQueryFilters
  ): AbstractStructuredQueryFilters {
    if (this.isQuantityComparator(quantityFilter.type)) {
      return this.setQuantityComparatorAttributes(quantityFilter as QuantityComparatorFilter);
    }
    if (this.isQuantityRange(quantityFilter.type)) {
      return this.setQuantityRangeAttributes(quantityFilter as QuantityRangeFilter);
    }
  }

  private setConceptAttributeFilter(attributeFilter: AttributeFilter): ConceptAttributeFilter {
    const conceptAttributeFilter = new ConceptAttributeFilter();
    conceptAttributeFilter.attributeCode = attributeFilter.attributeCode;
    conceptAttributeFilter.selectedConcepts = attributeFilter.selectedConcepts;
    conceptAttributeFilter.type = attributeFilter.type;
    return conceptAttributeFilter;
  }

  private setConceptValueFilter(valueFilter: ValueFilter): ConceptValueFilter {
    const conceptValueFilter = new ConceptValueFilter();
    conceptValueFilter.selectedConcepts = valueFilter.selectedConcepts;
    conceptValueFilter.type = valueFilter.type;
    return conceptValueFilter;
  }

  private setReferences(linkedCriteria: Criterion[], attributeFilter: AttributeFilter) {
    const referenceFilter = new ReferenceFilter();
    referenceFilter.attributeCode = attributeFilter.attributeCode;
    referenceFilter.criteria = this.setEachLinkedCriteria(linkedCriteria);
    referenceFilter.type = attributeFilter.type;
    return referenceFilter;
  }

  private setEachLinkedCriteria(linkedCriteria: Criterion[]): CriterionSQ[] {
    const linkedCriteriaArray = new Array<CriterionSQ>();
    linkedCriteria.forEach((linkedCriterion) => {
      linkedCriteriaArray.push(this.assignCriterionElements(linkedCriterion));
    });
    return linkedCriteriaArray;
  }

  private setQuantityComparatorAttributes(
    quantityFilter: QuantityComparatorFilter
  ): QuantityComparatorFilter {
    const quantityComparatorFilter = new QuantityComparatorFilter();
    quantityComparatorFilter.comparator = quantityFilter.comparator;
    quantityComparatorFilter.type = quantityFilter.type;
    quantityComparatorFilter.unit = quantityFilter.unit;
    quantityComparatorFilter.value = quantityFilter.value;
    return quantityComparatorFilter;
  }

  private setQuantityRangeAttributes(quantityFilter: QuantityRangeFilter): QuantityRangeFilter {
    const quantityRangeFilter = new QuantityRangeFilter();
    quantityRangeFilter.maxValue = quantityFilter.maxValue;
    quantityRangeFilter.minValue = quantityFilter.minValue;
    quantityRangeFilter.type = quantityFilter.type;
    quantityRangeFilter.unit = quantityFilter.unit;
    return quantityRangeFilter;
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
