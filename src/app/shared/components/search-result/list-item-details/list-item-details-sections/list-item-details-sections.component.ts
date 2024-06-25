import { Component, Input, OnInit } from '@angular/core';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';

@Component({
  selector: 'num-list-item-details-sections',
  templateUrl: './list-item-details-sections.component.html',
  styleUrls: ['./list-item-details-sections.component.scss'],
})
export class ListItemDetailsSectionsComponent implements OnInit {
  @Input() listItemDetails: any;

  constructor(private elasticSearchService: ElasticSearchService<SearchTermListEntry>) {}

  ngOnInit() {}

  /*getSelectedRelative(item: SearchTermRelatives) {
    this.elasticSearchService
      .getElasticSearchResultById(item.getId())
      .subscribe((test) => console.log(test))
  }*/
}
