import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Criterion } from '../../../../model/api/query/criterion';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component';
import { Query } from '../../../../model/api/query/query';
import { Subscription } from 'rxjs';
import { ValueFilter } from '../../../../model/api/query/valueFilter';
import { FeatureService } from '../../../../../../service/feature.service';
import { CritGroupPosition } from '../../../../controller/CritGroupArranger';

@Component({
  selector: 'num-display-criterion',
  templateUrl: './display-criterion.component.html',
  styleUrls: ['./display-criterion.component.scss'],
})
export class DisplayCriterionComponent implements OnInit, OnDestroy {
  @Input()
  searchType: string;

  @Input()
  criterion: Criterion;

  @Input()
  query: Query;

  @Input()
  position: CritGroupPosition;

  @Input()
  showCancelButton: boolean;

  @Output()
  delete = new EventEmitter<Criterion>();

  @Output()
  storeQuery = new EventEmitter<Query>();

  private subscriptionDialog: Subscription;
  isinvalid: boolean;

  constructor(public dialog: MatDialog, public featureService: FeatureService) {}

  ngOnInit(): void {
    this.isinvalid = this.criterion.isinvalid === true;
  }

  ngOnDestroy(): void {
    this.subscriptionDialog?.unsubscribe();
  }

  openDetailsPopUp(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      criterion: this.criterion,
      query: this.query,
      position: this.position,
      searchType: this.searchType,
    };
    const dialogRef = this.dialog.open(EditSingleCriterionComponent, dialogConfig);
    this.subscriptionDialog?.unsubscribe();
    this.subscriptionDialog = dialogRef
      .afterClosed()
      .subscribe((query) => this.storeQuery.emit(query));
  }

  doDelete(): void {
    this.delete.emit(this.criterion);
  }

  getValueFilters(): ValueFilter[] {
    if (this.criterion.valueFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]];
      }

      return this.criterion.valueFilters;
    } else {
      return [];
    }
  }
  getAttributeFilters(): ValueFilter[] {
    if (this.criterion.attributeFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.attributeFilters.length === 0
          ? []
          : [this.criterion.attributeFilters[0]];
      }

      return this.criterion.attributeFilters;
    } else {
      return [];
    }
  }
}
