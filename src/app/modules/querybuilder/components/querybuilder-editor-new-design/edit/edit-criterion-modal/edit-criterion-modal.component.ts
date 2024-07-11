import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';

export class EnterCriterionListComponentData {
  criterion: Criterion;
}

@Component({
  selector: 'num-edit-criterion-modal',
  templateUrl: './edit-criterion-modal.component.html',
  styleUrls: ['./edit-criterion-modal.component.scss'],
})
export class EditCriterionModalComponent implements OnInit {
  criterion: Criterion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EditCriterionModalComponent, Criterion>
  ) {}

  ngOnInit() {
    this.criterion = this.data.criterion;
  }

  updateQuantityFilter(newQuantityFilter: AbstractQuantityFilter) {
    this.criterion.getValueFilters()[0].setQuantity(newQuantityFilter);
  }

  updateAtributeFilter(attributeFilter) {
    this.criterion.setAttributeFilters([attributeFilter]);
  }

  saveCriterion() {
    this.dialogRef.close(this.criterion);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
