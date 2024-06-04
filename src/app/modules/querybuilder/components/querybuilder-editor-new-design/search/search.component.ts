import { Component } from '@angular/core';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';
import { CreateCriterionService } from 'src/app/service/CriterionService/CreateCriterion.service';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  keysToSkip = ['id', 'selectable'];
  listItems: Array<SearchTermListEntry> = [];

  constructor(
    private elasticSearchService: ElasticSearchService,
    private criterionService: CreateCriterionService
  ) {}

  testTranslateCriterion() {
    this.criterionService.createCriterionFromProfileData();
  }

  public startElasticSearch(searchtext: string) {
    this.elasticSearchService.startElasticSearch(searchtext).subscribe((searchTermResults) => {
      this.listItems = searchTermResults.getResults();
      console.log(this.listItems);
    });
  }
}
