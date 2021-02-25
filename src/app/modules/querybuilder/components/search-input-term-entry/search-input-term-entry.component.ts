import { Component, Input, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../model/api/terminology/terminology'

@Component({
  selector: 'num-search-input-term-entry',
  templateUrl: './search-input-term-entry.component.html',
  styleUrls: ['./search-input-term-entry.component.scss'],
})
export class SearchInputTermEntryComponent implements OnInit {
  @Input()
  node: TerminologyEntry

  constructor() {}

  ngOnInit(): void {}
}
