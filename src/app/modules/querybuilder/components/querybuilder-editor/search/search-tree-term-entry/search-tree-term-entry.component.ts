import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerminologyEntry } from 'src/app/model/terminology/Terminology';

@Component({
  selector: 'num-search-tree-term-entry',
  templateUrl: './search-tree-term-entry.component.html',
  styleUrls: ['./search-tree-term-entry.component.scss'],
})
export class SearchTreeTermEntryComponent implements OnInit {
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
