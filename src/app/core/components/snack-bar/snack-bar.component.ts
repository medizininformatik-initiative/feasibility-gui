import { Component, Input, OnInit, Output, inject } from '@angular/core';
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
import { SnackBarContentComponent } from './snack-bar-content/snack-bar-content.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { ResultDetailsDialogComponentData } from 'src/app/modules/querybuilder/components/querybuilder-editor/result/result-details-dialog/result-details-dialog.component';

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
    SnackBarContentComponent,
  ],
})
export class SnackBarComponent {
  durationInSeconds = 5000;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  resultStatus: ResultDetailsDialogComponentData;

  backEndResponse = 'test';

  queryResult = true;

  constructor(public snackBar: MatSnackBar, public backend: BackendService) {}

  public getBackendResponse(error) {
    console.log(error);
    if (this.queryResult) {
      this.backEndResponse = 'Hello';
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarContentComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-container'],
    });
  }
}
