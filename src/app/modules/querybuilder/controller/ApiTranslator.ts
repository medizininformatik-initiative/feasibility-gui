import { Query, QueryOnlyV1, QueryOnlyV2 } from '../model/api/query/query';
import { Criterion, CriterionOnlyV1, CriterionOnlyV2 } from '../model/api/query/criterion';
import { ObjectHelper } from './ObjectHelper';
import { OperatorOptions } from '../model/api/query/valueFilter';
import { TimeRestrictionType } from '../model/api/query/timerestriction';

// translates a query with groups to the agreed format of queries in version 1 (without groups)
export class ApiTranslator {
  translateToV1(query: Query): QueryOnlyV1 {
    const result = new QueryOnlyV1();

    result.display = query.display;
    const exclusionCriteria = ObjectHelper.clone(query.groups[0].exclusionCriteria);
    const inclusionCriteria = ObjectHelper.clone(query.groups[0].inclusionCriteria);

    result.inclusionCriteria = this.translateCritGroupV1(inclusionCriteria);

    if (exclusionCriteria.length > 0) {
      result.exclusionCriteria = this.translateCritGroupV1(exclusionCriteria);
    } else {
      result.exclusionCriteria = undefined;
    }

    return result;
  }

  private translateCritGroupV1(inclusionCriteria: Criterion[][]): CriterionOnlyV1[][] {
    const result: CriterionOnlyV1[][] = [];
    inclusionCriteria.forEach((criterionArray) => {
      const innerArrayV1: CriterionOnlyV1[] = [];
      criterionArray.forEach((criterion) => {
        const criterionV1 = new CriterionOnlyV1();
        criterionV1.termCode = criterion.termCodes[0];
        criterionV1.timeRestriction = criterion.timeRestriction;
        if (criterion.valueFilters.length > 0) {
          criterionV1.valueFilter = criterion.valueFilters[0];
          criterionV1.valueFilter.valueDefinition = undefined;
        }

        this.removeNonApiFieldsV1(criterionV1);
        innerArrayV1.push(criterionV1);
      });
      result.push(innerArrayV1);
    });

    return result;
  }

  // noinspection JSMethodCanBeStatic
  private removeNonApiFieldsV1(criterion: CriterionOnlyV1): void {
    if (criterion.valueFilter) {
      // criterion.valueFilter.valueDefinition = null
      criterion.valueFilter.max = undefined;
      criterion.valueFilter.min = undefined;
      criterion.valueFilter.precision = undefined;

      if (criterion.valueFilter.type === OperatorOptions.CONCEPT) {
        criterion.valueFilter.comparator = undefined;
        criterion.valueFilter.maxValue = undefined;
        criterion.valueFilter.minValue = undefined;
        criterion.valueFilter.value = undefined;
        criterion.valueFilter.unit = undefined;
      } else if (criterion.valueFilter.type === OperatorOptions.QUANTITY_RANGE) {
        criterion.valueFilter.comparator = undefined;
        criterion.valueFilter.value = undefined;
        criterion.valueFilter.selectedConcepts = undefined;
        if (criterion.valueFilter.unit.code === '') {
          criterion.valueFilter.unit = undefined;
        }
      } else if (criterion.valueFilter.type === OperatorOptions.QUANTITY_COMPARATOR) {
        criterion.valueFilter.minValue = undefined;
        criterion.valueFilter.maxValue = undefined;
        criterion.valueFilter.selectedConcepts = undefined;
        if (criterion.valueFilter.unit.code === '') {
          criterion.valueFilter.unit = undefined;
        }
      }
    }
  }

  translateToV2(query: Query): QueryOnlyV2 {
    const result = new QueryOnlyV2();

    result.display = query.display;
    const exclusionCriteria = ObjectHelper.clone(query.groups[0].exclusionCriteria);
    const inclusionCriteria = ObjectHelper.clone(query.groups[0].inclusionCriteria);

    if (inclusionCriteria.length > 0) {
      result.inclusionCriteria = this.translateCritGroupV2(inclusionCriteria);
    } else {
      result.inclusionCriteria = [];
    }

    if (exclusionCriteria.length > 0) {
      result.exclusionCriteria = this.translateCritGroupV2(exclusionCriteria);
    } else {
      result.exclusionCriteria = undefined;
    }

    return result;
  }

  private translateCritGroupV2(inclusionCriteria: Criterion[][]): CriterionOnlyV2[][] {
    const result: CriterionOnlyV2[][] = [];
    inclusionCriteria.forEach((criterionArray) => {
      const innerArrayV2: CriterionOnlyV2[] = [];
      criterionArray.forEach((criterion) => {
        const criterionV2 = new CriterionOnlyV2();
        criterionV2.termCodes = criterion.termCodes;
        criterionV2.timeRestriction = criterion.timeRestriction;
        if (criterion.valueFilters.length > 0) {
          criterionV2.valueFilter = criterion.valueFilters[0];
          criterionV2.valueFilter.valueDefinition = undefined;
        }
        if (criterion.attributeFilters?.length > 0) {
          criterion.attributeFilters.forEach((attribute) => {
            if (attribute.type === OperatorOptions.CONCEPT) {
              if (attribute.selectedConcepts.length > 0) {
                criterionV2.attributeFilters.push(attribute);
              }
            } else {
              criterionV2.attributeFilters.push(attribute);
            }
            attribute.attributeCode = attribute.attributeDefinition?.attributeCode;
          });
        }
        this.editTimeRestrictionsV2(criterionV2);
        this.removeNonApiFieldsV2(criterionV2);
        innerArrayV2.push(criterionV2);
      });
      result.push(innerArrayV2);
    });

    return result;
  }

  // noinspection JSMethodCanBeStatic
  private removeNonApiFieldsV2(criterion: CriterionOnlyV2): void {
    if (criterion.valueFilter) {
      criterion.valueFilter.precision = undefined;
      if (criterion.valueFilter.type === OperatorOptions.QUANTITY_COMPARATOR) {
        criterion.valueFilter.minValue = undefined;
        criterion.valueFilter.maxValue = undefined;
      }
      if (criterion.valueFilter.type === OperatorOptions.QUANTITY_RANGE) {
        criterion.valueFilter.comparator = undefined;
        criterion.valueFilter.value = undefined;
      }
    }
    if (criterion.attributeFilters?.length > 0) {
      criterion.attributeFilters.forEach((attribute) => {
        attribute.attributeDefinition = undefined;
        attribute.precision = undefined;
        if (attribute.type === OperatorOptions.QUANTITY_RANGE) {
          attribute.value = undefined;
        }
      });
    } else {
      criterion.attributeFilters = undefined;
    }
  }

  // noinspection JSMethodCanBeStatic
  private editTimeRestrictionsV2(criterion: CriterionOnlyV2): void {
    if (criterion.timeRestriction) {
      if (criterion.timeRestriction.minDate) {
        const minTemp = new Date(criterion.timeRestriction.minDate);
        const maxTemp = new Date(criterion.timeRestriction.maxDate);
        const offset = minTemp.getTimezoneOffset() / -60;
        minTemp.setHours(23 + offset, 59, 59, 999);
        maxTemp.setHours(offset, 0, 0, 0);

        switch (criterion.timeRestriction.tvpe) {
          case TimeRestrictionType.AFTER: {
            // minTemp.setDate(minTemp.getDate() + 1)
            criterion.timeRestriction.afterDate = minTemp.toISOString().split('T')[0];
            criterion.timeRestriction.beforeDate = undefined;
            break;
          }
          /*case TimeRestrictionType.AFTER_OR_AT: {
            criterion.timeRestriction.afterDate = minTemp.toISOString().split("T")[0]
            criterion.timeRestriction.beforeDate = undefined
            break
          }*/
          case TimeRestrictionType.BEFORE: {
            // minTemp.setDate(minTemp.getDate() - 1)
            criterion.timeRestriction.beforeDate = minTemp.toISOString().split('T')[0];
            criterion.timeRestriction.afterDate = undefined;
            break;
          }
          /*case TimeRestrictionType.BEFORE_OR_AT: {
            criterion.timeRestriction.beforeDate = minTemp.toISOString().split("T")[0]
            criterion.timeRestriction.afterDate = undefined
            break
          }*/
          case TimeRestrictionType.AT: {
            criterion.timeRestriction.beforeDate = minTemp.toISOString().split('T')[0];
            criterion.timeRestriction.afterDate = minTemp.toISOString().split('T')[0];
            break;
          }
          /*case TimeRestrictionType.NOT_AT: {
            minTemp.setDate(minTemp.getDate() - 1)
            criterion.timeRestriction.beforeDate = minTemp.toISOString().split("T")[0]
            minTemp.setDate(minTemp.getDate() + 2)
            criterion.timeRestriction.afterDate = minTemp.toISOString().split("T")[0]
            break
          }*/
          case TimeRestrictionType.BETWEEN: {
            if (criterion.timeRestriction.maxDate) {
              criterion.timeRestriction.beforeDate = maxTemp.toISOString().split('T')[0];
              criterion.timeRestriction.afterDate = minTemp.toISOString().split('T')[0];
            } else {
              criterion.timeRestriction = undefined;
            }
            break;
          }
        }
      } else {
        criterion.timeRestriction = undefined;
      }
      if (criterion.timeRestriction) {
        criterion.timeRestriction.tvpe = undefined;
        criterion.timeRestriction.minDate = undefined;
        criterion.timeRestriction.maxDate = undefined;
      }
    }
  }

  translateSQtoUIQuery(uiquery: Query, sqquery: any): Query {
    const invalidCriteria = sqquery.invalidTerms;
    const inclusion = sqquery.content.inclusionCriteria ? sqquery.content.inclusionCriteria : [];
    uiquery.groups[0].inclusionCriteria = this.translateSQtoUICriteria(inclusion, invalidCriteria);
    const exclusion = sqquery.content.exclusionCriteria ? sqquery.content.exclusionCriteria : [];
    uiquery.groups[0].exclusionCriteria = this.translateSQtoUICriteria(exclusion, invalidCriteria);
    return uiquery;
  }

  private translateSQtoUICriteria(inexclusion, invalidCriteria): any {
    const invalidCriteriaSet: Set<string> = new Set();
    invalidCriteria.forEach((invalids) => {
      invalidCriteriaSet.add(JSON.stringify(invalids));
    });

    inexclusion.forEach((and) => {
      and.forEach((or) => {
        or.valueFilters = [];
        if (or.valueFilter) {
          or.valueFilters.push(or.valueFilter);
          or.valueFilter = undefined;
          if (or.valueFilters[0].type === 'quantity-range') {
            or.valueFilters[0].value = 0;
            or.valueFilters[0].precision = 1;
          }
          if (or.valueFilters[0].type === 'quantity-comparator') {
            or.valueFilters[0].precision = 1;
          }
        }
        if (!or.attributeFilters) {
          or.attributeFilters = [];
        }
        or.attributeFilters.forEach((attribute) => {
          attribute.attributeDefinition = {};
          attribute.attributeDefinition.attributeCode = ObjectHelper.clone(attribute.attributeCode);
          attribute.attributeCode = undefined;
          if (attribute.type === 'quantity-range') {
            attribute.value = 0;
            attribute.precision = 1;
          }
          if (attribute.type === 'quantity-comparator') {
            attribute.precision = 1;
          }
        });
        or.display = or.termCodes[0].display;
        or.children = [];
        if (or.timeRestriction) {
          let type: TimeRestrictionType;
          if (or.timeRestriction.afterDate && or.timeRestriction.beforeDate) {
            if (or.timeRestriction.beforeDate === or.timeRestriction.afterDate) {
              type = TimeRestrictionType.AT;
            } else {
              type = TimeRestrictionType.BETWEEN;
            }
          }
          if (or.timeRestriction.afterDate && !or.timeRestriction.beforeDate) {
            type = TimeRestrictionType.AFTER;
          }
          if (!or.timeRestriction.afterDate && or.timeRestriction.beforeDate) {
            type = TimeRestrictionType.BEFORE;
            or.timeRestriction.afterDate = or.timeRestriction.beforeDate;
          }
          or.timeRestriction = {
            tvpe: type,
            minDate: or.timeRestriction.afterDate
              ? new Date(or.timeRestriction.afterDate)
              : undefined,
            maxDate: or.timeRestriction.beforeDate
              ? new Date(or.timeRestriction.beforeDate)
              : undefined,
          };
        }
        or.isinvalid = invalidCriteriaSet.has(JSON.stringify(or.termCodes[0]));
      });
    });
    return inexclusion;
  }
}
