import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RatingOverviewComponent } from '../rating-overview/rating-overview.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'num-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
})
export class RatingDialogComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  ratingComment = '';
  constructor(private dialogRef: MatDialogRef<RatingOverviewComponent, void>) {}

  ngOnInit() {
    this.selectedValue = 3;
    console.log(this.ratingComment);
  }

  countStar(star) {
    this.selectedValue = star;
  }

  mouseEnter(star: number) {
    this.selectedValue = star;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
