import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-edit-action-bar',
  templateUrl: './edit-action-bar.component.html',
  styleUrls: ['./edit-action-bar.component.scss'],
})
export class EditActionBarComponent implements OnInit {
  @Output()
  cancel = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  public onCancel() {
    this.cancel.emit();
  }
}
