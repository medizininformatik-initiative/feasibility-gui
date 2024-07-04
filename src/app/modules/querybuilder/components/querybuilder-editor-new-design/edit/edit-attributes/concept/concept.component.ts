import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeableConceptResultListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/CodeableConceptResultListEntry';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';
import { CodeableConceptLinsEntryAdapter } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/ListEntryAdapter/CodeableConceptLinsEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AttributeFiltersBuilder } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFiltersBuilder';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionBuilder } from 'src/app/model/FeasibilityQuery/Criterion/CriterionBuilder';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToCodeableConceptResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';

@Component({
  selector: 'num-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToCodeableConceptResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
  ],
})
export class ConceptComponent implements OnDestroy {
  @Input()
  attributeFilter: AttributeFilter;
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

  startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.elasticSearchService
        .startElasticSearch(searchtext, ['http://hl7.org/fhir/sid/icd-o-3'])
        .subscribe((test) => {
          this.listItems = test.results;
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
    const selectedConceptSet = new Set([terminologyCode]);
    this.attributeFilter.getConcept().setSelectedConcepts(selectedConceptSet);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
