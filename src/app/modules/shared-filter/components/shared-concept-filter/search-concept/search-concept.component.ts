import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearch.service';
import { Component, Input } from '@angular/core';

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
    this.performElasticSearch(searchtext);
  }

  private performElasticSearch(searchtext: string): void {
    if (this.allowedConceptUriExists())
      {this.conceptFiletrSearchService.searchConcepts(searchtext, this.allowedConceptUri);}
  }

  private allowedConceptUriExists(): boolean {
    return this.allowedConceptUri.length > 0;
  }
}
