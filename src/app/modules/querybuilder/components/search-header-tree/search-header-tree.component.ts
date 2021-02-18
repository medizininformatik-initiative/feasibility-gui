import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CategoryEntry } from '../../model/api/terminology/terminology'

@Component({
  selector: 'num-search-header-tree',
  templateUrl: './search-header-tree.component.html',
  styleUrls: ['./search-header-tree.component.scss'],
})
export class SearchHeaderTreeComponent implements OnInit {
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
