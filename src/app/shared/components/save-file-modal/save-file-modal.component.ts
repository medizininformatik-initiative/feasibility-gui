import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaveDataModal } from '../../models/SaveDataModal/SaveDataModalInterface';

@Component({
  selector: 'num-save-file-modal',
  templateUrl: './save-file-modal.component.html',
  styleUrls: ['./save-file-modal.component.scss'],
})
export class SaveFileModalComponent {
  @Input()
  isCommentRequired = false;

  @Output()
  save = new EventEmitter<SaveDataModal>();

  @Output()
  cancel = new EventEmitter<void>();

  title = '';
  comment = '';

  doSave(): void {
    this.save.emit({ title: this.title, comment: this.comment });
  }

  doDiscard(): void {
    this.cancel.emit();
  }
}
