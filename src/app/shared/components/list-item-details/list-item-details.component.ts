import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CriteriaListEntry } from '../../../model/Search/ListEntries/CriteriaListListEntry';
import { Observable } from 'rxjs';
import { SearchTermDetails } from 'src/app/model/Search/SearchDetails/SearchTermDetails';

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
  selectedRelative: EventEmitter<CriteriaListEntry> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public getSelectedRelative(entry: CriteriaListEntry): void {
    this.selectedRelative.emit(entry);
  }
}
