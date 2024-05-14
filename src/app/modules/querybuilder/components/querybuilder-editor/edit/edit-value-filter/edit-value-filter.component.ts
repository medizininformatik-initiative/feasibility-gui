import {
  AbstractAttributeFilters,
  Comparator,
  QuantityUnit,
} from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { MatSelectModule } from '@angular/material/select';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { ReferenceCriteriaService } from '../../../../../../service/CriterionService/reference-criteria.service';
import { QueryService } from '../../../../../../service/QueryService.service';

@Component({
  selector: 'num-edit-value-definition',
  templateUrl: './edit-value-filter.component.html',
  styleUrls: ['./edit-value-filter.component.scss'],
})
export class EditValueFilterComponent implements OnInit, AfterViewInit {
  @Input()
  abstractAttributeFilter: AbstractAttributeFilters;

  @Input()
  filterType: string;

  @Input()
  query: Query;

  @Input()
  criterion: Criterion;

  @ViewChildren(EditValueFilterConceptLineComponent)
  private checkboxes: QueryList<EditValueFilterConceptLineComponent>;

  @ViewChildren(MatSelectModule)
  private matOption: QueryList<MatSelectModule>;

  optional: boolean;
  resetQuantityDisabled = true;

  FilterTypes: typeof FilterTypes = FilterTypes;

  attributeFilter: AttributeFilter;

  valueFilter: ValueFilter;

  selectedUnit: QuantityUnit;
  // Use string representation of concept because equivalent objects do not match in TypeScript (e.g. { a: 1 } !== { a: 1 })
  selectedConceptsAsJson: Set<string> = new Set();
  selectedReferenceAsJson: Set<string> = new Set();
  quantityFilterOption: string;
  // TODO: Try using enum
  quantityFilterOptions: Array<string> = ['NONE', 'EQUAL', 'LESS_THAN', 'GREATER_THAN', 'BETWEEN'];
  disableAnimation = true;

  constructor(
    private referenceCriteriaService: ReferenceCriteriaService,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    if (this.filterType === 'attribute') {
      this.attributeFilter = this.abstractAttributeFilter as AttributeFilter;
      this.optional = this.attributeFilter?.attributeDefinition?.optional;
    } else {
      this.valueFilter = this.abstractAttributeFilter as ValueFilter;
      this.optional = this.valueFilter?.valueDefinition?.optional;
    }
    this.abstractAttributeFilter?.selectedConcepts?.forEach((concept) => {
      // bring the object into the right order for stringify
      const temp = {
        code: concept.code,
        display: concept.display,
        system: concept.system,
        uid: concept.uid,
      };
      this.selectedConceptsAsJson.add(JSON.stringify(temp));
    });

    if (this.attributeFilter?.attributeDefinition?.type === FilterTypes.REFERENCE) {
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

    this.valueFilter?.valueDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.abstractAttributeFilter?.unit)) {
        this.selectedUnit = allowedUnit;
      }
    });

    this.attributeFilter?.attributeDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.abstractAttributeFilter?.unit)) {
        this.selectedUnit = allowedUnit;
      }
    });

    this.quantityFilterOption = this.getQuantityFilterOption();
  }

  // Workaround for angular component issue #13870
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => (this.disableAnimation = false));
    this.getQuantityFilterOption();
  }
  getQuantityFilterOption(): string {
    if (
      !this.abstractAttributeFilter ||
      this.abstractAttributeFilter.type === FilterTypes.CONCEPT
    ) {
      return null;
    }

    if (this.abstractAttributeFilter.type === FilterTypes.QUANTITY_RANGE) {
      return 'BETWEEN';
    }

    switch (this.abstractAttributeFilter.comparator) {
      case Comparator.EQUAL:
        return 'EQUAL';
      case Comparator.GREATER_OR_EQUAL:
      case Comparator.GREATER_THAN:
        return 'GREATER_THAN';
      case Comparator.LESS_OR_EQUAL:
      case Comparator.LESS_THAN:
        return 'LESS_THAN';
      case Comparator.NONE:
        return 'NONE';
      default:
        return null;
    }
  }

  roundMinValue(): void {
    this.abstractAttributeFilter.minValue = this.round(this.abstractAttributeFilter.minValue);
  }

  roundMaxValue(): void {
    this.abstractAttributeFilter.maxValue = this.round(this.abstractAttributeFilter.maxValue);
  }

  roundValue(): void {
    this.abstractAttributeFilter.value = this.round(this.abstractAttributeFilter.value);
  }

  round(value: number): number {
    const divisor = Math.pow(10, this.abstractAttributeFilter.precision);
    return Math.round(value * divisor) / divisor;
  }

  selectQuantityFilterOption(option: string): void {
    if (option === 'BETWEEN') {
      this.abstractAttributeFilter.type = FilterTypes.QUANTITY_RANGE;
      this.abstractAttributeFilter.comparator = Comparator.BETWEEN;
    } else {
      this.abstractAttributeFilter.type = FilterTypes.QUANTITY_COMPARATOR;
      switch (option) {
        case 'EQUAL':
          this.abstractAttributeFilter.comparator = Comparator.EQUAL;
          break;
        case 'LESS_THAN':
          this.abstractAttributeFilter.comparator = Comparator.LESS_THAN;
          break;
        case 'GREATER_THAN':
          this.abstractAttributeFilter.comparator = Comparator.GREATER_THAN;
          break;
        case 'NONE':
          this.abstractAttributeFilter.comparator = Comparator.NONE;
          break;
      }
    }
    if (
      this.abstractAttributeFilter.comparator !== Comparator.NONE ||
      (this.abstractAttributeFilter.type ===
        (FilterTypes.QUANTITY_RANGE || FilterTypes.QUANTITY_COMPARATOR) &&
        this.valueFilter.valueDefinition.type === FilterTypes.QUANTITY)
    ) {
      this.resetQuantityDisabled = false;
    } else {
      this.resetQuantityDisabled = true;
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
    const criterionForLinking = this.queryService.getCriterionByUID(concept.uid);

    if (
      this.attributeFilter?.attributeDefinition?.type === FilterTypes.CONCEPT ||
      this.valueFilter?.valueDefinition?.type === FilterTypes.CONCEPT
    ) {
      if (this.selectedConceptsAsJson.has(conceptAsJson)) {
        this.selectedConceptsAsJson.delete(conceptAsJson);
      } else {
        this.selectedConceptsAsJson.add(conceptAsJson);
      }

      this.abstractAttributeFilter.selectedConcepts = [];
      this.selectedConceptsAsJson.forEach((conceptAsJsonTemp) => {
        this.abstractAttributeFilter.selectedConcepts.push(JSON.parse(conceptAsJsonTemp));
      });
    }
    if (this.attributeFilter?.attributeDefinition?.type === FilterTypes.REFERENCE) {
      if (this.selectedReferenceAsJson.has(conceptAsJson)) {
        this.selectedReferenceAsJson.delete(conceptAsJson);
        this.criterion.linkedCriteria.splice(
          this.criterion.linkedCriteria.findIndex((crit) => crit.termCodes[0].uid === concept.uid),
          1
        );
        if (criterionForLinking) {
          if (!this.referenceCriteriaService.isCriterionLinked(criterionForLinking.uniqueID)) {
            criterionForLinking.isLinked = false;
          }
        }
      } else {
        this.selectedReferenceAsJson.add(conceptAsJson);
        this.criterion.linkedCriteria.push(this.queryService.getCriterionByUID(concept.uid));
        if (criterionForLinking) {
          criterionForLinking.isLinked = true;
        }
      }

      this.attributeFilter.selectedConcepts = [];
      this.selectedReferenceAsJson.forEach((conceptAsJsonTemp) => {
        this.attributeFilter.selectedConcepts.push(JSON.parse(conceptAsJsonTemp));
      });
    }
  }

  isSelected(concept: TerminologyCode): boolean {
    // bring the object into the right order for stringify
    const temp = {
      code: concept.code,
      display: concept.display,
      system: concept.system,
      uid: concept.uid,
    };

    if (this.abstractAttributeFilter.type === FilterTypes.REFERENCE) {
      return this.selectedReferenceAsJson.has(JSON.stringify(temp));
    }

    return this.selectedConceptsAsJson.has(JSON.stringify(temp));
  }

  doSelectAllCheckboxes() {
    this.checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.checkedControlForm.patchValue(['checkedControl', false]);
        if (
          (this.attributeFilter.attributeDefinition?.type ||
            this.valueFilter.valueDefinition?.type) === FilterTypes.CONCEPT
        ) {
          this.selectedConceptsAsJson = new Set();
          this.abstractAttributeFilter.selectedConcepts = [];
        } else {
          this.doSelectConcept(checkbox.concept);
        }
      }
    });
  }

  resetFilter() {
    if (this.attributeFilter?.attributeDefinition?.type === FilterTypes.REFERENCE) {
      return this.doSelectAllCheckboxes();
    }

    if (
      (this.abstractAttributeFilter.comparator !== Comparator.NONE ||
        this.abstractAttributeFilter.type === FilterTypes.QUANTITY_RANGE) &&
      (this.attributeFilter?.attributeDefinition?.type === FilterTypes.QUANTITY ||
        this.valueFilter?.valueDefinition?.type === FilterTypes.QUANTITY)
    ) {
      this.abstractAttributeFilter.maxValue = 0;
      this.abstractAttributeFilter.minValue = 0;
      this.abstractAttributeFilter.value = 0;
      if (this.valueFilter?.valueDefinition?.allowedUnits.length > 0) {
        this.abstractAttributeFilter.unit = this.valueFilter?.valueDefinition?.allowedUnits[0];
      }
      if (this.attributeFilter?.attributeDefinition?.allowedUnits.length > 0) {
        this.abstractAttributeFilter.unit =
          this.attributeFilter?.attributeDefinition?.allowedUnits[0];
      }
      this.abstractAttributeFilter.comparator = Comparator.NONE;
      this.abstractAttributeFilter.type = FilterTypes.QUANTITY_COMPARATOR;
      this.quantityFilterOption = 'NONE';
    }
    if (
      this.selectedConceptsAsJson.size > 0 &&
      (this.valueFilter.valueDefinition.type === FilterTypes.CONCEPT ||
        this.attributeFilter?.attributeDefinition?.type === FilterTypes.CONCEPT)
    ) {
      this.doSelectAllCheckboxes();
    }
  }

  resetButtonDisabled() {
    if (
      this.selectedConceptsAsJson.size > 0 &&
      (this.valueFilter?.valueDefinition?.type === FilterTypes.CONCEPT ||
        this.attributeFilter?.attributeDefinition?.type === FilterTypes.CONCEPT)
    ) {
      return false;
    }
    if (
      (this.abstractAttributeFilter.comparator !== Comparator.NONE ||
        this.abstractAttributeFilter.type === FilterTypes.QUANTITY_RANGE) &&
      (this.valueFilter?.valueDefinition?.type === FilterTypes.QUANTITY ||
        this.attributeFilter?.attributeDefinition?.type === FilterTypes.QUANTITY)
    ) {
      return false;
    }

    if (this.attributeFilter?.attributeDefinition?.type === FilterTypes.REFERENCE) {
      if (this.criterion.linkedCriteria.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  }

  public isActionDisabled(): boolean {
    if (
      this.abstractAttributeFilter?.type === FilterTypes.QUANTITY_COMPARATOR &&
      this.abstractAttributeFilter?.comparator !== Comparator.NONE
    ) {
      return (
        this.valueTooSmall(this.abstractAttributeFilter.value) ||
        this.valueTooLarge(this.abstractAttributeFilter.value)
      );
    }

    if (this.abstractAttributeFilter?.type === FilterTypes.QUANTITY_RANGE) {
      return (
        this.minimumSmallerMaximum() ||
        this.valueTooSmall(this.abstractAttributeFilter.minValue) ||
        this.valueTooLarge(this.abstractAttributeFilter.minValue) ||
        this.valueTooSmall(this.abstractAttributeFilter.maxValue) ||
        this.valueTooLarge(this.abstractAttributeFilter.maxValue)
      );
    }

    if (this.attributeFilter?.attributeDefinition) {
      if (this.attributeFilter?.attributeDefinition?.optional) {
        return false;
      }
    }

    if (this.valueFilter?.valueDefinition) {
      if (this.valueFilter?.valueDefinition?.optional) {
        return false;
      }
    }

    if (this.abstractAttributeFilter?.type === FilterTypes.CONCEPT) {
      return this.noSelectedConcept();
    }

    return true;
  }

  noSelectedConcept(): boolean {
    return this.selectedConceptsAsJson.size === 0;
  }

  valueTooSmall(value: number): boolean {
    if (!ObjectHelper.isNumber(this.abstractAttributeFilter.min)) {
      return false;
    }
    return value < this.abstractAttributeFilter.min;
  }

  valueTooLarge(value: number): boolean {
    if (!ObjectHelper.isNumber(this.abstractAttributeFilter.max)) {
      return false;
    }
    return value > this.abstractAttributeFilter.max;
  }

  minimumSmallerMaximum(): boolean {
    return (
      this.abstractAttributeFilter.type === FilterTypes.QUANTITY_RANGE &&
      this.abstractAttributeFilter.minValue >= this.abstractAttributeFilter.maxValue
    );
  }

  // values come from the for-iteration (unit), option is the selected one ([(value)]="filter.unit")
  compareFunction(values, option): boolean {
    return values.code === option.code;
  }
}
