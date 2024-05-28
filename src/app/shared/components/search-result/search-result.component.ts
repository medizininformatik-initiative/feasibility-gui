import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchTermListItemService } from 'src/app/service/SearchTermListItemService.service';

@Component({
  selector: 'num-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') sidenav: MatDrawer;
  data: any;
  isOpen = false;

  @Input()
  searchTermlistItems: any = [];

  private isInitialized = false;

  constructor(private dataService: SearchTermListItemService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataService.selectedRow$.subscribe((row) => {
      this.data = row;
      if (this.isInitialized) {
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
