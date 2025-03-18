import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SaveDataModal } from '../../models/SaveDataModal/SaveDataModalInterface';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
  isFeasibilityChecked = true;
  isDataSelectionChecked = true;

  doSave(): void {
    this.save.emit({
      title: this.title,
      comment: this.comment,
      feasibilityQuery: this.isFeasibilityChecked,
      dataSelection: this.isDataSelectionChecked,
    });
  }

  doDiscard(): void {
    this.cancel.emit();
  }

  toggleFeasibilityQuery(checked: MatCheckboxChange) {
    this.isFeasibilityChecked = checked.checked;
  }
  toggleDataSelection(checked: MatCheckboxChange) {
    this.isDataSelectionChecked = checked.checked;
  }
}
