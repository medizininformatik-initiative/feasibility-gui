import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-search-tree-footer',
  templateUrl: './search-tree-footer.component.html',
  styleUrls: ['./search-tree-footer.component.scss'],
})
export class SearchTreeFooterComponent implements OnInit {
  @Output()
  addEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  fireAddEvent(shouldAdd: boolean): void {
    this.addEvent.emit(shouldAdd);
  }
}
