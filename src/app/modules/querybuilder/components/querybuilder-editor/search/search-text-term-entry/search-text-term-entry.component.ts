import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'

@Component({
  selector: 'num-search-text-term-entry',
  templateUrl: './search-text-term-entry.component.html',
  styleUrls: ['./search-text-term-entry.component.scss'],
})
export class SearchTextTermEntryComponent implements OnInit {
  @Input()
  node: TerminologyEntry

  @Output()
  choose = new EventEmitter<TerminologyEntry>()

  fireChoose(): void {
    this.choose.emit(this.node)
  }

  constructor() {}

  ngOnInit(): void {}
}
