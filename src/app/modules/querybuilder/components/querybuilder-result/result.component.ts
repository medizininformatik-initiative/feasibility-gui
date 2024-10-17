import { Component, OnInit } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SaveQueryModalComponent } from './save-dialog/save-dialog.component';
@Component({
  selector: 'num-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    private navigationHelperService: NavigationHelperService,
    private dialog: MatDialog,
    private downloadCCDLService: DownloadCCDLService
  ) {}

  ngOnInit() {}

  public editStage(): void {
    this.navigationHelperService.navigateToQueryBuilderEditor(true);
  }

  public saveQuery() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(SaveQueryModalComponent, dialogConfig);
  }

  public doDownloadQuery() {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }
}
