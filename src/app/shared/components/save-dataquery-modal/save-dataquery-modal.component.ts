import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveDataModal } from '../../models/SaveDataModal/SaveDataModal';
import { DataQueryValidationService } from '../../../service/DataQuery/DataQueryValidation.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'num-save-dataquery-modal',
  templateUrl: './save-dataquery-modal.component.html',
  styleUrls: ['./save-dataquery-modal.component.scss'],
})
export class SaveDataQueryModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SaveDataQueryModalComponent>,
    private dataQueryValidation: DataQueryValidationService
  ) {}
  validatedDataQuery$: Observable<{ feasibilityQuery: boolean; dataSelection: boolean }>;
  ngOnInit(): void {
    this.validatedDataQuery$ = this.dataQueryValidation.validateDataQuery();
  }
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
    this.dialogRef.close({
      title: this.title,
      comment: this.comment,
      feasibilityQuery: this.isFeasibilityChecked,
      dataSelection: this.isDataSelectionChecked,
    });
  }

  doDiscard(): void {
    this.dialogRef.close();
  }

  toggleFeasibilityQuery(checked: MatCheckboxChange) {
    this.isFeasibilityChecked = checked.checked;
  }
  toggleDataSelection(checked: MatCheckboxChange) {
    this.isDataSelectionChecked = checked.checked;
  }
}
