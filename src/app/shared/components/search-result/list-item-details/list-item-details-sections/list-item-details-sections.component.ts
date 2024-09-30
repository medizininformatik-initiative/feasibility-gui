import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { ListItemDetailService } from 'src/app/shared/service/Menu/ListItemDetails/ListItemDetails.service';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { mapToSearchTermResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { ElasticSearchSearchResultProviderService } from 'src/app/service/Provider/ElasticSearchSearchResultProviderService.service';
import { SearchService } from 'src/app/service/Search/Search.service';

@Component({
  selector: 'num-list-item-details-sections',
  templateUrl: './list-item-details-sections.component.html',
  styleUrls: ['./list-item-details-sections.component.scss'],
  providers: [
    { provide: 'ENTRY_MAPPER', useValue: mapToSearchTermResultList },
    { provide: ElasticSearchService, useClass: ElasticSearchService },
    { provide: ElasticSearchSearchResultProviderService },
  ],
})
export class ListItemDetailsSectionsComponent implements OnInit {
  @Input()
  listItemDetails: SearchTermRelatives[];

  menuItems: MenuItemInterface[] = [];

  @Output()
  selectedRelative: EventEmitter<SearchTermListEntry> = new EventEmitter();

  constructor(
    private menuService: ListItemDetailService,
    private elasticSearchService: SearchService //ElasticSearchService<SearchTermResultList, SearchTermListEntry>
  ) {}

  public ngOnInit() {
    this.getMenuItems();
  }

  public getSelectedRelative(item: SearchTermRelatives) {
    this.elasticSearchService.searchCriteriaById(item.getId()).subscribe((resultList) => {
      this.selectedRelative.emit(resultList.getResults()[0]);
    });
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsListItemDetails();
  }
}
