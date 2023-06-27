import { Component, Inject, Injectable, Input, OnInit, Output, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  private duration: 1000;
  public errorMessage: string;
  constructor(private snackBar: MatSnackBar) {}

  /*  public openSnackbar(message: string) {
    this.snackBar.open(message,'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-container', '.mat-mdc-button'],
      duration: 5000 * 1000,
    });
  }
*/
  displayErrorMessage(errorMessage) {
    if (errorMessage) {
      this.errorMessage = errorMessage;
      this.openSnackbar(this.errorMessage);
    }
  }

  private openSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: this.errorMessage,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['snackbar-container'],
    });
  }
  public closeSnackbar() {
    this.snackBar.dismiss();
  }
}

@Component({
  selector: 'num-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    SharedComponentsModule,
  ],
})
export class SnackBarComponent {
  errorMessage: string;

  constructor(public snackbarService: SnackbarService) {}
}
