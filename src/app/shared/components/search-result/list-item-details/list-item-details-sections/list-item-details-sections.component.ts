import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'num-list-item-details-sections',
  templateUrl: './list-item-details-sections.component.html',
  styleUrls: ['./list-item-details-sections.component.scss'],
})
export class ListItemDetailsSectionsComponent implements OnInit {
  @Input() listItemDetails: any;

  ngOnInit() {}

  getSelectedRelative(item: any) {
    console.log(item);
  }
}
