import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CategoryEntry } from '../../../../model/api/terminology/terminology'

@Component({
  selector: 'num-search-tree-header',
  templateUrl: './search-tree-header.component.html',
  styleUrls: ['./search-tree-header.component.scss'],
})
export class SearchTreeHeaderComponent implements OnInit {
  @Input()
  selectedId: string

  @Input()
  categories: Array<CategoryEntry> = []

  @Output()
  switchCategory = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  fireSwitchCategory(entryId: string): void {
    this.switchCategory.emit(entryId)
  }
}
