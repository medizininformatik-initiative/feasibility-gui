import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { mapToCodeableConceptResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
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
  conceptFilter: ConceptFilter;

  @Output()
  changedConceptFilter = new EventEmitter<ConceptFilter>();

  @Input()
  attributeCodeDisplay: string;

  listItems: CodeableConceptResultListEntry[] = [];

  adaptedData: TableData;

  private subscription: Subscription;

  searchtext = '';

  selectedListEntries: CodeableConceptResultListEntry[] = [];

  arrayOfSelectedConcepts: TerminologyCode[] = [];

  constructor(
    private elasticSearchService: ElasticSearchService<
      CodeableConceptResultList,
      CodeableConceptResultListEntry
    >
  ) {}

  ngOnInit() {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults: CodeableConceptResultList) => {
        if (searchTermResults) {
          this.adaptListItems(searchTermResults.results);
        }
      });
    this.initializeArrayOfSelectedConcepts();
  }

  private initializeArrayOfSelectedConcepts() {
    if (this.conceptFilter && this.conceptFilter.isSelectedConceptSet()) {
      this.arrayOfSelectedConcepts = Array.from(this.conceptFilter.getSelectedConcepts());
    }
  }

  private adaptListItems(results: CodeableConceptResultListEntry[]) {
    this.listItems = results;
    this.listItems.forEach((listItem) => {
      const isSelected = this.isConceptSelected(listItem.getTerminologyCode().getCode());
      listItem.setIsSelected(isSelected);
    });
    this.adaptedData = CodeableConceptListEntryAdapter.adapt(this.listItems);
  }

  private isConceptSelected(terminologyCode: string): boolean {
    const selectedConcepts = this.conceptFilter.getSelectedConcepts()?.values();
    if (selectedConcepts) {
      for (const concept of selectedConcepts) {
        if (concept.getCode() === terminologyCode) {
          return true;
        }
      }
      return false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public startElasticSearch(searchtext: string) {
    if (this.searchtext !== searchtext) {
      this.searchtext = searchtext;
      this.conceptFilter.setAllowedConceptUri(['test']);
      const allowedConceptUri = this.conceptFilter.getAllowedConceptUri();
      if (allowedConceptUri.length > 0) {
        this.elasticSearchService
          .startElasticSearch(searchtext, this.conceptFilter.getAllowedConceptUri())
          .subscribe((response) => {
            this.listItems = response.results;
          });
      } else {
        console.warn('No referencedValueSet was provided');
      }
    }
  }

  public setSelectedRow(item: InterfaceTableDataRow) {
    this.selectedListEntries.push(item.originalEntry as CodeableConceptResultListEntry);
  }

  public setSelectedConceptFromListItem() {
    this.selectedListEntries.forEach((selectedListEntry) => {
      const terminologyCode = this.createNewTerminologyCode(selectedListEntry.getTerminologyCode());
      if (
        !this.arrayOfSelectedConcepts.some(
          (concept) => concept.getCode() === terminologyCode.getCode()
        )
      ) {
        this.arrayOfSelectedConcepts.push(terminologyCode);
      }
      if (this.conceptFilter && this.conceptFilter.getSelectedConcepts()) {
        const selectedConcepts = this.conceptFilter.getSelectedConcepts();
        if (this.isConceptSelected(terminologyCode.getCode())) {
          const newSet: Set<TerminologyCode> = this.createNewSetExcludingConcept(
            selectedConcepts,
            terminologyCode.getCode()
          );
          this.conceptFilter.setSelectedConcepts(newSet);
        } else {
          selectedConcepts.add(terminologyCode);
        }
      } else {
        const selectedConceptSet = new Set([terminologyCode]);
        this.conceptFilter.setSelectedConcepts(selectedConceptSet);
      }
    });
    this.selectedListEntries = [];
    this.changedConceptFilter.emit(this.conceptFilter);
  }

  public removeSelectedConcept(selectedConceptFilter: TerminologyCode) {
    const selectedConcepts = this.conceptFilter.getSelectedConcepts();
    const newSet: Set<TerminologyCode> = this.createNewSetExcludingConcept(
      selectedConcepts,
      selectedConceptFilter.getCode()
    );
    this.conceptFilter.setSelectedConcepts(newSet);
    this.arrayOfSelectedConcepts = Array.from(this.conceptFilter.getSelectedConcepts());
    this.adaptListItems(this.listItems);
  }

  private createNewSetExcludingConcept(
    set: Set<TerminologyCode>,
    terminologyCode: string
  ): Set<TerminologyCode> {
    const newSet = new Set<any>();
    for (const concept of set) {
      if (concept.getCode() !== terminologyCode) {
        newSet.add(concept);
      }
    }

    return newSet;
  }

  private createNewTerminologyCode(terminologyCode: TerminologyCode) {
    return new TerminologyCode(
      terminologyCode.getCode(),
      terminologyCode.getDisplay(),
      terminologyCode.getSystem(),
      terminologyCode.getVersion()
    );
  }
}
