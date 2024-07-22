import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToRefrenceCriteriaSetResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { CriterionService } from 'src/app/service/CriterionService.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditReferenceCriteriaModalComponent,
    private dialogRef: MatDialogRef<EditReferenceCriteriaModalComponent, string[]>,
    private createCriterionService: CreateCriterionService,
    private criterionProvider: CriterionService
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
    console.log(this.criterion);
  }

  public setSelectedReferenceIds(ids: string[]) {
    this.ids = ids;
  }

  public saveCriterion() {
    this.createCriterionService.getCriteriaProfileData(this.ids);
    this.dialogRef.close(this.ids);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
