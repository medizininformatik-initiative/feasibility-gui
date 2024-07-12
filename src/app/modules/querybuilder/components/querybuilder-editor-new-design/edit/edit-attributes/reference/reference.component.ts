import { Component, Input } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/ReferenceCriteriaListEntryAdapter';
import { ReferenceCriteriaListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/RefrenceCriteriaListEntry';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { ReferenceFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';

@Component({
  selector: 'num-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent {
  @Input()
  referenceFilter: ReferenceFilter;

  @Input()
  listItems: ReferenceCriteriaListEntry[] = [];

  private subscription: SubscriptionLike;

  adaptedData: TableData;

  searchtext = '';

  constructor(
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
          this.adaptedData = ReferenceCriteriaListEntryAdapter.adapt(this.listItems);
        }
      });
  }

  startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      const allowedReferenceUri = this.referenceFilter.getAllowedReferenceUri();
      this.elasticSearchService
        .startElasticSearch(searchtext, [], allowedReferenceUri)
        .subscribe((test) => {
          this.listItems = test.results;
        });
    }
  }

  setSelectedRefrenceCriteria(selectedReference) {
    this.referenceFilter.setSelectedReference(selectedReference);
  }
}
