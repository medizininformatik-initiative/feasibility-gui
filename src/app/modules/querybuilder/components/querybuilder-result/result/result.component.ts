import { Component, OnInit } from '@angular/core';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveQueryModalComponent } from '../save-dialog/save-dialog.component';
@Component({
  selector: 'num-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  gottenDetailedResult: boolean;
  result: QueryResult;
  resultUrl: string;
  loadedResult = false;
  callsLimit: number;
  callsRemaining: number;
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit() {}

  public editStage(): void {
    this.router.navigate(['/querybuilder/editor'], { state: { jumpToStage: true } });
  }

  saveQuery() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    this.dialog.open(SaveQueryModalComponent, dialogConfig);
  }
}
