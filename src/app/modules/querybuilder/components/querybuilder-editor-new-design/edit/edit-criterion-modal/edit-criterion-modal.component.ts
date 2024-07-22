import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

export class EnterCriterionListComponentData {
  criterion: Criterion;
}

@Component({
  selector: 'num-edit-criterion-modal',
  templateUrl: './edit-criterion-modal.component.html',
  styleUrls: ['./edit-criterion-modal.component.scss'],
})
export class EditCriterionModalComponent implements OnInit {
  criterion: Criterion;
  criterionBuilder: CriterionBuilder;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EditCriterionModalComponent, Criterion>
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
    this.instantiateCriterion();
  }

  /**
   * Need to create a copy of the criterion in order to avoid references
   * which lead to unwanted change detection cyles
   *
   * @todo introduce Changedetection.OnPuSh
   */
  private instantiateCriterion() {
    const mandatoryFields = this.createMandatoryFields(this.criterion);
    this.criterionBuilder = new CriterionBuilder(mandatoryFields);
    this.setInitialAttributeFilter();
    this.setInitialValueFilter();
    this.setInitialTimeRestriction();
  }

  private setInitialAttributeFilter() {
    const attributeFilters: AttributeFilter[] = [];
    this.criterion
      .getAttributeFilters()
      .forEach((attributeFilter) => attributeFilters.push(attributeFilter));
    this.criterionBuilder.withAttributeFilters(attributeFilters);
  }

  private setInitialValueFilter() {
    const currentValueFilter = this.criterion.getValueFilters()[0];
    const valueFilter: ValueFilter = new ValueFilter(
      currentValueFilter.getDisplay(),
      undefined,
      currentValueFilter.getConcept(),
      currentValueFilter.getQuantity(),
      currentValueFilter.getOptional()
    );
    this.criterionBuilder.withValueFilters(valueFilter);
  }

  private setInitialTimeRestriction() {
    const timeRestriction = new BetweenFilter(
      this.criterion.getTimeRestriction().afterDate,
      this.criterion.getTimeRestriction().beforeDate
    );
    this.criterionBuilder.withTimeRestriction(timeRestriction);
  }

  private createMandatoryFields(criterion: Criterion): {
    context: TerminologyCode
    criterionHash: string
    display: string
    isInvalid: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = criterion.getContext();
    const termCodes = criterion.getTermCodes();
    const display = criterion.getTermCodes()[0].getDisplay();
    const criterionHash = this.criterion.getCriterionHash();

    return {
      context,
      criterionHash,
      display,
      isInvalid: true,
      uniqueID: criterion.getUniqueID(),
      termCodes,
    };
  }
  public updateValueFilter(valueFilter: ValueFilter) {
    this.criterionBuilder.withValueFilters(valueFilter);
  }

  public updateAttributeFilter(attributeFilter: AttributeFilter) {
    console.log(attributeFilter);
    this.criterionBuilder.withAttributeFilter(attributeFilter);
  }

  public updateTimeRestriction(timeRestriction: AbstractTimeRestriction) {
    this.criterionBuilder.withTimeRestriction(timeRestriction);
  }

  public saveCriterion() {
    const criterion = this.criterionBuilder.buildCriterion();
    this.dialogRef.close(criterion);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
