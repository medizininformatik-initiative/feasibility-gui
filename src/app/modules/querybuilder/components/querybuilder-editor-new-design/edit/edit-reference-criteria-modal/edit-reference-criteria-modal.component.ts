import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { Component, Inject, OnInit } from '@angular/core';
import { CreateReferenceCriterionService } from 'src/app/service/CriterionService/Builder/CreateReferenceCriterion.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToRefrenceCriteriaSetResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-edit-reference-criteria',
  templateUrl: './edit-reference-criteria-modal.component.html',
  styleUrls: ['./edit-reference-criteria-modal.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToRefrenceCriteriaSetResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
  ],
})
export class EditReferenceCriteriaModalComponent implements OnInit {
  criterion: Criterion;

  ids: string[] = [];

  parentAttributeFilter: AttributeFilter;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditReferenceCriteriaModalComponent,
    private dialogRef: MatDialogRef<EditReferenceCriteriaModalComponent, Criterion>,
    private createReferenceService: CreateReferenceCriterionService
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
  }

  public setSelectedReferenceIds(ids: string[], attributeFilter: AttributeFilter) {
    this.ids = ids;
    this.parentAttributeFilter = attributeFilter;
  }

  public saveCriterion() {
    this.createReferenceService
      .fetchReferenceCriterions(this.ids)
      .subscribe((referenceCriterions: ReferenceCriterion[]) => {
        const selectedReferenceFilter = this.parentAttributeFilter
          .getReference()
          .getSelectedReferences();
        selectedReferenceFilter.push(...referenceCriterions);
        this.parentAttributeFilter.getReference().setSelectedReferences(selectedReferenceFilter);
      });
    const mandatoryFields = this.createMandatoryFields(this.criterion);
    const criterionBuilder = new CriterionBuilder(mandatoryFields);
    criterionBuilder
      .withTimeRestriction(this.criterion.getTimeRestriction())
      .withValueFilters(this.criterion.getValueFilters() ?? [])
      .withAttributeFilters(this.criterion.getAttributeFilters())
      .withAttributeFilter(this.parentAttributeFilter);
    const criterion = criterionBuilder.buildCriterion();
    this.dialogRef.close(criterion);
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

  closeDialog() {
    this.dialogRef.close();
  }
}
