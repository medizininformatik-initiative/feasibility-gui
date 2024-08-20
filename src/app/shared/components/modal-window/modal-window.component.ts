import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'num-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Output()
  cancelButtonSelected = new EventEmitter();

  @Output()
  saveButtonSelected = new EventEmitter();

  public save() {
    this.saveButtonSelected.emit();
  }

  cancel() {
    this.cancelButtonSelected.emit();
  }
}
