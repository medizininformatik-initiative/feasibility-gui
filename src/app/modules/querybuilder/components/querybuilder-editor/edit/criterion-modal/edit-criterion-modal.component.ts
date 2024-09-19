import { AbstractCriterion } from 'src/app/model/FeasibilityQuery/Criterion/AbstractCriterion';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';

export class EnterCriterionListComponentData {
  criterion: AbstractCriterion;
}

@Component({
  selector: 'num-edit-criterion-modal',
  templateUrl: './edit-criterion-modal.component.html',
  styleUrls: ['./edit-criterion-modal.component.scss'],
})
export class EditCriterionModalComponent implements OnInit {
  criterion: AbstractCriterion;
  criterionBuilder: CriterionBuilder;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EditCriterionModalComponent, AbstractCriterion>,
    private criterionProvider: CriterionProviderService
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
    this.instantiateCriterion();
  }

  /**
   * Need to create a copy of the criterion in order to avoid references
   * which lead to unwanted change detection cycles
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
    this.criterionBuilder.withTimeRestriction(this.criterion.getTimeRestriction());
  }

  private createMandatoryFields(criterion: AbstractCriterion): {
    isReference: boolean
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
      isReference: false,
      context,
      criterionHash,
      display,
      isInvalid: true,
      uniqueID: criterion.getId(),
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
    if (this.criterion instanceof ReferenceCriterion) {
      const criterion = this.criterionProvider.getCriterionByUID(this.criterion.getParentId());

      criterion.getAttributeFilters().forEach((attributeFilter) => {
        if (attributeFilter.isReferenceSet()) {
          const selectedReferences = attributeFilter.getReference().getSelectedReferences();
          const index = selectedReferences.findIndex(
            (selectedReference) => selectedReference.getId() === this.criterion.getId()
          );
          if (index !== -1) {
            const referenceCriterion = this.criterionBuilder
              .withParentId(criterion.getId())
              .buildReferenceCriterion();
            selectedReferences[index] = referenceCriterion;
          }
        }
      });
      this.dialogRef.close(criterion);
    } else {
      this.dialogRef.close(this.criterionBuilder.buildCriterion());
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
