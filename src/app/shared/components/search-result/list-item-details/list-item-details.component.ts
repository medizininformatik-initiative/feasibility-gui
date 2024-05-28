import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SearchTermListItemService } from 'src/app/service/SearchTermListItemService.service';

@Component({
  selector: 'num-list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.scss'],
})

/**
 * Needs a function to call the elastic search service for fetching the the data when
 * on click of parents/children/siblings
 */
export class ListItemDetailsComponent implements OnInit, AfterViewInit {
  isOpen = false;

  data: any;
  constructor(private listItemService: SearchTermListItemService) {}

  ngOnInit() {
    this.listItemService.selectedRow$.subscribe((row) => {
      this.data = row;
    });
  }

  ngAfterViewInit() {}
}
