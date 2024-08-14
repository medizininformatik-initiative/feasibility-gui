import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermDetails';
import { SearchTermRelatives } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchDetails/SearchTermRelatives';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';

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

  @Input()
  selectedTableItemId: string;

  @Input()
  listItemDetails$: Observable<SearchTermDetails>;

  @Output()
  selectedRelative: EventEmitter<SearchTermListEntry> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public getSelectedRelative(entry: SearchTermListEntry) {
    this.selectedRelative.emit(entry);
  }
}
