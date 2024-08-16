import { Component, Inject, OnInit } from '@angular/core';
import { DataSelectionProviderService } from '../../services/DataSelectionProviderService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { BetweenFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BetweenFilter';
import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { TimeRestrictionChipService } from 'src/app/shared/service/FilterChips/Criterion/TimeRestrictionChipService.service';

export class EnterDataSelectionProfileProfileComponentData {
  url: string;
}

@Component({
  selector: 'num-edit-filter-modal',
  templateUrl: './edit-filter-modal.component.html',
  styleUrls: ['./edit-filter-modal.component.scss'],
})
export class EditFilterModalComponent implements OnInit {
  timeRestriction: BetweenFilter;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<EnterDataSelectionProfileProfileComponentData, string>,
    private timeRestrictionFilterChipService: TimeRestrictionChipService
  ) {}

  public ngOnInit(): void {
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0];
    this.timeRestriction = new BetweenFilter(null, null);
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public setTimeRestriction(timeRestriction: AbstractTimeRestriction) {
    const test = this.timeRestrictionFilterChipService.generateTimeRestrictionChips(timeRestriction);
    console.log(test);
  }
}
