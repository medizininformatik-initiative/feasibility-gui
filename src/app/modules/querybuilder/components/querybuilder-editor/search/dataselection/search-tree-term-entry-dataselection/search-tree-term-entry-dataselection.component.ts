import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerminologyEntry } from 'src/app/modules/querybuilder/model/api/terminology/terminology';

@Component({
  selector: 'num-search-tree-term-entry-dataselection',
  templateUrl: './search-tree-term-entry-dataselection.component.html',
  styleUrls: ['./search-tree-term-entry-dataselection.component.scss'],
})
export class SearchTreeTermEntryDataselectionComponent implements OnInit {
  @Input()
  node: TerminologyEntry;

  @Output()
  toggleEvent = new EventEmitter();

  @Input()
  searchtype: string;

  constructor() {}

  ngOnInit(): void {}

  toggleTreeNode(): void {
    this.toggleEvent.emit(this.node);
  }
}
