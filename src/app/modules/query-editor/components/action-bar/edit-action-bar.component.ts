import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-edit-action-bar',
  templateUrl: './edit-action-bar.component.html',
  styleUrls: ['./edit-action-bar.component.scss'],
})
export class EditActionBarComponent implements OnInit {
  @Output()
  save = new EventEmitter<void>();

  @Output()
  cancel = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  public onSave() {
    this.save.emit();
  }

  public onCancel() {
    this.cancel.emit();
  }
}
