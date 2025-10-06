import { ActiveSearchTermService } from 'src/app/service/Search/ActiveSearchTerm.service';
import { CloneConcept } from 'src/app/model/Utilities/CriterionCloner/ValueAttributeFilter/Concept/CloneConcept';
import { CodeableConceptListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/CodeableConceptListEntryAdapter';
import { CodeableConceptResultList } from 'src/app/model/Search/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/model/Search/ListEntries/CodeableConceptResultListEntry';
import { CodeableConceptSearchService } from 'src/app/service/Search/SearchTypes/CodeableConcept/CodeableConceptSearch.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';
import { map, Observable, Subscription } from 'rxjs';
import { SelectedConceptFilterProviderService } from '../../../service/ConceptFilter/SelectedConceptFilterProvider.service';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';

@Component({
  selector: 'num-concept-filter-table-copy',
  templateUrl: './copy_concept-filter-table.component.html',
  styleUrls: ['./copy_concept-filter-table.component.scss'],
})
export class CopyConceptFilterTableComponent implements OnInit, OnDestroy {
  codeableConceptResultList: CodeableConceptResultList;

  @Input()
  valueSetUrl: string[];

  @Input()
  conceptFilterId: string;

  @Output()
  selectedConcept = new EventEmitter<Concept>();

  adaptedData: TableData;

  selectedConcepts: Concept[] = [];

  private subscription: Subscription = new Subscription();

  private subscription2: Subscription = new Subscription();

  searchText$: Observable<string>;

  constructor(
    private activeSearchTermService: ActiveSearchTermService,
    private conceptElasticSearchService: CodeableConceptSearchService,
    private selectedConceptProviderService: SelectedConceptFilterProviderService
  ) {}

  ngOnInit() {
    this.conceptElasticSearchService
      .getSearchResults(this.valueSetUrl)
      .pipe(
        map((results) => {
          this.adaptedData = CodeableConceptListEntryAdapter.adapt(results.getResults());
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
        this.selectedConceptProviderService.addConcepts(this.selectedConcepts);
        this.selectedConcepts.push(concept);
      }
    }
    this.selectedConcept.emit(concept);
  }

  private clearSelectedConceptArray() {
    this.selectedConcepts = [];
  }
}
