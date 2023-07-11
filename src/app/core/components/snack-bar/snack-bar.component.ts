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
    'FEAS-10001': 'FEAS-10001',
    'FEAS-10002': 'FEAS-10002',
    'FEAS-10004': 'FEAS-10004',
    'FEAS-10005': 'FEAS-10005',
    404: 'SITE_NOT_FOUND',
  };

  public errorMessage: string;

  public retryAfter: 0;

  constructor(private snackBar: MatSnackBar) {}

  public displayErrorMessage(errorMessage: string, retryAfter?) {
    this.errorMessage = errorMessage;
    this.retryAfter = retryAfter;
    this.openSnackbar();
  }

  private openSnackbar() {
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
