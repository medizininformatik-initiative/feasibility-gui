import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarData } from '../../models/Snackbar/SnackbarData';
import { SnackbarService } from '../../service/Snackbar/Snackbar.service';

@Component({
  selector: 'num-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    public snackbarService: SnackbarService
  ) {}
}
