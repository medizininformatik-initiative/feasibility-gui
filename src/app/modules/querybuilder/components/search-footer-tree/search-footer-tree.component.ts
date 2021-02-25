import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'num-search-footer-tree',
  templateUrl: './search-footer-tree.component.html',
  styleUrls: ['./search-footer-tree.component.scss'],
})
export class SearchFooterTreeComponent implements OnInit {
  @Output()
  addEvent = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit(): void {}

  fireAddEvent(shouldAdd: boolean): void {
    this.addEvent.emit(shouldAdd)
  }
}
