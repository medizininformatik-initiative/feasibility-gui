import { Component, OnInit } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { Observable } from 'rxjs';
import { SaveQueryModalComponent } from '../save-dialog/save-dialog.component';

@Component({
  selector: 'num-result-action-bar',
  templateUrl: './result-action-bar.component.html',
  styleUrls: ['./result-action-bar.component.scss'],
})
export class ResultActionBarComponent implements OnInit {
  hasQueryResult: Observable<boolean>;

  constructor(
    private navigationHelperService: NavigationHelperService,
    private dialog: MatDialog,
    private downloadCCDLService: DownloadCCDLService,
    private feasibilityQueryProvider: FeasibilityQueryProviderService
  ) {}

  ngOnInit() {
    this.hasQueryResult = this.feasibilityQueryProvider.getHasQueryResult();
  }

  public saveQuery() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(SaveQueryModalComponent, dialogConfig);
  }

  public doDownloadQuery() {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }

  public editStage(): void {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
