import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBarService: SnackbarService, private zone: NgZone) {}

  public handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      const httpError = error as HttpErrorResponse;
      error = httpError.error;
    }

    this.zone.run(() => {
      const errorMessage = 'Undefined client error';
      this.snackBarService.displayErrorMessageWithNoCode(errorMessage);
    });

    console.error('Error from global error handler', error);
  }
}
