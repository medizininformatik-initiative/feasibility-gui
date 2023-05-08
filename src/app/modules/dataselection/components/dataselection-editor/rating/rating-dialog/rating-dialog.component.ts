import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'num-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
})
export class RatingDialogComponent implements OnInit {
  @Input()
  public rating = 3;

  @Input()
  public starCount = 5;

  @Input()
  private color = 'accent';

  @Output()
  private ratingUpdated = new EventEmitter();

  private snackBarDuration = 2000;
  public ratingArr = [];

  constructor() {}

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    this.rating = rating;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}
