import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { ReferenceCriteriaListEntry } from 'src/app/shared/models/ListEntries/ReferenceCriteriaListEntry';
import { ReferenceCriteriaListEntryAdapter } from 'src/app/shared/models/TableData/Adapter/ReferenceCriteriaListEntryAdapter';
import { ReferenceCriteriaResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/ReferenceCriteriaResultList';
import { ReferenceCriterion } from 'src/app/model/FeasibilityQuery/Criterion/ReferenceCriterion';
import { ReferenceFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/shared/models/TableData/InterfaceTableData';
import { InterfaceTableDataRow } from 'src/app/shared/models/TableData/InterfaceTableDataRows';

@Component({
  selector: 'num-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent implements OnInit, OnDestroy {
  @Input()
  referenceFilter: ReferenceFilter;

  @Input()
  listItems: ReferenceCriteriaListEntry[] = [];

  @Output()
  selectedReferenceIds = new EventEmitter<string[]>();

  selectedListEntries: ReferenceCriteriaListEntry[] = [];

  private subscription: Subscription;

  adaptedData: TableData;

  searchtext = '';

  arrayOfSelectedReferences: ReferenceCriterion[] = [];

  constructor(
    private elasticSearchService: ElasticSearchService<
      ReferenceCriteriaResultList,
      ReferenceCriteriaListEntry
    >
  ) {}

  ngOnInit() {
    this.subscription = this.elasticSearchService
      .getSearchTermResultList()
      .subscribe((searchTermResults) => {
        if (searchTermResults) {
          this.listItems = searchTermResults.results;
          this.adaptedData = ReferenceCriteriaListEntryAdapter.adapt(this.listItems);
        }
      });
    this.initializeArrayOfReferenceCriterions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeArrayOfReferenceCriterions() {
    if (this.referenceFilter && this.referenceFilter.getSelectedReferences()) {
      this.referenceFilter.getSelectedReferences().forEach((referenceCriterion) => {
        this.arrayOfSelectedReferences.push(referenceCriterion);
      });
    }
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

  public setSelectedRow(item: InterfaceTableDataRow) {
    this.selectedListEntries.push(item.originalEntry as ReferenceCriteriaListEntry);
  }

  setSelectedRefrenceCriteria() {
    const ids = this.selectedListEntries.map((selectedListEntry) => selectedListEntry.id);
    this.selectedReferenceIds.emit(ids);
    //const mandatoryFields = this.createMandatoryFields(selectedRow.originalEntry as ReferenceCriteriaListEntry)
    //const referenceCriterion = new CriterionBuilder(mandatoryFields)
  }

  /*private createMandatoryFields(referenceCriteriaListEntry: ReferenceCriteriaListEntry): {
    context: TerminologyCode
    criterionHash: string
    display: string
    isInvalid: boolean
    uniqueID: string
    termCodes: Array<TerminologyCode>
  } {
    const context = referenceCriteriaListEntry.getContext();
    const termCodes = referenceCriteriaListEntry.getTerminologyCode();
    const display = referenceCriteriaListEntry.getTerminologyCode().getDisplay();
    const criterionHash = this.criterion.getCriterionHash();

    return {
      context,
      criterionHash,
      display,
      isInvalid: true,
      uniqueID: criterion.getUniqueID(),
      termCodes,
    };
  }*/
}
