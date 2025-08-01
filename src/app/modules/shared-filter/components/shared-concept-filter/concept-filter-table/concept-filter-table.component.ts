import { CloneConcept } from 'src/app/model/Utilities/CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { Observable, Subscription, switchMap } from 'rxjs';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SelectedConceptFilterProviderService } from '../../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { ActiveSearchTermService } from 'src/app/service/Search/ActiveSearchTerm.service';

@Component({
  selector: 'num-concept-filter-table',
  templateUrl: './concept-filter-table.component.html',
  styleUrls: ['./concept-filter-table.component.scss'],
})
export class ConceptFilterTableComponent implements OnInit, OnDestroy {
  codeableConceptResultList: CodeableConceptResultList;

  @Input()
  valueSetUrl: string[];

  @Input()
  conceptFilterId: string;

  adaptedData: TableData;

  selectedConcepts: Concept[] = [];

  private subscription: Subscription = new Subscription();

  private subscription2: Subscription = new Subscription();

  searchText$: Observable<string>;

  constructor(
    private activeSearchTermService: ActiveSearchTermService,
    private searchService: SearchService,
    private conceptElasticSearchService: SearchResultProvider,
    private selectedConceptProviderService: SelectedConceptFilterProviderService
  ) {}

  ngOnInit() {
    this.conceptElasticSearchService
      .getCodeableConceptSearchResults(this.conceptFilterId)
      .pipe(
        switchMap((results) => {
          this.adaptedData = CodeableConceptListEntryAdapter.adapt(results.getResults());
          return this.selectedConceptProviderService.getSelectedConcepts();
        })
      )
      .subscribe(() => {
        this.updateCheckboxSelection();
      });

    this.searchText$ = this.activeSearchTermService.getActiveSearchTerm();
  }

  private updateCheckboxSelection(): void {
    this.adaptedData?.body.rows.forEach((row) => {
      const listEntry = row.originalEntry as CodeableConceptResultListEntry;
      const concept = CloneConcept.deepCopyConcept(listEntry.getConcept());
      this.clearSelectedConceptArray();
      row.isCheckboxSelected = this.selectedConceptProviderService.findConcept(concept)
        ? true
        : false;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  public addSelectedRow(item: InterfaceTableDataRow) {
    const entry = item.originalEntry as CodeableConceptResultListEntry;
    const concept = CloneConcept.deepCopyConcept(entry.getConcept());

    if (this.selectedConceptProviderService.findConcept(concept)) {
      this.selectedConceptProviderService.removeConcept(concept);
      this.clearSelectedConceptArray();
    } else {
      const foundConcept = this.selectedConcepts.find(
        (c) => c.getTerminologyCode().getCode() === concept.getTerminologyCode().getCode()
      );

      if (foundConcept) {
        this.selectedConcepts = this.selectedConcepts.filter(
          (c) => c.getTerminologyCode().getCode() !== concept.getTerminologyCode().getCode()
        );
      } else {
        this.selectedConcepts.push(concept);
      }
    }
  }

  public addSelectedConceptsToStage() {
    this.selectedConceptProviderService.addConcepts(this.selectedConcepts);
    this.clearSelectedConceptArray();
  }

  private clearSelectedConceptArray() {
    this.selectedConcepts = [];
  }
}
