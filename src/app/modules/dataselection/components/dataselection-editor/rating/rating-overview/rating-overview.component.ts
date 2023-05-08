import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'num-rating-overview',
  templateUrl: './rating-overview.component.html',
  styleUrls: ['./rating-overview.component.scss'],
})
export class RatingOverviewComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
