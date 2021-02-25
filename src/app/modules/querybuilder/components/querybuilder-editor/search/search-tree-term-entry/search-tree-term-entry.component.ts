import { Component, Input, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'

@Component({
  selector: 'num-search-tree-term-entry',
  templateUrl: './search-tree-term-entry.component.html',
  styleUrls: ['./search-tree-term-entry.component.scss'],
})
export class SearchTreeTermEntryComponent implements OnInit {
  @Input()
  node: TerminologyEntry

  constructor() {}

  ngOnInit(): void {}
}
