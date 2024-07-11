import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { CodeableConceptLinsEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/CodeableConceptLinsEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/CodeableConceptResultListEntry';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToCodeableConceptResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToCodeableConceptResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
  ],
})
export class ConceptComponent implements OnDestroy, OnInit {
  @Input()
  attributeFilter: AttributeFilter;

  @Output()
  changedAttributeFilter = new EventEmitter<AttributeFilter>();

  listItems: CodeableConceptResultListEntry[] = [];
  adaptedData: TableData;
  private subscription: Subscription;
  searchtext = '';

  constructor(
    private elasticSearchService: ElasticSearchService<
      CodeableConceptResultList,
      CodeableConceptResultListEntry
    >
  ) {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = CodeableConceptLinsEntryAdapter.adapt(this.listItems);
        }
      });
  }

  ngOnInit() {}

  startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService
        .startElasticSearch(searchtext, this.attributeFilter.getConcept().getAllowedConceptUri())
        .subscribe((response) => {
          this.listItems = response.results;
        });
    }
  }

  setSelectedConcept(item) {
    const terminologyCode = new TerminologyCode(
      item.originalEntry.terminologyCode.getCode(),
      item.originalEntry.terminologyCode.getDisplay(),
      item.originalEntry.terminologyCode.getSystem(),
      item.originalEntry.terminologyCode.getVersion()
    );

    if (this.attributeFilter && this.attributeFilter.getConcept()) {
      const existingConceptSet = this.attributeFilter.getConcept().getSelectedConcepts();
      existingConceptSet.add(terminologyCode);
      this.attributeFilter.getConcept().setSelectedConcepts(existingConceptSet);
    } else {
      const selectedConceptSet = new Set([terminologyCode]);
      this.attributeFilter.getConcept().setSelectedConcepts(selectedConceptSet);
    }
    this.changedAttributeFilter.emit(this.attributeFilter);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
