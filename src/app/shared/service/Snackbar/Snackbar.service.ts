import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snack-bar/snackbar.component';
import { SnackbarData } from '../../models/Snackbar/SnackbarData';

export enum ErrorCodes {
  FEAS_10001 = 'FEAS-10001',
  FEAS_10002 = 'FEAS-10002',
  FEAS_10004 = 'FEAS-10004',
  FEAS_10005 = 'FEAS-10005',
  VAL_20001 = 'VAL-20001',
  SITE_NOT_FOUND = '404',
}

export enum MessageType {
  ERROR = 'ERROR',
  INFO = 'INFO',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {}

  public displayErrorMessage(errorCode: ErrorCodes, retryAfter: number = 0) {
    const message = `${MessageType.ERROR}.${errorCode}`;
    const data: SnackbarData = {
      message,
      retryAfter,
      invalidQuery: false,
    };
    this.openSnackbar(data, 1000000);
  }

  public displayInfoMessage(infoMessage: string, retryAfter: number = 0) {
    const message = `${MessageType.INFO}.${infoMessage}`;
    const data: SnackbarData = {
      message,
      retryAfter,
      invalidQuery: false,
    };
    this.openSnackbar(data, 5000);
  }

  public displayInvalidQueryMessage() {
    const data: SnackbarData = {
      message: 'QUERYBUILDER.OVERVIEW.INVALID_WARNING',
      retryAfter: 0,
      invalidQuery: true,
    };
    this.openSnackbar(data, 15000); // Invalid query snackbar
  }

  private openSnackbar(data: SnackbarData, duration: number) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration,
      panelClass: ['snackbar-container'],
    });
  }

  public closeSnackbar() {
    this.snackBar.dismiss();
  }
}
