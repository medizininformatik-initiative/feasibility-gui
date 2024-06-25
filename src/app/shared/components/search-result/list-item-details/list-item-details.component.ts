import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { Entries } from 'src/app/model/ElasticSearch/Entrie';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { SearchResultListItemSelectionService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.scss'],
})

/**
 * Needs a function to call the elastic search service for fetching the the data when
 * on click of parents/children/siblings
 */
export class ListItemDetailsComponent implements OnInit {
  isOpen = false;

  listItemDetails$: Observable<SearchTermDetails>;

  entries: Observable<Entries>;
  constructor(
    private listItemService: SearchResultListItemSelectionService<SearchTermListEntry>,
    private elasticSearchService: ElasticSearchService
  ) {}

  ngOnInit() {
    this.listItemService
      .getSelectedSearchResultListItem()
      .subscribe((selectedRow: SearchTermListEntry) => {
        this.elasticSearchService
          .getDetailsForListItem(selectedRow.getId())
          .subscribe((entry: SearchTermDetails) => {
            this.listItemDetails$ = of(entry);
          });
      });
  }

  getSelectedRelative(name: SearchTermRelatives) {}
}
