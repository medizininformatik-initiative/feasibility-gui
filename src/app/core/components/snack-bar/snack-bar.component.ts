import { Component, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
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

  public errorCodes = {
    '200_FEAS_10004': 'THE_RESULT_SIZE_IS_TOO_SMALL_RESULT_WILL_NOT_BE_SHOWN',
    '200_FEAS_10005':
      'THE_NUMBER_OF_SITES_WHICH_ANSWERED_IS_TOO_SMALL_DETAILED_RESULTS_ARE_NOT_SHOWN',
    '403_FEAS_10001': 'YOUR_USER_WAS_BLACKLISTED_BECAUSE_YOU_SEND_TO_MANY_QUERIES_PLEASE_CONTACT',
    '403_FEAS_10002': 'YOUR_USER_WAS_BLACKLISTED_BECAUSE_YOU_SEND_TO_MANY_QUERIES_PLEASE_CONTACT',
    404: 'SITE_NOT_FOUND',
    '429_FEAS_10002': 'YOU_SENT_TOO_MANY_QUERIES_PLEASE_WAIT_RETRY_AFTER_SECONDS_AND_TRY_AGAIN',
  };
  public errorMessage: string;

  constructor(private snackBar: MatSnackBar) {}

  public displayErrorMessage(errorMessage: string) {
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
      duration: 1000000,
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
    TranslateModule,
  ],
})
export class SnackBarComponent {
  constructor(public snackbarService: SnackbarService) {}
}
