import { CodeableConceptResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/CodeableConcepttResultList';
import { CodeableConceptResultListEntry } from 'src/app/shared/models/ListEntries/CodeableConceptResultListEntry';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToCodeableConceptResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearchService.service';

@Component({
  selector: 'num-search-concept',
  templateUrl: './search-concept.component.html',
  styleUrls: ['./search-concept.component.scss'],
})
export class SearchConceptComponent {
  @Input()
  allowedConceptUri: string[];

  constructor(private conceptFiletrSearchService: ConceptElasticSearchService) {}

  searchtext = '';

  public startElasticSearch(searchtext: string) {
    if (!this.canPerformSearch(searchtext)) {
      return;
    }

    this.updateSearchText(searchtext);
    this.performElasticSearch(searchtext);
  }

  private canPerformSearch(searchtext: string): boolean {
    if (!this.isNewSearchQuery(searchtext)) {
      return false;
    }

    if (!this.hasAllowedConceptUri()) {
      this.logNoReferencedValueSetWarning();
      return false;
    }

    return true;
  }

  private isNewSearchQuery(searchtext: string): boolean {
    return this.searchtext !== searchtext;
  }

  private updateSearchText(searchtext: string): void {
    this.searchtext = searchtext;
  }

  private hasAllowedConceptUri(): boolean {
    return this.allowedConceptUri.length > 0;
  }

  private performElasticSearch(searchtext: string): void {
    this.conceptFiletrSearchService.searchConcepts(searchtext, this.allowedConceptUri);
  }

  private logNoReferencedValueSetWarning(): void {
    console.warn('No referencedValueSet was provided');
  }
}
