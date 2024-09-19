import { ConceptElasticSearchService } from '../../../service/ConceptFilter/ConceptElasticSearch.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'num-search-concept',
  templateUrl: './search-concept.component.html',
  styleUrls: ['./search-concept.component.scss'],
})
export class SearchConceptComponent {
  @Input()
  allowedConceptUri: string[] = [];

  constructor(private conceptFilterSearchService: ConceptElasticSearchService) {}

  public startElasticSearch(searchtext: string) {
    if (this.allowedConceptUriExists()) {
      this.conceptFilterSearchService.searchConcepts(searchtext, this.allowedConceptUri);
    }
  }

  private allowedConceptUriExists(): boolean {
    return this.allowedConceptUri.length > 0;
  }
}
