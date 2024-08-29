import { TerminologyEntry } from '../model/api/terminology/terminology';
import { Criterion } from '../model/api/query/criterion';
import { Comparator, OperatorOptions, ValueFilter } from '../model/api/query/valueFilter';
import {
  AttributeDefinition,
  ValueDefinition,
  ValueType,
} from '../model/api/terminology/valuedefinition';
import { TimeRestriction } from '../model/api/query/timerestriction';
import { V2 } from '../model/api/annotations';
import { AttributeFilter } from '../model/api/query/attributeFilter';
import { v3 as uuidv3 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { BackendService } from '../service/backend.service';

export class TermEntry2CriterionTranslator {
  private useFeatureTimeRestrictions = false;
  private queryVersion: string;

  constructor(useFeatureTimeRestrictions = false, queryVersion) {
    this.useFeatureTimeRestrictions = useFeatureTimeRestrictions;
    this.queryVersion = queryVersion;
  }

  public translate(termEntry: TerminologyEntry): Criterion {
    const criterion = new Criterion();

    criterion.context = termEntry.context;
    termEntry.termCodes?.forEach((termCode) => {
      criterion.termCodes.push(termCode);
    });
    criterion.display = termEntry.display;
    criterion.entity = termEntry.entity;
    criterion.children = termEntry.children;
    criterion.timeRestriction = this.createTimeRestriction(termEntry);
    criterion.requiredDataSelection = undefined;
    criterion.criterionHash = this.getCriterionHash(criterion);
    if (!criterion.uniqueID) {
      criterion.uniqueID = uuidv4();
    }
    return criterion;
  }

  public addAttributeAndValueFilterToCrit(
    crit: Criterion,
    valueDefinition: ValueDefinition,
    attributeDefinitions: AttributeDefinition[]
  ): Criterion {
    if (valueDefinition) {
      crit.valueFilters.push(this.createValueFilter(valueDefinition));
    }

    attributeDefinitions?.forEach((attributeDefinition) => {
      crit.attributeFilters.push(this.createAttributeFilter(attributeDefinition));
    });

    return crit;
  }

  public getCriterionHash(criterion): string {
    const termcode = criterion.termCodes[0];
    let contextVersion = '';
    let contextSystem = '';
    let contextCode = '';

    if (criterion.context) {
      contextSystem = criterion.context.system;
      contextCode = criterion.context.code;
      if (criterion.context.version) {
        contextVersion = criterion.context.version;
      }
    } else {
      criterion.isinvalid = true;
    }

    const contextTermcodeHashInput =
      contextSystem + contextCode + contextVersion + termcode.system + termcode.code;

    return uuidv3(contextTermcodeHashInput, BackendService.BACKEND_UUID_NAMESPACE);
  }

  // noinspection JSMethodCanBeStatic
  private createValueFilter(valueDefinition: ValueDefinition): ValueFilter {
    const valueFilter = new ValueFilter();
    valueFilter.display = valueDefinition.display;
    valueFilter.valueDefinition = valueDefinition;

    if (valueDefinition.type === ValueType.CONCEPT) {
      valueFilter.type = OperatorOptions.CONCEPT;
      valueFilter.selectedConcepts = [];
    } else if (valueDefinition.type === ValueType.QUANTITY) {
      valueFilter.type = OperatorOptions.QUANTITY_COMPARATOR;
      valueFilter.unit =
        valueDefinition.allowedUnits.length > 0
          ? valueDefinition.allowedUnits[0]
          : { code: '', display: '' };
      valueFilter.value = valueDefinition.min ? valueDefinition.min : 0;
      valueFilter.minValue = valueDefinition.min ? valueDefinition.min : 0;
      valueFilter.maxValue = valueDefinition.max ? valueDefinition.max : 0;
      valueFilter.min = valueDefinition.min;
      valueFilter.max = valueDefinition.max;
      valueFilter.precision = valueDefinition.precision;
      valueFilter.comparator = Comparator.NONE;
    }

    return valueFilter;
  }

  // noinspection JSMethodCanBeStatic
  private createAttributeFilter(attributeDefinition: AttributeDefinition): AttributeFilter {
    const attributeFilter = new AttributeFilter();
    attributeFilter.display = attributeDefinition.display;
    attributeFilter.attributeDefinition = attributeDefinition;

    if (attributeDefinition.type === ValueType.CONCEPT) {
      attributeFilter.type = OperatorOptions.CONCEPT;
      attributeFilter.selectedConcepts = [];
    } else if (attributeDefinition.type === ValueType.QUANTITY) {
      attributeFilter.type = OperatorOptions.QUANTITY_COMPARATOR;
      attributeFilter.unit =
        attributeDefinition.allowedUnits.length > 0
          ? attributeDefinition.allowedUnits[0]
          : { code: '', display: '' };
      attributeFilter.value = attributeDefinition.min ? attributeDefinition.min : 0;
      attributeFilter.minValue = attributeDefinition.min ? attributeDefinition.min : 0;
      attributeFilter.maxValue = attributeDefinition.max ? attributeDefinition.max : 0;
      attributeFilter.min = attributeDefinition.min;
      attributeFilter.max = attributeDefinition.max;
      attributeFilter.precision = attributeDefinition.precision;
      attributeFilter.comparator = Comparator.NONE;
    }

    return attributeFilter;
  }

  @V2()
  private createTimeRestriction(termEntry: TerminologyEntry): TimeRestriction {
    if (!this.useFeatureTimeRestrictions) {
      return undefined;
    }

    return termEntry.timeRestrictionAllowed ? new TimeRestriction() : undefined;
  }
}
