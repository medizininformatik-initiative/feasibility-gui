import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'num-snack-bar-content',
  templateUrl: './snack-bar-content.component.html',
  styleUrls: ['./snack-bar-content.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
})
export class SnackBarContentComponent {
  snackBarRef = inject(MatSnackBarRef);
}
