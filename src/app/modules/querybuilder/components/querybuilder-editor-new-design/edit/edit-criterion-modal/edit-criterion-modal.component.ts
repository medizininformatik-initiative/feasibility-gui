import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';

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
    if (this.criterion.getAttributeFilters().length > 0) {
      this.criterion
        .getAttributeFilters()
        .forEach((attributeFilter) => attributeFilters.push(attributeFilter));
      this.criterionBuilder.withAttributeFilters(attributeFilters);
    }
  }

  private setInitialValueFilter() {
    const currentValueFilter = this.criterion.getValueFilters()[0];
    if (currentValueFilter) {
      const valueFilter: ValueFilter = new ValueFilter(
        currentValueFilter.getDisplay(),
        undefined,
        currentValueFilter.getConcept(),
        currentValueFilter.getQuantity(),
        currentValueFilter.getOptional()
      );
      this.criterionBuilder.withValueFilters([valueFilter]);
    }
  }

  private setInitialTimeRestriction() {
    if (this.criterion.getTimeRestriction()) {
      const timeRestriction = new BetweenFilter(
        this.criterion.getTimeRestriction().getAfterDate(),
        this.criterion.getTimeRestriction().getBeforeDate()
      );
      this.criterionBuilder.withTimeRestriction(timeRestriction);
    }
  }

  private createMandatoryFields(criterion: Criterion): {
    hasReference: boolean
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
      hasReference: false,
      context,
      criterionHash,
      display,
      isInvalid: true,
      uniqueID: criterion.getUniqueID(),
      termCodes,
    };
  }
  public updateValueFilter(valueFilter: ValueFilter) {
    this.criterionBuilder.withValueFilters([valueFilter]);
  }

  public updateAttributeFilter(attributeFilter: AttributeFilter) {
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
