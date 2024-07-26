import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter'
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter'
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes'

@Component({
  selector: 'num-attribute-filter',
  templateUrl: './attribute-filter.component.html',
  styleUrls: ['./attribute-filter.component.scss'],
})
export class AttributeFilterComponent implements OnInit {
  @Input() attributeFilter: AttributeFilter

  @Output() attributeFilterChange = new EventEmitter<AttributeFilter>()

  ngOnInit(): void {}

  public updateConceptFilter(conceptFilter: ConceptFilter) {
    const newAttributeFilter = new AttributeFilter(
      this.attributeFilter.getDisplay(),
      FilterTypes.CONCEPT,
      this.attributeFilter.getAttributeCode(),
      conceptFilter,
      undefined,
      undefined,
      this.attributeFilter.getOptional()
    )
    this.attributeFilterChange.emit(newAttributeFilter)
  }

  public updateQuantityFilter(quantityFilter: AbstractQuantityFilter) {
    const newAttributeFilter = new AttributeFilter(
      this.attributeFilter.getDisplay(),
      FilterTypes.QUANTITY,
      this.attributeFilter.getAttributeCode(),
      undefined,
      quantityFilter,
      undefined,
      this.attributeFilter.getOptional()
    )
    this.attributeFilterChange.emit(newAttributeFilter)
  }
}
