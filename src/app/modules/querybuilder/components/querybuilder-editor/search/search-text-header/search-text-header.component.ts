/*import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryEntry } from 'src/app/model/Terminology/Terminology';

@Component({
  selector: 'num-search-text-header',
  templateUrl: './search-text-header.component.html',
  styleUrls: ['./search-text-header.component.scss'],
})
export class SearchTextHeaderComponent implements OnInit {
  selectedId = '';

  @Input()
  categories: Array<CategoryEntry> = [];

  @Output()
  switchCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  fireSwitchCategory(entryId: string): void {
    this.switchCategory.emit(entryId);
    this.selectedId = entryId;
  }
}
*/
