import { Component, Inject, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { CodeableConceptLinsEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/CodeableConceptLinsEntryAdapter';
import { RefrenceCriteriaListEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/ReferenceCriteriaListEntryAdapter';
import { ReferenceCriteriaListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/RefrenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { EnterCriterionListComponentData } from '../edit-criterion-modal/edit-criterion-modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mapToRefrenceCriteriaSetResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';

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
  searchtext = '';
  listItems: ReferenceCriteriaListEntry[] = [];
  adaptedData: TableData;
  private subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditReferenceCriteriaModalComponent,
    private elasticSearchService: ElasticSearchService<
      ReferenceCriteriaResultList,
      ReferenceCriteriaListEntry
    >
  ) {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = RefrenceCriteriaListEntryAdapter.adapt(this.listItems);
        }
      });
  }

  ngOnInit() {}

  startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService
        .startElasticSearch(searchtext, [], ['http://i.just.made.that.up/for/demo/purposes'])
        .subscribe((test) => {
          this.listItems = test.results;
        });
    }
  }
}
