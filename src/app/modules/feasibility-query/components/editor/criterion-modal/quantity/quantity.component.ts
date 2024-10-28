import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { QuantityFilterFactoryService } from 'src/app/service/Factory/QuantityFilterFactory.service';

@Component({
  selector: 'num-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent implements OnInit {
  FilterTypes: typeof FilterTypes = FilterTypes;

  @Input()
  quantityFilter: AbstractQuantityFilter;

  @Output()
  quantityFilterChange = new EventEmitter<AbstractQuantityFilter>();

  /**
   * UI conditions
   */
  isBetweenFilter: boolean;
  isComparatorFilter: boolean;
  showAllowedUnits: boolean;

  /**
   * QuantityFilter Instances
   */
  quantityComparatorFilter: QuantityComparatorFilter;
  quantityRangeFilter: QuantityRangeFilter;

  selectedQuantityFilterComparator: QuantityComparisonOption;

  selectedQuantityFilterUnit: QuantityUnit;

  QuantityComparisonOption: typeof QuantityComparisonOption = QuantityComparisonOption;

  constructor(private quantityFilterFactoryService: QuantityFilterFactoryService) {}

  ngOnInit() {
    this.setupFactoryService();
    this.initializaFilterType();
    this.initializeUnit();
    this.updateConditions();
    this.selectedQuantityFilterComparator = this.quantityFilter.getComparator();
  }

  private setupFactoryService() {
    this.quantityFilterFactoryService.setAllowedUnits(this.quantityFilter.getAllowedUnits());
    this.quantityFilterFactoryService.setPrecision(this.quantityFilter.getPrecision());
  }

  private initializaFilterType() {
    const type: FilterTypes = this.quantityFilter.getType();
    if (type === FilterTypes.QUANTITY_COMPARATOR) {
      this.quantityComparatorFilter = this.quantityFilter as QuantityComparatorFilter;
    }
    if (type === FilterTypes.QUANTITY_RANGE) {
      this.quantityRangeFilter = this.quantityFilter as QuantityRangeFilter;
    }
  }

  private initializeUnit() {
    if (this.quantityFilter.getSelectedUnit()) {
      this.setSelectQuantityFilterUnit(this.quantityFilter.getSelectedUnit());
    } else {
      this.setSelectQuantityFilterUnit(this.quantityFilter.getAllowedUnits()[0]);
    }
  }

  private updateConditions() {
    this.isBetweenFilter =
      this.selectedQuantityFilterComparator === QuantityComparisonOption.BETWEEN;
    this.isComparatorFilter =
      this.selectedQuantityFilterComparator !== QuantityComparisonOption.BETWEEN &&
      this.selectedQuantityFilterComparator !== QuantityComparisonOption.NONE;
    this.showAllowedUnits = this.selectedQuantityFilterComparator !== QuantityComparisonOption.NONE;
  }

  public setSelectedQuantityFilterOption(option: QuantityComparisonOption): void {
    this.selectedQuantityFilterComparator =
      QuantityComparisonOption[option as keyof typeof QuantityComparisonOption];
    if (option !== QuantityComparisonOption.NONE) {
      const emptyQuantityFilter = this.quantityFilterFactoryService.createEmptyQuantityFilter();
      this.quantityFilterChange.emit(emptyQuantityFilter);
    }
  }

  public setSelectQuantityFilterUnit(selectedUnit: QuantityUnit) {
    this.selectedQuantityFilterUnit = selectedUnit;
    this.quantityFilterFactoryService.setQuantityUnit(selectedUnit);
  }

  public emitQuantityFilterInstance(quantityFilter: AbstractQuantityFilter) {
    this.quantityFilterChange.emit(quantityFilter);
  }
}
