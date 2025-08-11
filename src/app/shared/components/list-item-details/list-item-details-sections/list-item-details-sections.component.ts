import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItemDetailService } from 'src/app/shared/service/Menu/ListItemDetails/ListItemDetails.service';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermRelatives } from 'src/app/model/Search/SearchDetails/SearchTermRelatives';
import { CriteriaListEntry } from 'src/app/model/Search/ListEntries/CriteriaListListEntry';

@Component({
  selector: 'num-list-item-details-sections',
  templateUrl: './list-item-details-sections.component.html',
  styleUrls: ['./list-item-details-sections.component.scss'],
})
export class ListItemDetailsSectionsComponent implements OnInit {
  @Input()
  listItemDetails: SearchTermRelatives[];

  menuItems: MenuItemInterface[] = [];

  @Output()
  selectedRelative: EventEmitter<CriteriaListEntry> = new EventEmitter();

  constructor(
    private menuService: ListItemDetailService,
    private elasticSearchService: SearchService,
    private searchService: SearchService,
    private test: SearchTermDetailsService
  ) {}

  public ngOnInit() {
    this.getMenuItems();
  }

  public getSelectedRelative(item: SearchTermRelatives) {
    this.elasticSearchService.searchCriteriaById(item.getTermCodeHash()).subscribe((resultList) => {
      this.selectedRelative.emit(resultList.getResults()[0]);
    });

    this.searchService.searchCriteriaById(item.getTermCodeHash()).subscribe();
    this.test.getDetailsForListItem(item.getTermCodeHash()).subscribe();
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsListItemDetails();
  }
}
