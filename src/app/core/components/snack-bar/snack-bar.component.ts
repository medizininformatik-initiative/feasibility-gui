import { Component, Input, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MatSnackBarModule,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackBarContentComponent } from './snack-bar-content/snack-bar-content.component';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

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
  durationInSeconds = 5000;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBarMessage = 'Message recieved';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarContentComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-container'],
    });
  }
}
