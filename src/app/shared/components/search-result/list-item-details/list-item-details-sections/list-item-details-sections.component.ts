import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Component({
  selector: 'num-list-item-details-sections',
  templateUrl: './list-item-details-sections.component.html',
  styleUrls: ['./list-item-details-sections.component.scss'],
})
export class ListItemDetailsSectionsComponent implements OnInit {
  @Input()
  listItemDetails: any;

  @Output()
  selectedRelative: EventEmitter<SearchTermListEntry> = new EventEmitter();

  constructor(
    private elasticSearchService: ElasticSearchService<SearchTermResultList, SearchTermListEntry>
  ) {}

  public ngOnInit() {}

  public getSelectedRelative(item: SearchTermRelatives) {
    this.elasticSearchService.getElasticSearchResultById(item.getId()).subscribe((resultList) => {
      this.selectedRelative.emit(resultList.getResults()[0]);
    });
  }
}
