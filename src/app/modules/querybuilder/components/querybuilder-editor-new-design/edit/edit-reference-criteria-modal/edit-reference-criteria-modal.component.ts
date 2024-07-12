import { Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToRefrenceCriteriaSetResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditReferenceCriteriaModalComponent) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
  }
}
