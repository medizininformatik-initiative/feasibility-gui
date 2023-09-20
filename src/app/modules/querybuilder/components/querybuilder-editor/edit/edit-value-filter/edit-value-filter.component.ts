import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
  ValueFilter,
} from '../../../../model/api/query/valueFilter';
import { TerminologyCode } from '../../../../model/api/terminology/terminology';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { Query } from '../../../../model/api/query/query';
import { Criterion } from '../../../../model/api/query/criterion';
import { ValueType } from '../../../../model/api/terminology/valuedefinition';
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'num-edit-value-definition',
  templateUrl: './edit-value-filter.component.html',
  styleUrls: ['./edit-value-filter.component.scss'],
})
export class EditValueFilterComponent implements OnInit, AfterViewInit {
  @Input()
  filter: ValueFilter;

  @ViewChildren(EditValueFilterConceptLineComponent)
  private checkboxes: QueryList<EditValueFilterConceptLineComponent>;

  @Input()
  filterType: string;

  @Input()
  query: Query;

  @Input()
  criterion: Criterion;
  resetQuantityDisabled = true;

  OperatorOptions: typeof OperatorOptions = OperatorOptions;

  selectedUnit: QuantityUnit;
  // Use string representation of concept because equivalent objects do not match in TypeScript (e.g. { a: 1 } !== { a: 1 })
  selectedConceptsAsJson: Set<string> = new Set();
  selectedReferenceAsJson: Set<string> = new Set();
  quantityFilterOption: string;
  // TODO: Try using enum
  quantityFilterOptions: Array<string> = ['EQUAL', 'LESS_THAN', 'GREATER_THAN', 'BETWEEN'];
  disableAnimation = true;

  constructor() {}

  ngOnInit(): void {
    this.filter?.selectedConcepts.forEach((concept) => {
      // bring the object into the right order for stringify
      const temp = {
        code: concept.code,
        display: concept.display,
        system: concept.system,
        uid: concept.uid,
      };
      this.selectedConceptsAsJson.add(JSON.stringify(temp));
    });

    if (this.filter.attributeDefinition?.type === ValueType.REFERENCE) {
      this.criterion.linkedCriteria.forEach((linkedCrit) => {
        // bring the object into the right order for stringify
        const temp2 = {
          code: linkedCrit.termCodes[0].code,
          display: linkedCrit.termCodes[0].display,
          system: linkedCrit.termCodes[0].system,
          uid: linkedCrit.termCodes[0].uid,
        };
        this.selectedReferenceAsJson.add(JSON.stringify(temp2));
      });
    }

    this.filter?.valueDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.filter?.unit)) {
        this.selectedUnit = allowedUnit;
      }
    });
    this.filter?.attributeDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.filter?.unit)) {
        this.selectedUnit = allowedUnit;
      }
    });

    this.quantityFilterOption = this.getQuantityFilterOption();
  }

  // Workaround for angular component issue #13870
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => (this.disableAnimation = false));
    if (this.filter.maxValue || this.filter.minValue || this.filter.value) {
      this.resetQuantityDisabled = false;
    }
  }

  getQuantityFilterOption(): string {
    if (!this.filter || this.filter.type === OperatorOptions.CONCEPT) {
      return null;
    }

    if (this.filter.type === OperatorOptions.QUANTITY_RANGE) {
      return 'BETWEEN';
    }

    switch (this.filter.comparator) {
      case Comparator.EQUAL:
        return 'EQUAL';
      case Comparator.GREATER_OR_EQUAL:
      case Comparator.GREATER_THAN:
        return 'GREATER_THAN';
      case Comparator.LESS_OR_EQUAL:
      case Comparator.LESS_THAN:
        return 'LESS_THAN';
      default:
        return null;
    }
  }

  roundMinValue(): void {
    this.filter.minValue = this.round(this.filter.minValue);
  }

  roundMaxValue(): void {
    this.filter.maxValue = this.round(this.filter.maxValue);
  }

  roundValue(): void {
    this.filter.value = this.round(this.filter.value);
  }

  round(value: number): number {
    const divisor = Math.pow(10, this.filter.precision);
    return Math.round(value * divisor) / divisor;
  }

  selectQuantityFilterOption(option: string): void {
    if (option === 'BETWEEN') {
      this.filter.type = OperatorOptions.QUANTITY_RANGE;
    } else {
      this.filter.type = OperatorOptions.QUANTITY_COMPARATOR;
      switch (option) {
        case 'EQUAL':
          this.filter.comparator = Comparator.EQUAL;
          break;
        case 'LESS_THAN':
          this.filter.comparator = Comparator.LESS_THAN;
          break;
        case 'GREATER_THAN':
          this.filter.comparator = Comparator.GREATER_THAN;
          break;
      }
    }
  }

  doSelectConcept(concept: TerminologyCode): void {
    // bring the object into the right order for stringify
    const temp = {
      code: concept.code,
      display: concept.display,
      system: concept.system,
      uid: concept.uid,
    };
    const conceptAsJson = JSON.stringify(temp);
    const criterionForLinking = this.getSelectedCriterion(temp);

    if (
      this.filter.attributeDefinition?.type === ValueType.CONCEPT ||
      this.filter.valueDefinition?.type === ValueType.CONCEPT
    ) {
      if (this.selectedConceptsAsJson.has(conceptAsJson)) {
        this.selectedConceptsAsJson.delete(conceptAsJson);
      } else {
        this.selectedConceptsAsJson.add(conceptAsJson);
      }

      this.filter.selectedConcepts = [];
      this.selectedConceptsAsJson.forEach((conceptAsJsonTemp) => {
        this.filter.selectedConcepts.push(JSON.parse(conceptAsJsonTemp));
      });
    }
    if (this.filter.attributeDefinition?.type === ValueType.REFERENCE) {
      if (this.selectedReferenceAsJson.has(conceptAsJson)) {
        this.selectedReferenceAsJson.delete(conceptAsJson);
        if (criterionForLinking) {
          if (!this.isCriterionLinked(criterionForLinking.uniqueID)) {
            criterionForLinking.isLinked = false;
          }
        }
      } else {
        this.selectedReferenceAsJson.add(conceptAsJson);
        if (criterionForLinking) {
          criterionForLinking.isLinked = true;
        }
      }

      this.criterion.linkedCriteria = [];
      this.selectedReferenceAsJson.forEach((conceptAsJsonTemp) => {
        this.criterion.linkedCriteria.push(this.getSelectedCriterion(JSON.parse(conceptAsJsonTemp)));
      });
    }
  }

  getSelectedCriterion(termcode: TerminologyCode): Criterion {
    let crit: Criterion;
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (
            conj.termCodes[0].code === termcode.code &&
            conj.termCodes[0].display === termcode.display &&
            conj.termCodes[0].system === termcode.system &&
            conj.termCodes[0].uid === termcode.uid
          ) {
            crit = conj;
          }
        });
      });
    }
    return crit;
  }

  isSelected(concept: TerminologyCode): boolean {
    // bring the object into the right order for stringify
    const temp = {
      code: concept.code,
      display: concept.display,
      system: concept.system,
      uid: concept.uid,
    };
    if (this.filter.attributeDefinition?.type === ValueType.CONCEPT) {
      return this.selectedConceptsAsJson.has(JSON.stringify(temp));
    }
    if (this.filter.attributeDefinition?.type === ValueType.REFERENCE) {
      return this.selectedReferenceAsJson.has(JSON.stringify(temp));
    }
  }

  isCriterionLinked(hash: string): boolean {
    let isLinked = false;

    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.linkedCriteria.length > 0) {
            conj.linkedCriteria.forEach((criterion) => {
              if (criterion.uniqueID === hash && conj.uniqueID !== this.criterion.uniqueID) {
                isLinked = true;
              }
            });
          }
        });
      });
    }
    return isLinked;
  }

  deselectAllCheckboxes() {
    this.checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.checkedControlForm.patchValue(['checkedControl', false]);
        this.selectedConceptsAsJson = new Set();
        this.filter.selectedConcepts = [];
      }
    });
  }

  resetQuantity() {
    if (this.filter.maxValue || this.filter.minValue || this.filter.value) {
      this.resetQuantityDisabled = false;
      this.filter.maxValue = 0;
      this.filter.minValue = 0;
      this.filter.value = 0;
    }
    this.resetQuantityDisabled = true;
  }
  resetButtonDisabled() {
    if (this.filter.selectedConcepts?.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  public isActionDisabled(): boolean {
    if (this.filter?.attributeDefinition) {
      if (this.filter?.attributeDefinition?.optional) {
        return false;
      }
    }

    if (this.filter?.type === OperatorOptions.CONCEPT) {
      return this.noSelectedConcept();
    }

    if (this.filter?.type === OperatorOptions.QUANTITY_COMPARATOR) {
      return this.valueTooSmall(this.filter.value) || this.valueTooLarge(this.filter.value);
    }

    if (this.filter?.type === OperatorOptions.QUANTITY_RANGE) {
      return (
        this.minimumSmallerMaximum() ||
        this.valueTooSmall(this.filter.minValue) ||
        this.valueTooLarge(this.filter.minValue) ||
        this.valueTooSmall(this.filter.maxValue) ||
        this.valueTooLarge(this.filter.maxValue)
      );
    }

    return false;
  }

  noSelectedConcept(): boolean {
    return this.selectedConceptsAsJson.size === 0;
  }

  valueTooSmall(value: number): boolean {
    if (!ObjectHelper.isNumber(this.filter.min)) {
      return false;
    }
    return value < this.filter.min;
  }

  valueTooLarge(value: number): boolean {
    if (!ObjectHelper.isNumber(this.filter.max)) {
      return false;
    }
    return value > this.filter.max;
  }

  minimumSmallerMaximum(): boolean {
    return (
      this.filter.type === OperatorOptions.QUANTITY_RANGE &&
      this.filter.minValue >= this.filter.maxValue
    );
  }

  // values come from the for-iteration (unit), option is the selected one ([(value)]="filter.unit")
  compareFunction(values, option): boolean {
    return values.code === option.code;
  }
}
