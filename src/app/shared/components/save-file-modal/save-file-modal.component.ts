import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaveFileDataModal } from '../../models/SaveDataModal/SaveFileDataModal';

@Component({
  selector: 'num-save-file-modal',
  templateUrl: './save-file-modal.component.html',
  styleUrls: ['./save-file-modal.component.scss'],
})
export class SaveFileModalComponent {
  @Input()
  isCommentRequired = false;

  @Output()
  save = new EventEmitter<SaveFileDataModal>();

  @Output()
  cancel = new EventEmitter<void>();

  title = '';

  doSave(): void {
    this.save.emit({
      title: this.title,
    });
  }

  doDiscard(): void {
    this.cancel.emit();
  }
}
