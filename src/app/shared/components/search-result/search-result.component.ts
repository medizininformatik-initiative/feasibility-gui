import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';
import { SearchTermListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/SearchTermListEntry';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { SelectedTableItemsService } from 'src/app/service/ElasticSearch/SearchTermListItemService.service';

@Component({
  selector: 'num-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;

  @Input()
  searchTermListItems: SearchTermListEntry[] = [];

  @Input()
  keysToSkip: string[] = [];

  private isInitialized = false;

  data: SearchTermListEntry;

  isOpen = false;

  constructor(
    private listItemService: SelectedTableItemsService<SearchTermListEntry>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listItemService.getSelectedTableItem().subscribe((row) => {
      this.data = row;
      if (this.isInitialized) {
        this.cdr.detectChanges();
        if (row) {
          this.openSidenav();
        } else {
          this.closeSidenav();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.isInitialized = true;
    this.cdr.detectChanges();
    if (this.data) {
      this.openSidenav();
    }
  }

  openSidenav() {
    if (this.sidenav) {
      this.isOpen = true;
      this.sidenav.open();
    }
  }

  closeSidenav() {
    if (this.sidenav) {
      this.isOpen = false;
      this.sidenav.close();
    }
  }
}
